<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { useJobRequirement } from '$lib/api/queries/jobs';
  import { useHRInterviews, useHRInterviewStatistics, useSelectTopHRCandidates } from '$lib/api/queries/interviews';
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
    UserCheck,
    Handshake,
    Play,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Trophy,
    Heart,
    MessageSquare,
    Star
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = useJobRequirement(jobId);
  const interviewsQuery = useHRInterviews(jobId);
  const statisticsQuery = useHRInterviewStatistics(jobId);
  const candidatesQuery = useCandidates({ job_requirement_id: jobId });
  const selectTopMutation = useSelectTopHRCandidates();

  const job = $derived($jobQuery.data);
  const interviews = $derived($interviewsQuery.data || []);
  const statistics = $derived($statisticsQuery.data);

  let topN = $state(5);

  // Get candidates eligible for HR interview (passed technical)
  const eligibleCandidates = $derived.by(() => {
    const candidates = $candidatesQuery.data?.data?.data || [];
    return candidates.filter((c: any) =>
      c.technical_test_result === 'pass' ||
      c.status === 'technical_passed' ||
      c.status === 'hr_eligible'
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
    const passed = interviews.filter((i: any) => i.interview_status === 'passed' || i.hr_interview_result === 'pass').length;
    const inProgress = interviews.filter((i: any) => i.interview_status === 'in_progress' || i.status === 'in_progress').length;

    const completedWithScore = interviews.filter((i: any) =>
      (i.interview_status === 'completed' || i.status === 'completed') &&
      (i.overall_score !== undefined || i.score !== undefined || i.cultural_fit !== undefined)
    );
    const avgCulturalFit = completedWithScore.length > 0
      ? Math.round(completedWithScore.reduce((acc: number, i: any) => acc + (i.cultural_fit || i.overall_score || i.score || 0), 0) / completedWithScore.length)
      : 0;

    return { total, completed, passed, inProgress, avgCulturalFit };
  });

  async function handleSelectTop() {
    try {
      await $selectTopMutation.mutateAsync({ jobId, topN });
      toast.success(`Top ${topN} candidates recommended for hire`);
      $interviewsQuery.refetch();
    } catch (error: any) {
      toast.error('Failed to select candidates', { description: error.message });
    }
  }
</script>

<svelte:head>
  <title>HR Interviews - {job?.title || 'Job'} | HR Automation</title>
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
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Handshake class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">HR Interviews</h1>
          <p class="text-gray-500 text-sm">{job?.title || 'Loading...'}</p>
        </div>
      </div>
    </div>

    <!-- Recommend for Hire -->
    {#if stats.completed > 0}
      <div class="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-200">
        <Star class="w-5 h-5 text-purple-600" />
        <span class="text-sm text-purple-700">Recommend for hire:</span>
        <Input type="number" bind:value={topN} class="w-16 h-8" />
        <Button size="sm" onclick={handleSelectTop} loading={$selectTopMutation.isPending}>
          Recommend Top {topN}
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
          <p class="text-xs text-gray-500">Recommended</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
          <Heart class="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{stats.avgCulturalFit}%</p>
          <p class="text-xs text-gray-500">Avg Cultural Fit</p>
        </div>
      </div>
    </Card>
  </div>

  <!-- Interviews List -->
  {#if $interviewsQuery.isLoading}
    <div class="space-y-4">
      {#each Array(3) as _}
        <Skeleton class="h-32" />
      {/each}
    </div>
  {:else if interviews.length === 0}
    <Card class="p-12 text-center">
      <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        <UserCheck class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-700 mb-2">No HR interviews yet</h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        HR interviews will appear here when candidates who passed the technical interview complete their HR round.
      </p>
      {#if eligibleCandidates.length > 0}
        <p class="text-sm text-purple-600">
          {eligibleCandidates.length} candidate(s) eligible for HR interview
        </p>
      {/if}
    </Card>
  {:else}
    <div class="space-y-4">
      {#each interviews as interview}
        {@const interviewStatus = interview.interview_status || interview.status || 'pending'}
        {@const status = statusConfig[interviewStatus] || statusConfig.pending}
        {@const score = interview.overall_score ?? interview.score}
        {@const culturalFit = interview.cultural_fit}
        {@const communication = interview.communication}
        {@const result = interview.hr_interview_result || (score !== undefined && score >= 60 ? 'pass' : score !== undefined ? 'fail' : null)}

        <Card class="p-6">
          <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <span class="text-lg font-semibold text-white">
                  {interview.candidate_name?.charAt(0).toUpperCase() || 'C'}
                </span>
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-1">
                  <h3 class="font-semibold text-gray-900">{interview.candidate_name || 'Unknown'}</h3>
                  <StatusBadge status={status.label} variant={status.variant} />
                  {#if result === 'pass'}
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                      <Star class="w-3 h-3" /> Recommended
                    </span>
                  {:else if result === 'fail'}
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      <XCircle class="w-3 h-3" /> Not Recommended
                    </span>
                  {/if}
                </div>
                <p class="text-sm text-gray-500 mb-3">{interview.candidate_email || ''}</p>

                <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {interview.scheduled_at || interview.created_at ? formatDate(interview.scheduled_at || interview.created_at) : '-'}
                  </span>
                  {#if interview.duration || interview.time_taken_seconds}
                    <span class="flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      {interview.duration || Math.round((interview.time_taken_seconds || 0) / 60)} min
                    </span>
                  {/if}
                </div>

                {#if interviewStatus === 'completed' || score !== undefined}
                  <div class="mt-4 flex flex-wrap gap-6">
                    <div>
                      <p class="text-xs text-gray-400 mb-1">Overall Score</p>
                      <p class="text-lg font-bold {(score || 0) >= 70 ? 'text-emerald-600' : (score || 0) >= 50 ? 'text-amber-600' : 'text-red-600'}">
                        {score !== undefined ? `${Math.round(score)}%` : '-'}
                      </p>
                    </div>
                    {#if culturalFit !== undefined}
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Cultural Fit</p>
                        <p class="text-lg font-bold text-purple-600">{Math.round(culturalFit)}%</p>
                      </div>
                    {/if}
                    {#if communication !== undefined}
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Communication</p>
                        <p class="text-lg font-bold text-blue-600">{Math.round(communication)}%</p>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>

            <div class="flex items-center gap-2 flex-shrink-0">
              {#if interviewStatus === 'completed' || score !== undefined}
                <Button variant="outline" size="sm" onclick={() => goto(`/interview/hr/${interview.session_id || interview.hr_interview_id}/results`)}>
                  <Eye class="w-4 h-4 mr-1" />
                  View Report
                </Button>
              {:else}
                <Button variant="ghost" size="sm" disabled>
                  <Clock class="w-4 h-4 mr-1" />
                  Pending
                </Button>
              {/if}
            </div>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
