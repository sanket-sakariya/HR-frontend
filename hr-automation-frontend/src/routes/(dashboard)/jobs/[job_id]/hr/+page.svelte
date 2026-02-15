<script lang="ts">
  import { page } from '$app/stores';
  import { createJobQuery } from '$lib/api/queries/jobs';
  import { createHRInterviewsQuery } from '$lib/api/queries/interviews';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { formatDate, formatRelative } from '$lib/utils/format';
  import {
    ArrowLeft,
    Handshake,
    Play,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    MessageSquare
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const interviewsQuery = createHRInterviewsQuery(jobId);

  const job = $derived($jobQuery.data);
  const interviews = $derived($interviewsQuery.data || []);

  // Mock interview data
  const mockInterviews = [
    {
      id: '1',
      candidate_name: 'John Doe',
      candidate_email: 'john@example.com',
      status: 'completed',
      score: 90,
      cultural_fit: 85,
      communication: 92,
      scheduled_at: '2024-01-22T11:00:00Z',
      duration: 42,
      created_at: '2024-01-15T08:00:00Z'
    },
    {
      id: '2',
      candidate_name: 'Jane Smith',
      candidate_email: 'jane@example.com',
      status: 'scheduled',
      scheduled_at: '2024-01-26T15:00:00Z',
      created_at: '2024-01-18T10:00:00Z'
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
  <title>HR Interviews - {job?.title || 'Job'} | HR Automation</title>
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
        <Handshake class="w-6 h-6 text-purple-400" />
        <h1 class="text-2xl font-bold text-gray-900">HR Interviews</h1>
      </div>
      <p class="text-gray-500">
        AI-powered cultural & behavioral interviews for {job?.title || 'this job'}
      </p>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid sm:grid-cols-4 gap-4">
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center">
          <Handshake class="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">{displayInterviews.length}</p>
          <p class="text-xs text-gray-500">Total Interviews</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center">
          <Calendar class="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">
            {displayInterviews.filter(i => i.status === 'scheduled').length}
          </p>
          <p class="text-xs text-gray-500">Scheduled</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
          <CheckCircle class="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900">
            {displayInterviews.filter(i => i.status === 'completed').length}
          </p>
          <p class="text-xs text-gray-500">Completed</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-royal-900/50 flex items-center justify-center">
          <MessageSquare class="w-5 h-5 text-royal-400" />
        </div>
        <div>
          {@const completedWithScore = displayInterviews.filter(i => i.status === 'completed' && i.cultural_fit)}
          {@const avgFit = completedWithScore.length > 0 
            ? Math.round(completedWithScore.reduce((acc, i) => acc + (i.cultural_fit || 0), 0) / completedWithScore.length)
            : 0}
          <p class="text-2xl font-bold text-gray-900">{avgFit}%</p>
          <p class="text-xs text-gray-500">Avg Cultural Fit</p>
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
      <Handshake class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">No HR interviews yet</h3>
      <p class="text-gray-500 mb-6">
        HR interviews will appear here when candidates are scheduled
      </p>
    </Card>
  {:else}
    <div class="space-y-4">
      {#each displayInterviews as interview}
        {@const status = statusConfig[interview.status] || statusConfig.scheduled}
        <Card class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                <span class="text-lg font-semibold text-white">
                  {interview.candidate_name?.charAt(0).toUpperCase() || 'C'}
                </span>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="font-semibold text-gray-900">{interview.candidate_name}</h3>
                  <StatusBadge status={status.label} variant={status.variant} />
                </div>
                <p class="text-sm text-gray-500 mb-3">{interview.candidate_email}</p>
                
                <div class="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span class="flex items-center gap-1">
                    <Calendar class="w-4 h-4" />
                    {formatDate(interview.scheduled_at)}
                  </span>
                  {#if interview.duration}
                    <span class="flex items-center gap-1">
                      <Clock class="w-4 h-4" />
                      {interview.duration} min
                    </span>
                  {/if}
                </div>

                {#if interview.status === 'completed'}
                  <div class="mt-4 flex gap-6">
                    <div>
                      <p class="text-xs text-gray-400 mb-1">Overall</p>
                      <p class="text-lg font-bold {interview.score >= 70 ? 'text-emerald-400' : 'text-amber-400'}">
                        {interview.score}%
                      </p>
                    </div>
                    {#if interview.cultural_fit}
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Cultural Fit</p>
                        <p class="text-lg font-bold text-purple-400">{interview.cultural_fit}%</p>
                      </div>
                    {/if}
                    {#if interview.communication}
                      <div>
                        <p class="text-xs text-gray-400 mb-1">Communication</p>
                        <p class="text-lg font-bold text-royal-400">{interview.communication}%</p>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>

            <div class="flex items-center gap-2">
              {#if interview.status === 'completed'}
                <Button variant="outline" size="sm">
                  <Eye class="w-4 h-4 mr-2" />
                  View Report
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
            </div>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>
