<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { useJobRequirement, useDeleteJobRequirement, useUpdateJobStatus } from '$lib/api/queries/jobs';
  import { useCandidates, useSelectTopResumes } from '$lib/api/queries/candidates';
  import { useCreateAptitudeTest } from '$lib/api/queries/aptitude';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
  import { toast } from 'svelte-sonner';
  import { formatDate, formatSalaryRange, formatStatus } from '$lib/utils/format';
  import {
    Edit,
    Trash2,
    MapPin,
    Clock,
    DollarSign,
    Users,
    Play,
    Pause,
    CheckCircle,
    Brain,
    Video,
    UserCheck,
    Copy
  } from 'lucide-svelte';

  const jobId = $page.params.job_id;

  const jobQuery = useJobRequirement(jobId);
  const candidatesQuery = useCandidates({ job_requirement_id: jobId });
  const deleteJobMutation = useDeleteJobRequirement();
  const updateStatusMutation = useUpdateJobStatus();
  const selectTopResumesMutation = useSelectTopResumes();
  const createAptitudeMutation = useCreateAptitudeTest();

  let showDeleteConfirm = $state(false);
  let topN = $state(5);
  let activeTab = $state('candidates');

  async function handleDelete() {
    try {
      await $deleteJobMutation.mutateAsync(jobId);
      toast.success('Job deleted successfully');
      goto('/jobs');
    } catch (error: any) {
      toast.error('Failed to delete job', { description: error.message });
    }
  }

  async function handleStatusChange(status: string) {
    try {
      await $updateStatusMutation.mutateAsync({ jobId, status });
      toast.success(`Job status updated to ${formatStatus(status)}`);
    } catch (error: any) {
      toast.error('Failed to update status', { description: error.message });
    }
  }

  async function handleSelectTopResumes() {
    try {
      await $selectTopResumesMutation.mutateAsync({ jobId, topN });
      toast.success(`Top ${topN} candidates selected for aptitude test`);
    } catch (error: any) {
      toast.error('Failed to select candidates', { description: error.message });
    }
  }

  async function handleCreateAptitudeTest() {
    try {
      await $createAptitudeMutation.mutateAsync(jobId);
      toast.success('Aptitude test created successfully');
    } catch (error: any) {
      toast.error('Failed to create aptitude test', { description: error.message });
    }
  }

  function copyApplyLink() {
    const link = `${window.location.origin}/apply/${jobId}`;
    navigator.clipboard.writeText(link);
    toast.success('Application link copied to clipboard');
  }

  const tabs = [
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'aptitude', label: 'Aptitude', icon: Brain },
    { id: 'technical', label: 'Technical', icon: Video },
    { id: 'hr', label: 'HR', icon: UserCheck }
  ];

  // Group candidates by status
  let candidatesByStatus = $derived.by(() => {
    const candidates = $candidatesQuery.data?.data || [];
    return {
      applied: candidates.filter((c: any) => c.status === 'applied'),
      aptitude_eligible: candidates.filter((c: any) => c.status === 'aptitude_eligible'),
      technical_eligible: candidates.filter((c: any) => c.status === 'technical_eligible'),
      hr_eligible: candidates.filter((c: any) => c.status === 'hr_eligible'),
      hire_recommended: candidates.filter((c: any) => c.status === 'hire_recommended')
    };
  });
</script>

<svelte:head>
  <title>{$jobQuery.data?.title || 'Job'} | HR Automation</title>
</svelte:head>

