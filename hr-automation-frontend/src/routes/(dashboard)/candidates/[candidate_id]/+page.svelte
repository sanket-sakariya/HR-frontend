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
    screening: { label: 'Screening', variant: 'info' },
    aptitude: { label: 'Aptitude', variant: 'info' },
    technical: { label: 'Technical', variant: 'warning' },
    hr: { label: 'HR Round', variant: 'warning' },
    offered: { label: 'Offered', variant: 'success' },
    hired: { label: 'Hired', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' }
  };

  const candidate = $derived($candidateQuery.data);
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
    goto(`/candidates/${candidateId}/schedule/${type}`);
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
  <title>{candidate?.name || 'Candidate'} | HR Automation</title>
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
      <h3 class="text-lg font-medium text-obsidian-200 mb-2">Candidate not found</h3>
      <p class="text-obsidian-400 mb-4">The candidate you're looking for doesn't exist or has been removed.</p>
      <Button href="/candidates">View All Candidates</Button>
    </Card>
  {:else if candidate}
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-start gap-6">
      <!-- Avatar & Basic Info -->
      <div class="flex items-start gap-4">
        <div class="w-20 h-20 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
          <span class="text-3xl font-bold text-white">
            {candidate.name?.charAt(0).toUpperCase() || 'C'}
          </span>
        </div>

        <div>
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-2xl font-bold text-obsidian-100">{candidate.name || 'Unknown'}</h1>
            <StatusBadge status={currentStatus.label} variant={currentStatus.variant} />
          </div>

          {#if candidate.current_position}
            <p class="text-obsidian-300 flex items-center gap-2">
              <Briefcase class="w-4 h-4" />
              {candidate.current_position}
            </p>
          {/if}

          <div class="flex flex-wrap gap-4 mt-3 text-sm text-obsidian-400">
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
            {#if candidate.location}
              <span class="flex items-center gap-1">
                <MapPin class="w-4 h-4" />
                {candidate.location}
              </span>
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
    <div class="border-b border-obsidian-700">
      <nav class="flex gap-8">
        {#each tabs as tab}
          <button
            class="py-3 text-sm font-medium border-b-2 transition-colors {activeTab === tab.id
              ? 'border-royal-500 text-royal-400'
              : 'border-transparent text-obsidian-400 hover:text-obsidian-200'}"
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
            <h2 class="text-lg font-semibold text-obsidian-100 mb-4">Assessment Scores</h2>
            <div class="grid sm:grid-cols-3 gap-6">
              <div class="text-center">
                <ScoreGauge score={candidate.ai_score || 0} label="AI Match" />
              </div>
              <div class="text-center">
                <ScoreGauge 
                  score={interviewHistory.find(i => i.type === 'aptitude')?.score || 0} 
                  label="Aptitude"
                  color="amber"
                />
              </div>
              <div class="text-center">
                <ScoreGauge 
                  score={interviewHistory.find(i => i.type === 'technical')?.score || 0} 
                  label="Technical"
                  color="purple"
                />
              </div>
            </div>
          </Card>

          <!-- Skills -->
          {#if candidate.skills && candidate.skills.length > 0}
            <Card class="p-6">
              <h2 class="text-lg font-semibold text-obsidian-100 mb-4">Skills</h2>
              <div class="flex flex-wrap gap-2">
                {#each candidate.skills as skill}
                  <span class="px-3 py-1 bg-obsidian-700 text-obsidian-200 rounded-full text-sm">
                    {skill}
                  </span>
                {/each}
              </div>
            </Card>
          {/if}

          <!-- Recent Interviews -->
          <Card class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-obsidian-100">Interview History</h2>
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
                
                <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg">
                  <div class="w-10 h-10 rounded-full bg-{typeConfig?.color}-900/50 flex items-center justify-center">
                    <svelte:component this={typeConfig?.icon || Brain} class="w-5 h-5 text-{typeConfig?.color}-400" />
                  </div>
                  <div class="flex-1">
                    <p class="font-medium text-obsidian-200">{typeConfig?.label}</p>
                    <p class="text-sm text-obsidian-400">
                      {formatDate(interview.date)}
                      {#if interview.time}
                        at {interview.time}
                      {/if}
                    </p>
                  </div>
                  <div class="text-right">
                    {#if interview.status === 'completed'}
                      <div class="flex items-center gap-2">
                        <span class="text-lg font-semibold text-obsidian-100">{interview.score}%</span>
                        <CheckCircle class="w-5 h-5 text-emerald-500" />
                      </div>
                      <p class="text-xs text-obsidian-500">{interview.duration}</p>
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
            <h2 class="text-lg font-semibold text-obsidian-100 mb-4">Details</h2>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm text-obsidian-400">Applied</dt>
                <dd class="text-obsidian-200">
                  {candidate.created_at ? formatDate(candidate.created_at) : '-'}
                </dd>
              </div>
              <div>
                <dt class="text-sm text-obsidian-400">Experience</dt>
                <dd class="text-obsidian-200">{candidate.experience_years || 0} years</dd>
              </div>
              <div>
                <dt class="text-sm text-obsidian-400">Expected Salary</dt>
                <dd class="text-obsidian-200">{candidate.expected_salary || '-'}</dd>
              </div>
              <div>
                <dt class="text-sm text-obsidian-400">Notice Period</dt>
                <dd class="text-obsidian-200">{candidate.notice_period || '-'}</dd>
              </div>
              <div>
                <dt class="text-sm text-obsidian-400">Source</dt>
                <dd class="text-obsidian-200">{candidate.source || 'Direct Application'}</dd>
              </div>
            </dl>
          </Card>

          <!-- Pipeline Progress -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-obsidian-100 mb-4">Pipeline Progress</h2>
            <div class="space-y-3">
              {#each [
                { id: 'applied', label: 'Applied', icon: Star },
                { id: 'screening', label: 'AI Screening', icon: Brain },
                { id: 'aptitude', label: 'Aptitude Test', icon: FileText },
                { id: 'technical', label: 'Technical Round', icon: Code },
                { id: 'hr', label: 'HR Round', icon: Handshake },
                { id: 'offered', label: 'Offer Made', icon: CheckCircle }
              ] as stage, index}
                {@const stageIndex = ['applied', 'screening', 'aptitude', 'technical', 'hr', 'offered'].indexOf(candidate.status || 'applied')}
                {@const isCompleted = index <= stageIndex}
                {@const isCurrent = index === stageIndex}
                
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center {isCompleted ? 'bg-royal-600 text-white' : 'bg-obsidian-700 text-obsidian-500'}">
                    <svelte:component this={stage.icon} class="w-4 h-4" />
                  </div>
                  <span class="{isCompleted ? 'text-obsidian-200' : 'text-obsidian-500'} {isCurrent ? 'font-medium' : ''}">
                    {stage.label}
                  </span>
                  {#if isCurrent}
                    <span class="ml-auto text-xs text-royal-400 bg-royal-900/50 px-2 py-0.5 rounded">Current</span>
                  {/if}
                </div>
                {#if index < 5}
                  <div class="w-0.5 h-4 ml-4 {isCompleted ? 'bg-royal-600' : 'bg-obsidian-700'}"></div>
                {/if}
              {/each}
            </div>
          </Card>

          <!-- Quick Actions -->
          <Card class="p-6">
            <h2 class="text-lg font-semibold text-obsidian-100 mb-4">Quick Actions</h2>
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
        <h2 class="text-lg font-semibold text-obsidian-100 mb-6">All Interviews</h2>
        <div class="space-y-4">
          {#each interviewHistory as interview}
            {@const typeConfig = {
              aptitude: { icon: Brain, label: 'Aptitude Test', color: 'royal' },
              technical: { icon: Code, label: 'Technical Interview', color: 'amber' },
              hr: { icon: Handshake, label: 'HR Interview', color: 'purple' }
            }[interview.type]}
            
            <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg border border-obsidian-700">
              <div class="w-12 h-12 rounded-full bg-{typeConfig?.color}-900/50 flex items-center justify-center">
                <svelte:component this={typeConfig?.icon || Brain} class="w-6 h-6 text-{typeConfig?.color}-400" />
              </div>
              <div class="flex-1">
                <p class="font-medium text-obsidian-100">{typeConfig?.label}</p>
                <p class="text-sm text-obsidian-400">
                  {formatDate(interview.date)}
                  {#if interview.duration}
                    · {interview.duration}
                  {/if}
                </p>
              </div>
              <div class="text-right">
                {#if interview.status === 'completed'}
                  <div class="text-2xl font-bold text-obsidian-100">{interview.score}%</div>
                  <span class="text-xs text-emerald-500">Completed</span>
                {:else}
                  <StatusBadge status="Scheduled" variant="warning" />
                  <p class="text-sm text-obsidian-400 mt-1">{interview.time}</p>
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
          <h2 class="text-lg font-semibold text-obsidian-100">Notes</h2>
          <Button variant="outline" size="sm">
            <Edit class="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
        <div class="text-center py-12 text-obsidian-400">
          <MessageSquare class="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No notes yet. Add notes to track important information about this candidate.</p>
        </div>
      </Card>
    {:else if activeTab === 'timeline'}
      <Card class="p-6">
        <h2 class="text-lg font-semibold text-obsidian-100 mb-6">Activity Timeline</h2>
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
                <div class="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-full bg-obsidian-700"></div>
              </div>
              <div class="flex-1 pb-6">
                <p class="text-obsidian-200">{event.action}</p>
                <p class="text-sm text-obsidian-500">{formatRelative(event.date)}</p>
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
