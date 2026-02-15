<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createCandidateQuery, createUpdateCandidateMutation } from '$lib/api/queries/candidates';
  import { formatRelative, formatDate } from '$lib/utils/format';
  import Button from '$lib/components/ui/Button.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    FileText,
    Download,
    ExternalLink,
    Brain,
    Code,
    Handshake,
    CheckCircle,
    XCircle,
    Clock,
    Star,
    MessageSquare,
    Edit
  } from 'lucide-svelte';

  const candidateId = $derived($page.params.candidate_id);
  const candidateQuery = createCandidateQuery(candidateId);
  const updateMutation = createUpdateCandidateMutation();

  let activeTab = $state<'overview' | 'interviews' | 'notes' | 'timeline'>('overview');
  let showRejectDialog = $state(false);

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    applied: { label: 'Applied', variant: 'default' },
    resume_screened: { label: 'Resume Screened', variant: 'info' },
    aptitude_eligible: { label: 'Aptitude Eligible', variant: 'info' },
    aptitude_passed: { label: 'Aptitude Passed', variant: 'success' },
    aptitude_failed: { label: 'Aptitude Failed', variant: 'error' },
    technical_eligible: { label: 'Technical Eligible', variant: 'warning' },
    technical_passed: { label: 'Technical Passed', variant: 'success' },
    technical_failed: { label: 'Technical Failed', variant: 'error' },
    hr_eligible: { label: 'HR Eligible', variant: 'warning' },
    hr_passed: { label: 'HR Passed', variant: 'success' },
    hr_failed: { label: 'HR Failed', variant: 'error' },
    hire_recommended: { label: 'Hire Recommended', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' }
  };

  const candidate = $derived($candidateQuery.data);
  
  // Compute full name from first_name and last_name
  const candidateName = $derived(
    candidate ? [candidate.first_name, candidate.last_name].filter(Boolean).join(' ') || 'Unknown' : 'Unknown'
  );
  
  const currentStatus = $derived(
    candidate ? statusConfig[candidate.status || 'applied'] || statusConfig.applied : statusConfig.applied
  );

  async function updateStatus(newStatus: string) {
    if (!candidate) return;
    
    try {
      await $updateMutation.mutateAsync({
        candidateId,
        data: { status: newStatus as any }
      });
      toast.success(`Candidate moved to ${statusConfig[newStatus]?.label || newStatus}`);
    } catch (error) {
      toast.error('Failed to update candidate status');
    }
  }

  function handleReject() {
    updateStatus('rejected');
    showRejectDialog = false;
  }

  function scheduleInterview(type: 'aptitude' | 'technical' | 'hr') {
    toast.info(`Schedule ${type} interview feature coming soon`);
  }

  // Mock interview history
  const interviewHistory = [
    {
      type: 'aptitude',
      status: 'completed',
      score: 85,
      date: '2024-01-15',
      duration: '45 min'
    },
    {
      type: 'technical',
      status: 'completed',
      score: 78,
      date: '2024-01-18',
      duration: '60 min'
    },
    {
      type: 'hr',
      status: 'scheduled',
      date: '2024-01-22',
      time: '10:00 AM'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'notes', label: 'Notes' },
    { id: 'timeline', label: 'Timeline' }
  ] as const;
</script>

