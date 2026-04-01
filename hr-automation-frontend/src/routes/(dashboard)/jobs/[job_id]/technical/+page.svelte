<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { useJobRequirement } from '$lib/api/queries/jobs';
  import { useTechnicalInterviews, useTechnicalInterviewStatistics, useSelectTopTechnicalCandidates } from '$lib/api/queries/interviews';
  import { useCandidates } from '$lib/api/queries/candidates';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { formatDate } from '$lib/utils/format';
  import { toast } from 'svelte-sonner';
  import {
    ArrowLeft,
    Code,
    Video,
    Play,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Trophy,
    Target,
    TrendingUp
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = useJobRequirement(jobId);
  const interviewsQuery = useTechnicalInterviews(jobId);
  const statisticsQuery = useTechnicalInterviewStatistics(jobId);
  const candidatesQuery = useCandidates({ job_requirement_id: jobId });
  const selectTopMutation = useSelectTopTechnicalCandidates();

  const job = $derived($jobQuery.data);
  const interviews = $derived($interviewsQuery.data || []);
  const statistics = $derived($statisticsQuery.data);

  let topN = $state(5);

  // Get candidates eligible for technical interview (passed aptitude)
  const eligibleCandidates = $derived.by(() => {
    const candidates = $candidatesQuery.data?.data?.data || [];
    return candidates.filter((c: any) =>
      c.aptitude_test_result === 'pass' ||
      c.status === 'aptitude_passed' ||
      c.status === 'technical_eligible'
    );
  });

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    pending: { label: 'Pending', variant: 'default' },
    scheduled: { label: 'Scheduled', variant: 'info' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
    passed: { label: 'Passed', variant: 'success' },
    failed: { label: 'Failed', variant: 'error' },
    cancelled: { label: 'Cancelled', variant: 'error' }
  };

  // Calculate stats from interviews
  const stats = $derived.by(() => {
    const total = interviews.length;
    const completed = interviews.filter((i: any) => i.interview_status === 'completed' || i.status === 'completed').length;
    const passed = interviews.filter((i: any) => i.interview_status === 'passed' || i.technical_test_result === 'pass').length;
    const inProgress = interviews.filter((i: any) => i.interview_status === 'in_progress' || i.status === 'in_progress').length;

    const completedWithScore = interviews.filter((i: any) =>
      (i.interview_status === 'completed' || i.status === 'completed') &&
      (i.overall_score !== undefined || i.score !== undefined)
    );
    const avgScore = completedWithScore.length > 0
      ? Math.round(completedWithScore.reduce((acc: number, i: any) => acc + (i.overall_score || i.score || 0), 0) / completedWithScore.length)
      : 0;

    return { total, completed, passed, inProgress, avgScore };
  });

  async function handleSelectTop() {
    try {
      await $selectTopMutation.mutateAsync({ jobId, topN });
      toast.success(`Top ${topN} candidates selected for HR interview`);
      $interviewsQuery.refetch();
    } catch (error: any) {
      toast.error('Failed to select candidates', { description: error.message });
    }
  }
</script>

<svelte:head>
  <title>Technical Interviews - {job?.title || 'Job'} | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Back Button -->
  <Button variant="ghost" onclick={() => goto(`/jobs/${jobId}`)} class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Job
  </Button>

  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Code class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Technical Interviews</h1>
          <p class="text-gray-500 text-sm">{job?.title || 'Loading...'}</p>
        </div>
      </div>
    </div>

    <!-- Select Top Candidates -->
    {#if stats.completed > 0}
      <div class="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">
        <Trophy class="w-5 h-5 text-amber-600" />
        <span class="text-sm text-amber-700">Select top performers:</span>
        <Input type="number" bind:value={topN} class="w-16 h-8" />
        <Button size="sm" onclick={handleSelectTop} loading={$selectTopMutation.isPending}>
          Select Top {topN}
        </Button>
      </div>
    {/if}
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <Users class="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p class="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
          <Play class="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
          <p class="text-xs text-gray-500">In Progress</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <CheckCircle class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.completed}</p>
          <p class="text-xs text-gray-500">Completed</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
          <Trophy class="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.passed}</p>
          <p class="text-xs text-gray-500">Passed</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
          <TrendingUp class="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
          <p class="text-xs text-gray-500">Avg Score</p>
        </div>
      </div>
    </Card>
  </div>

  <!-- Interviews List -->
  {#if $interviewsQuery.isLoading}
    <div class="space-y-4">
      {#each Array(3) as _}
        <Skeleton class="h-24" />
      {/each}
    </div>
  {:else if interviews.length === 0}
    <Card class="p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <Video class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">No technical interviews yet</h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        Technical interviews will appear here when candidates who passed the aptitude test complete their interviews.
      </p>
      {#if eligibleCandidates.length > 0}
        <p class="text-sm text-purple-600">
          {eligibleCandidates.length} candidate(s) eligible for technical interview
        </p>
      {/if}
    </Card>
  {:else}
    <Card class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Result
              </th>
              <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each interviews as interview}
              {@const interviewStatus = interview.interview_status || interview.status || 'pending'}
              {@const status = statusConfig[interviewStatus] || statusConfig.pending}
              {@const score = interview.overall_score ?? interview.score}
              {@const result = interview.technical_test_result || (score !== undefined && score >= 60 ? 'pass' : score !== undefined ? 'fail' : null)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="py-4 px-4">
                  <div>
                    <p class="font-medium text-gray-900">{interview.candidate_name || 'Unknown'}</p>
                    <p class="text-sm text-gray-500">{interview.candidate_email || ''}</p>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <StatusBadge status={status.label} variant={status.variant} />
                </td>
                <td class="py-4 px-4 text-gray-600 text-sm">
                  {interview.scheduled_at || interview.created_at ? formatDate(interview.scheduled_at || interview.created_at) : '-'}
                </td>
                <td class="py-4 px-4 text-gray-600 text-sm">
                  {#if interview.duration || interview.time_taken_seconds}
                    {interview.duration || Math.round((interview.time_taken_seconds || 0) / 60)} min
                  {:else}
                    -
                  {/if}
                </td>
                <td class="py-4 px-4">
                  {#if score !== undefined}
                    <span class="font-semibold {score >= 70 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-red-600'}">
                      {Math.round(score)}%
                    </span>
                  {:else}
                    <span class="text-gray-400">-</span>
                  {/if}
                </td>
                <td class="py-4 px-4">
                  {#if result === 'pass'}
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      <CheckCircle class="w-3 h-3" /> Passed
                    </span>
                  {:else if result === 'fail'}
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      <XCircle class="w-3 h-3" /> Failed
                    </span>
                  {:else}
                    <span class="text-gray-400">-</span>
                  {/if}
                </td>
                <td class="py-4 px-4 text-right">
                  {#if interviewStatus === 'completed' || score !== undefined}
                    <Button variant="ghost" size="sm" onclick={() => goto(`/interview/technical/${interview.session_id || interview.technical_interview_id}/results`)}>
                      <Eye class="w-4 h-4 mr-1" />
                      View
                    </Button>
                  {:else}
                    <Button variant="ghost" size="sm" disabled>
                      <Clock class="w-4 h-4 mr-1" />
                      Pending
                    </Button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>
  {/if}
</div>
