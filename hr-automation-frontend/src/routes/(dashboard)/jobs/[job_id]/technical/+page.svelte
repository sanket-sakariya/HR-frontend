<script lang="ts">
  import { page } from '$app/stores';
  import { createJobQuery } from '$lib/api/queries/jobs';
  import { createTechnicalInterviewsQuery } from '$lib/api/queries/interviews';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { formatDate, formatRelative } from '$lib/utils/format';
  import {
    ArrowLeft,
    Code,
    Play,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const interviewsQuery = createTechnicalInterviewsQuery(jobId);

  const job = $derived($jobQuery.data);
  const interviews = $derived($interviewsQuery.data || []);

  // Mock interview data
  const mockInterviews = [
    {
      id: '1',
      candidate_name: 'John Doe',
      candidate_email: 'john@example.com',
      status: 'completed',
      score: 85,
      scheduled_at: '2024-01-20T10:00:00Z',
      duration: 58,
      created_at: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      candidate_name: 'Jane Smith',
      candidate_email: 'jane@example.com',
      status: 'scheduled',
      scheduled_at: '2024-01-25T14:00:00Z',
      created_at: '2024-01-18T10:00:00Z'
    },
    {
      id: '3',
      candidate_name: 'Bob Wilson',
      candidate_email: 'bob@example.com',
      status: 'in_progress',
      scheduled_at: '2024-01-22T09:00:00Z',
      created_at: '2024-01-17T12:00:00Z'
    }
  ];

  const displayInterviews = $derived(interviews.length > 0 ? interviews : mockInterviews);

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    scheduled: { label: 'Scheduled', variant: 'info' },
    in_progress: { label: 'In Progress', variant: 'warning' },
    completed: { label: 'Completed', variant: 'success' },
    cancelled: { label: 'Cancelled', variant: 'error' }
  };
</script>

<svelte:head>
  <title>Technical Interviews - {job?.title || 'Job'} | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Back Button -->
  <Button variant="ghost" href="/jobs/{jobId}" class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Job
  </Button>

  <!-- Header -->
  <div class="flex items-start justify-between">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <Code class="w-6 h-6 text-amber-400" />
        <h1 class="text-2xl font-bold text-obsidian-100">Technical Interviews</h1>
      </div>
      <p class="text-obsidian-400">
        AI-powered technical interviews for {job?.title || 'this job'}
      </p>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid sm:grid-cols-4 gap-4">
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center">
          <Code class="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">{displayInterviews.length}</p>
          <p class="text-xs text-obsidian-400">Total Interviews</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
          <Calendar class="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">
            {displayInterviews.filter(i => i.status === 'scheduled').length}
          </p>
          <p class="text-xs text-obsidian-400">Scheduled</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
          <CheckCircle class="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">
            {displayInterviews.filter(i => i.status === 'completed').length}
          </p>
          <p class="text-xs text-obsidian-400">Completed</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-royal-900/50 flex items-center justify-center">
          <Users class="w-5 h-5 text-royal-400" />
        </div>
        <div>
          {@const completedWithScore = displayInterviews.filter(i => i.status === 'completed' && i.score)}
          {@const avgScore = completedWithScore.length > 0 
            ? Math.round(completedWithScore.reduce((acc, i) => acc + (i.score || 0), 0) / completedWithScore.length)
            : 0}
          <p class="text-2xl font-bold text-obsidian-100">{avgScore}%</p>
          <p class="text-xs text-obsidian-400">Avg Score</p>
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
  {:else if displayInterviews.length === 0}
    <Card class="p-12 text-center">
      <Code class="w-16 h-16 mx-auto text-obsidian-600 mb-4" />
      <h3 class="text-lg font-medium text-obsidian-200 mb-2">No technical interviews yet</h3>
      <p class="text-obsidian-400 mb-6">
        Technical interviews will appear here when candidates are scheduled
      </p>
    </Card>
  {:else}
    <Card class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-obsidian-700">
              <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Candidate
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Status
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Scheduled
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Duration
              </th>
              <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Score
              </th>
              <th class="text-right py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-obsidian-700/50">
            {#each displayInterviews as interview}
              {@const status = statusConfig[interview.status] || statusConfig.scheduled}
              <tr class="hover:bg-obsidian-800/50 transition-colors">
                <td class="py-4 px-4">
                  <div>
                    <p class="font-medium text-obsidian-100">{interview.candidate_name}</p>
                    <p class="text-sm text-obsidian-400">{interview.candidate_email}</p>
                  </div>
                </td>
                <td class="py-4 px-4">
                  <StatusBadge status={status.label} variant={status.variant} />
                </td>
                <td class="py-4 px-4 text-obsidian-300">
                  {formatDate(interview.scheduled_at)}
                </td>
                <td class="py-4 px-4 text-obsidian-300">
                  {#if interview.duration}
                    {interview.duration} min
                  {:else}
                    -
                  {/if}
                </td>
                <td class="py-4 px-4">
                  {#if interview.score !== undefined}
                    <span class="font-semibold {interview.score >= 70 ? 'text-emerald-400' : interview.score >= 50 ? 'text-amber-400' : 'text-red-400'}">
                      {interview.score}%
                    </span>
                  {:else}
                    <span class="text-obsidian-500">-</span>
                  {/if}
                </td>
                <td class="py-4 px-4 text-right">
                  {#if interview.status === 'completed'}
                    <Button variant="ghost" size="sm">
                      <Eye class="w-4 h-4 mr-2" />
                      View Results
                    </Button>
                  {:else if interview.status === 'scheduled'}
                    <Button variant="outline" size="sm">
                      <Play class="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  {:else}
                    <Button variant="ghost" size="sm">
                      <Eye class="w-4 h-4 mr-2" />
                      View
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