<svelte:head>
  <title>{candidateName} | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Back Button -->
  <Button variant="ghost" href="/candidates" class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Candidates
  </Button>

  {#if $candidateQuery.isLoading}
    <!-- Loading State -->
    <div class="space-y-6">
      <div class="flex items-start gap-6">
        <Skeleton class="w-24 h-24 rounded-full" />
        <div class="flex-1 space-y-3">
          <Skeleton class="h-8 w-64" />
          <Skeleton class="h-4 w-48" />
          <Skeleton class="h-4 w-32" />
        </div>
      </div>
      <Skeleton class="h-64" />
    </div>
  {:else if $candidateQuery.error}
    <Card class="p-6 text-center">
      <XCircle class="w-12 h-12 mx-auto text-red-500 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">Candidate not found</h3>
      <p class="text-gray-500 mb-4">The candidate you're looking for doesn't exist or has been removed.</p>
      <Button href="/candidates">View All Candidates</Button>
    </Card>
  {:else if candidate}
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-start gap-6">
      <!-- Avatar & Basic Info -->
      <div class="flex items-start gap-4">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
          <span class="text-3xl font-bold text-white">
            {(candidate.first_name || 'C').charAt(0).toUpperCase()}
          </span>
        </div>

        <div>
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-2xl font-bold text-gray-900">{candidateName}</h1>
            <StatusBadge status={currentStatus.label} variant={currentStatus.variant} />
          </div>

          {#if candidate.job_requirement_id}
            <p class="text-gray-600 flex items-center gap-2">
              <Briefcase class="w-4 h-4" />
              Job: {candidate.job_requirement_id}
            </p>
          {/if}

          <div class="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            {#if candidate.email}
              <a href="mailto:{candidate.email}" class="flex items-center gap-1 hover:text-royal-400">
                <Mail class="w-4 h-4" />
                {candidate.email}
              </a>
            {/if}
            {#if candidate.phone}
              <a href="tel:{candidate.phone}" class="flex items-center gap-1 hover:text-royal-400">
                <Phone class="w-4 h-4" />
                {candidate.phone}
              </a>
            {/if}
            {#if (candidate as any).linkedin_url}
              <a href={(candidate as any).linkedin_url} target="_blank" class="flex items-center gap-1 hover:text-royal-400">
                <ExternalLink class="w-4 h-4" />
                LinkedIn
              </a>
            {/if}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 lg:ml-auto">
        {#if candidate.resume_url}
          <Button variant="outline" size="sm">
            <FileText class="w-4 h-4 mr-2" />
            View Resume
          </Button>
        {/if}
        
        {#if candidate.status !== 'hired' && candidate.status !== 'rejected'}
          <Button variant="outline" size="sm" onclick={() => scheduleInterview('technical')}>
            <Calendar class="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
          <Button variant="outline" size="sm" onclick={() => updateStatus('offered')} disabled={$updateMutation.isPending}>
            <CheckCircle class="w-4 h-4 mr-2" />
            Make Offer
          </Button>
          <Button variant="destructive" size="sm" onclick={() => showRejectDialog = true}>
            <XCircle class="w-4 h-4 mr-2" />
            Reject
          </Button>
        {/if}
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex gap-8">
        {#each tabs as tab}
          <button
            class="py-3 text-sm font-medium border-b-2 transition-colors {activeTab === tab.id
              ? 'border-royal-500 text-royal-400'
              : 'border-transparent text-gray-500 hover:text-gray-700'}"
            onclick={() => activeTab = tab.id}
          >
            {tab.label}
          </button>
        {/each}
      </nav>
    </div>

    <!-- Tab Content -->
    {#if activeTab === 'overview'}
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Scores -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Assessment Scores</h2>
            <div class="grid sm:grid-cols-3 gap-6">
              <div class="text-center">
                <ScoreGauge score={(candidate as any).candidate_resume_score || candidate.resume_score || 0} label="Resume Score" />
              </div>
              <div class="text-center">
                <ScoreGauge 
                  score={(candidate as any).aptitude_test_result === 'pass' ? 80 : 0} 
                  label="Aptitude"
                  color="amber"
                />
              </div>
              <div class="text-center">
                <ScoreGauge 
                  score={(candidate as any).technical_test_result === 'pass' ? 80 : 0} 
                  label="Technical"
                  color="purple"
                />
              </div>
            </div>
          </Card>

          <!-- Test Results -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
            <div class="grid sm:grid-cols-3 gap-4">
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Brain class="w-6 h-6 mx-auto mb-2 text-royal-400" />
                <p class="text-sm text-gray-500">Aptitude</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {(candidate as any).aptitude_test_result || 'Pending'}
                </p>
              </div>
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Code class="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <p class="text-sm text-gray-500">Technical</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {(candidate as any).technical_test_result || 'Pending'}
                </p>
              </div>
              <div class="bg-gray-100 rounded-lg p-4 text-center">
                <Handshake class="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <p class="text-sm text-gray-500">HR</p>
                <p class="font-semibold text-gray-900 mt-1">
                  {(candidate as any).hr_test_result || 'Pending'}
                </p>
              </div>
            </div>
          </Card>

          <!-- Recent Interviews -->
          <Card class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Interview History</h2>
              <Button variant="ghost" size="sm" onclick={() => activeTab = 'interviews'}>
                View All
              </Button>
            </div>

            <div class="space-y-4">
              {#each interviewHistory as interview}
                {@const typeConfig = {
                  aptitude: { icon: Brain, label: 'Aptitude Test', color: 'royal' },
                  technical: { icon: Code, label: 'Technical Interview', color: 'amber' },
                  hr: { icon: Handshake, label: 'HR Interview', color: 'purple' }
                }[interview.type]}
                
                <div class="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                  <div class="w-10 h-10 rounded-full bg-{typeConfig?.color}-900/50 flex items-center justify-center">
                    <svelte:component this={typeConfig?.icon || Brain} class="w-5 h-5 text-{typeConfig?.color}-400" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-gray-700">{typeConfig?.label}</p>
                    <p class="text-sm text-gray-500">
                      {formatDate(interview.date)}
                      {#if interview.time}
                        at {interview.time}
                      {/if}
                    </p>
                  </div>
                  <div class="text-right">
                    {#if interview.status === 'completed'}
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-semibold text-gray-900">{interview.score}%</span>
                        <CheckCircle class="w-5 h-5 text-emerald-500" />
                      </div>
                      <p class="text-xs text-gray-400">{interview.duration}</p>
                    {:else}
                      <StatusBadge status="Scheduled" variant="warning" />
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </Card>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm text-gray-500">Applied</dt>
                <dd class="text-gray-700">
                  {candidate.created_at ? formatDate(candidate.created_at) : '-'}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Email</dt>
                <dd class="text-gray-700">{candidate.email || '-'}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Phone</dt>
                <dd class="text-gray-700">{candidate.phone || '-'}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Resume Score</dt>
                <dd class="text-gray-700">{(candidate as any).candidate_resume_score || candidate.resume_score || '-'}%</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Resume Selected</dt>
                <dd class="text-gray-700">{(candidate as any).resume_selected ? 'Yes' : 'No'}</dd>
              </div>
              <div>
                <dt class="text-sm text-gray-500">Candidate ID</dt>
                <dd class="text-gray-700 text-xs font-mono truncate">{candidate.candidate_id}</dd>
              </div>
            </dl>
          </Card>

          <!-- Pipeline Progress -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Pipeline Progress</h2>
            <div class="space-y-3">
              {#each [
                { id: 'applied', label: 'Applied', icon: Star },
                { id: 'resume_screened', label: 'Resume Screened', icon: Brain },
                { id: 'aptitude_eligible', label: 'Aptitude Test', icon: FileText },
                { id: 'technical_eligible', label: 'Technical Round', icon: Code },
                { id: 'hr_eligible', label: 'HR Round', icon: Handshake },
                { id: 'hire_recommended', label: 'Hire Recommended', icon: CheckCircle }
              ] as stage, index}
                {@const stageOrder = ['applied', 'resume_screened', 'aptitude_eligible', 'aptitude_passed', 'technical_eligible', 'technical_passed', 'hr_eligible', 'hr_passed', 'hire_recommended']}
                {@const currentIndex = stageOrder.indexOf(candidate.status || 'applied')}
                {@const stageIdx = stageOrder.indexOf(stage.id)}
                {@const isCompleted = stageIdx <= currentIndex}
                {@const isCurrent = stage.id === candidate.status || (stageIdx <= currentIndex && (index === 5 ? stageIdx === currentIndex : stageOrder.indexOf(stage.id) >= stageOrder.indexOf(candidate.status || 'applied')))}
                
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center {isCompleted ? 'bg-royal-600 text-white' : 'bg-gray-200 text-gray-400'}">
                    <svelte:component this={stage.icon} class="w-4 h-4" />
                  </div>
                  <span class="{isCompleted ? 'text-gray-700' : 'text-gray-400'} {isCurrent ? 'font-medium' : ''}">
                    {stage.label}
                  </span>
                  {#if isCurrent}
                    <span class="ml-auto text-xs text-royal-400 bg-royal-900/50 px-2 py-0.5 rounded">Current</span>
                  {/if}
                </div>
                {#if index < 5}
                  <div class="w-0.5 h-4 ml-4 {isCompleted ? 'bg-royal-600' : 'bg-gray-200'}"></div>
                {/if}
              {/each}
            </div>
          </Card>

          <!-- Quick Actions -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div class="space-y-2">
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('aptitude')}>
                <Brain class="w-4 h-4 mr-2" />
                Schedule Aptitude Test
              </Button>
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('technical')}>
                <Code class="w-4 h-4 mr-2" />
                Schedule Technical Interview
              </Button>
              <Button variant="outline" class="w-full justify-start" onclick={() => scheduleInterview('hr')}>
                <Handshake class="w-4 h-4 mr-2" />
                Schedule HR Interview
              </Button>
              <Button variant="outline" class="w-full justify-start">
                <MessageSquare class="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    {:else if activeTab === 'interviews'}
      <Card class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">All Interviews</h2>
        <div class="space-y-4">
          {#each interviewHistory as interview}
            {@const typeConfig = {
              aptitude: { icon: Brain, label: 'Aptitude Test', color: 'royal' },
              technical: { icon: Code, label: 'Technical Interview', color: 'amber' },
              hr: { icon: Handshake, label: 'HR Interview', color: 'purple' }
            }[interview.type]}
            
            <div class="flex items-center gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
              <div class="w-12 h-12 rounded-full bg-{typeConfig?.color}-900/50 flex items-center justify-center">
                <svelte:component this={typeConfig?.icon || Brain} class="w-6 h-6 text-{typeConfig?.color}-400" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-gray-900">{typeConfig?.label}</p>
                <p class="text-sm text-gray-500">
                  {formatDate(interview.date)}
                  {#if interview.duration}
                    · {interview.duration}
                  {/if}
                </p>
              </div>
              <div class="text-right">
                {#if interview.status === 'completed'}
                  <div class="text-2xl font-bold text-gray-900">{interview.score}%</div>
                  <span class="text-xs text-emerald-500">Completed</span>
                {:else}
                  <StatusBadge status="Scheduled" variant="warning" />
                  <p class="text-sm text-gray-500 mt-1">{interview.time}</p>
                {/if}
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink class="w-4 h-4" />
              </Button>
            </div>
          {/each}
        </div>
      </Card>
    {:else if activeTab === 'notes'}
      <Card class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900">Notes</h2>
          <Button variant="outline" size="sm">
            <Edit class="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
        <div class="text-center py-12 text-gray-500">
          <MessageSquare class="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No notes yet. Add notes to track important information about this candidate.</p>
        </div>
      </Card>
    {:else if activeTab === 'timeline'}
      <Card class="p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h2>
        <div class="space-y-6">
          {#each [
            { action: 'Application submitted', date: candidate.created_at || '', icon: Star },
            { action: 'AI screening completed', date: '2024-01-10', icon: Brain },
            { action: 'Aptitude test scheduled', date: '2024-01-12', icon: Calendar },
            { action: 'Aptitude test completed', date: '2024-01-15', icon: CheckCircle },
            { action: 'Technical interview scheduled', date: '2024-01-16', icon: Calendar },
            { action: 'Technical interview completed', date: '2024-01-18', icon: CheckCircle }
          ] as event}
            <div class="flex gap-4">
              <div class="relative">
                <div class="w-8 h-8 rounded-full bg-royal-900/50 flex items-center justify-center">
                  <svelte:component this={event.icon} class="w-4 h-4 text-royal-400" />
                </div>
                <div class="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
              </div>
              <div class="flex-1 pb-6">
                <p class="text-gray-700">{event.action}</p>
                <p class="text-sm text-gray-400">{formatRelative(event.date)}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
    {/if}
  {/if}
</div>

<!-- Reject Dialog -->
<ConfirmDialog
  open={showRejectDialog}
  title="Reject Candidate"
  description="Are you sure you want to reject this candidate? This action can be undone later."
  confirmText="Reject"
  cancelText="Cancel"
  variant="destructive"
  onconfirm={handleReject}
  oncancel={() => showRejectDialog = false}
/>