{#if $jobQuery.isLoading}
  <div class="space-y-6">
    <Skeleton class="h-12 w-96" />
    <Skeleton class="h-48" />
    <Skeleton class="h-96" />
  </div>
{:else if $jobQuery.data}
  {@const job = $jobQuery.data}
  
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <h1 class="text-2xl font-bold text-slate-100">{job.title}</h1>
          <StatusBadge status={job.status} />
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-400">
          {#if job.department}
            <span>{job.department}</span>
          {/if}
          {#if job.location}
            <span class="flex items-center gap-1.5">
              <MapPin class="w-4 h-4" />
              {job.location}
            </span>
          {/if}
          <span class="flex items-center gap-1.5">
            <Clock class="w-4 h-4" />
            {job.job_type || 'Full-time'}
          </span>
          {#if job.salary_range}
            <span class="flex items-center gap-1.5">
              <DollarSign class="w-4 h-4" />
              {formatSalaryRange(job.salary_range.min, job.salary_range.max)}
            </span>
          {/if}
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <Button variant="secondary" onclick={copyApplyLink}>
          <Copy class="w-4 h-4" />
          Copy Apply Link
        </Button>
        
        {#if job.status === 'draft' || job.status === 'paused'}
          <Button variant="success" onclick={() => handleStatusChange('active')}>
            <Play class="w-4 h-4" />
            Activate
          </Button>
        {:else if job.status === 'active'}
          <Button variant="secondary" onclick={() => handleStatusChange('paused')}>
            <Pause class="w-4 h-4" />
            Pause
          </Button>
        {/if}
        
        <Button variant="secondary" onclick={() => goto(`/jobs/${jobId}/edit`)}>
          <Edit class="w-4 h-4" />
          Edit
        </Button>
        
        <Button variant="danger" onclick={() => showDeleteConfirm = true}>
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>

    <!-- Job Details Card -->
    <div class="card-executive p-6">
      <h3 class="text-lg font-semibold text-slate-100 mb-4">Job Description</h3>
      <p class="text-slate-400 whitespace-pre-wrap">{job.description}</p>

      {#if job.requirements && job.requirements.length > 0}
        <div class="mt-6 pt-6 border-t border-slate-800">
          <h4 class="text-sm font-medium text-slate-300 mb-3">Required Skills</h4>
          <div class="flex flex-wrap gap-2">
            {#each job.requirements as skill}
              <span class="px-3 py-1.5 rounded-lg bg-obsidian-800 text-sm text-slate-300">
                {skill.skill}
                <span class="text-slate-500 ml-1">({skill.level})</span>
              </span>
            {/each}
          </div>
        </div>
      {/if}

      {#if job.benefits && job.benefits.length > 0}
        <div class="mt-6 pt-6 border-t border-slate-800">
          <h4 class="text-sm font-medium text-slate-300 mb-3">Benefits</h4>
          <div class="flex flex-wrap gap-2">
            {#each job.benefits as benefit}
              <span class="px-3 py-1.5 rounded-lg bg-success/10 text-sm text-success border border-success/20">
                {benefit}
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Actions Card -->
    <div class="card-executive p-6">
      <h3 class="text-lg font-semibold text-slate-100 mb-4">Actions</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Select Top Resumes -->
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-slate-700">
          <h4 class="font-medium text-slate-200 mb-2">AI Resume Screening</h4>
          <p class="text-sm text-slate-400 mb-3">Select top candidates based on resume scores</p>
          <div class="flex gap-2">
            <Input
              type="number"
              bind:value={topN}
              class="w-20"
            />
            <Button 
              variant="secondary" 
              onclick={handleSelectTopResumes}
              loading={$selectTopResumesMutation.isPending}
            >
              Select Top {topN}
            </Button>
          </div>
        </div>

        <!-- Create Aptitude Test -->
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-slate-700">
          <h4 class="font-medium text-slate-200 mb-2">Aptitude Test</h4>
          <p class="text-sm text-slate-400 mb-3">Create AI-generated aptitude test</p>
          <Button 
            variant="secondary" 
            onclick={handleCreateAptitudeTest}
            loading={$createAptitudeMutation.isPending}
          >
            <Brain class="w-4 h-4" />
            Create Test
          </Button>
        </div>

        <!-- Technical Interviews -->
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-slate-700">
          <h4 class="font-medium text-slate-200 mb-2">Technical Interviews</h4>
          <p class="text-sm text-slate-400 mb-3">View technical interview results</p>
          <Button variant="secondary" onclick={() => goto(`/jobs/${jobId}/technical`)}>
            <Video class="w-4 h-4" />
            View Results
          </Button>
        </div>

        <!-- HR Interviews -->
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-slate-700">
          <h4 class="font-medium text-slate-200 mb-2">HR Interviews</h4>
          <p class="text-sm text-slate-400 mb-3">View HR interview results</p>
          <Button variant="secondary" onclick={() => goto(`/jobs/${jobId}/hr`)}>
            <UserCheck class="w-4 h-4" />
            View Results
          </Button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="card-executive">
      <div class="border-b border-slate-800">
        <nav class="flex gap-1 p-2">
          {#each tabs as tab}
            {@const Icon = tab.icon}
            <button
              onclick={() => activeTab = tab.id}
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors {activeTab === tab.id ? 'bg-royal-500/10 text-royal-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}"
            >
              <Icon class="w-4 h-4" />
              {tab.label}
            </button>
          {/each}
        </nav>
      </div>

      <div class="p-6">
        {#if activeTab === 'candidates'}
          <!-- Candidates Pipeline -->
          {#if $candidatesQuery.isLoading}
            <Skeleton class="h-48" />
          {:else if ($candidatesQuery.data?.data?.length || 0) === 0}
            <div class="text-center py-12">
              <Users class="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h4 class="text-lg font-medium text-slate-300 mb-2">No candidates yet</h4>
              <p class="text-slate-500">Candidates will appear here once they apply</p>
            </div>
          {:else}
            <div class="space-y-6">
              <!-- Pipeline stages -->
              <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                {#each Object.entries(candidatesByStatus) as [status, candidates]}
                  <div class="p-4 rounded-lg bg-obsidian-800/50 border border-slate-700">
                    <div class="flex items-center justify-between mb-3">
                      <h5 class="text-sm font-medium text-slate-300">{formatStatus(status)}</h5>
                      <span class="text-xs text-slate-500">{candidates.length}</span>
                    </div>
                    <div class="space-y-2 max-h-64 overflow-y-auto">
                      {#each candidates.slice(0, 5) as candidate (candidate.candidate_id)}
                        <a
                          href="/candidates/{candidate.candidate_id}"
                          class="block p-2 rounded bg-obsidian-900/50 hover:bg-obsidian-900 transition-colors"
                        >
                          <p class="text-sm text-slate-200 truncate">
                            {candidate.first_name} {candidate.last_name}
                          </p>
                          {#if candidate.resume_score}
                            <div class="flex items-center gap-2 mt-1">
                              <div class="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div 
                                  class="h-full bg-royal-500 rounded-full"
                                  style="width: {candidate.resume_score}%"
                                ></div>
                              </div>
                              <span class="text-xs text-slate-500">{candidate.resume_score}%</span>
                            </div>
                          {/if}
                        </a>
                      {/each}
                      {#if candidates.length > 5}
                        <p class="text-xs text-slate-500 text-center">
                          +{candidates.length - 5} more
                        </p>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {:else if activeTab === 'aptitude'}
          <div class="text-center py-12">
            <Brain class="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-slate-300 mb-2">Aptitude Test Management</h4>
            <p class="text-slate-500 mb-4">Create and manage aptitude tests for this job</p>
            <Button onclick={() => goto(`/jobs/${jobId}/aptitude`)}>
              Manage Aptitude Tests
            </Button>
          </div>
        {:else if activeTab === 'technical'}
          <div class="text-center py-12">
            <Video class="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-slate-300 mb-2">Technical Interviews</h4>
            <p class="text-slate-500 mb-4">View AI-powered technical interview results</p>
            <Button onclick={() => goto(`/jobs/${jobId}/technical`)}>
              View Technical Interviews
            </Button>
          </div>
        {:else if activeTab === 'hr'}
          <div class="text-center py-12">
            <UserCheck class="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-slate-300 mb-2">HR Interviews</h4>
            <p class="text-slate-500 mb-4">View AI-powered HR interview results</p>
            <Button onclick={() => goto(`/jobs/${jobId}/hr`)}>
              View HR Interviews
            </Button>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <ConfirmDialog
    bind:open={showDeleteConfirm}
    title="Delete Job Requirement"
    description="Are you sure you want to delete this job? All associated candidates and interview data will be affected."
    confirmLabel="Delete"
    onconfirm={handleDelete}
    loading={$deleteJobMutation.isPending}
  />
{:else}
  <div class="card-executive p-12 text-center">
    <h2 class="text-xl font-semibold text-slate-200 mb-2">Job not found</h2>
    <p class="text-slate-400 mb-4">The job requirement you're looking for doesn't exist</p>
    <Button onclick={() => goto('/jobs')}>Back to Jobs</Button>
  </div>
{/if}
