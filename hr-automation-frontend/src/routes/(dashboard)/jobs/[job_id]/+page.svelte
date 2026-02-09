<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { useJobRequirement, useDeleteJobRequirement, useUpdateJobStatus } from '$lib/api/queries/jobs';
  import { useCandidates, useSelectTopResumes } from '$lib/api/queries/candidates';
  import { useCreateAptitudeTest } from '$lib/api/queries/aptitude';
  import { useStartTechnicalInterview, useTechnicalInterviews } from '$lib/api/queries/interviews';
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
    Copy,
    ExternalLink
  } from 'lucide-svelte';

  const jobId = $page.params.job_id;

  const jobQuery = useJobRequirement(jobId);
  const candidatesQuery = useCandidates({ job_requirement_id: jobId });
  const technicalInterviewsQuery = useTechnicalInterviews(jobId);
  const deleteJobMutation = useDeleteJobRequirement();
  const updateStatusMutation = useUpdateJobStatus();
  const selectTopResumesMutation = useSelectTopResumes();
  const createAptitudeMutation = useCreateAptitudeTest();
  const startTechnicalMutation = useStartTechnicalInterview();

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

  async function handleStartTechnicalInterview(candidate: any) {
    try {
      const result = await $startTechnicalMutation.mutateAsync({
        candidateId: candidate.candidate_id,
        jobRequirementId: jobId
      });
      
      toast.success('Technical interview started!');
      
      // If the API returns an interview URL, open it
      if (result?.data?.interview_url) {
        window.open(result.data.interview_url, '_blank');
      }
      
      // Refresh the interviews list
      $technicalInterviewsQuery.refetch();
    } catch (error: any) {
      toast.error('Failed to start interview', { description: error.message });
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

  // Pipeline stage definitions
  const pipelineStages = [
    { id: 'applied', label: 'Applied' },
    { id: 'aptitude_eligible', label: 'Aptitude Eligible' },
    { id: 'technical_eligible', label: 'Technical Eligible' },
    { id: 'hr_eligible', label: 'HR Eligible' },
    { id: 'hire_recommended', label: 'Hire Recommended' }
  ];

  // Determine how far a candidate has progressed and whether they failed at a stage
  function getCandidateStageInfo(candidate: any): { reachedStage: number; failedAtStage: number | null } {
    let reachedStage = 0; // 0=Applied, 1=Aptitude, 2=Technical, 3=HR, 4=Hired
    let failedAtStage: number | null = null;
    const status = candidate.status || '';

    // Stage 1: Reached Aptitude Eligible
    const reachedAptitude =
      ['aptitude_eligible', 'aptitude_passed', 'aptitude_failed',
       'technical_eligible', 'technical_passed', 'technical_failed',
       'hr_eligible', 'hr_passed', 'hr_failed', 'hire_recommended'].includes(status) ||
      (candidate.candidate_resume_score != null && candidate.candidate_resume_score > 0);

    if (!reachedAptitude) return { reachedStage, failedAtStage };
    reachedStage = 1;

    // Check aptitude outcome
    const aptitudeFailed = candidate.aptitude_test_result === 'fail' || status === 'aptitude_failed';
    const aptitudePassed = candidate.aptitude_test_result === 'pass' ||
      ['aptitude_passed', 'technical_eligible', 'technical_passed', 'technical_failed',
       'hr_eligible', 'hr_passed', 'hr_failed', 'hire_recommended'].includes(status);
    if (aptitudeFailed) return { reachedStage, failedAtStage: 1 };
    if (!aptitudePassed) return { reachedStage, failedAtStage };

    // Stage 2: Reached Technical Eligible
    reachedStage = 2;
    const technicalFailed = candidate.technical_test_result === 'fail' || status === 'technical_failed';
    const technicalPassed = candidate.technical_test_result === 'pass' ||
      ['technical_passed', 'hr_eligible', 'hr_passed', 'hr_failed', 'hire_recommended'].includes(status);
    if (technicalFailed) return { reachedStage, failedAtStage: 2 };
    if (!technicalPassed) return { reachedStage, failedAtStage };

    // Stage 3: Reached HR Eligible
    reachedStage = 3;
    const hrFailed = candidate.hr_interview_result === 'fail' || status === 'hr_failed';
    const hrPassed = candidate.hr_interview_result === 'pass' ||
      ['hr_passed', 'hire_recommended'].includes(status);
    if (hrFailed) return { reachedStage, failedAtStage: 3 };
    if (!hrPassed) return { reachedStage, failedAtStage };

    // Stage 4: Hire Recommended
    reachedStage = 4;
    return { reachedStage, failedAtStage };
  }

  // Build cumulative pipeline: each candidate appears in all stages up to their reached stage
  let candidatesPipeline = $derived.by(() => {
    const candidates = $candidatesQuery.data?.data?.data || [];

    const stages = pipelineStages.map(s => ({
      ...s,
      candidates: [] as { candidate: any; stageStatus: 'passed' | 'failed' | 'current' }[],
      passedCount: 0,
      failedCount: 0,
      currentCount: 0
    }));

    candidates.forEach((c: any) => {
      const { reachedStage, failedAtStage } = getCandidateStageInfo(c);

      for (let i = 0; i <= reachedStage; i++) {
        let stageStatus: 'passed' | 'failed' | 'current';
        if (i < reachedStage) {
          stageStatus = 'passed';
        } else if (failedAtStage === i) {
          stageStatus = 'failed';
        } else {
          stageStatus = 'current';
        }
        stages[i].candidates.push({ candidate: c, stageStatus });
      }
    });

    // Compute summary counts
    stages.forEach(stage => {
      stage.passedCount = stage.candidates.filter(c => c.stageStatus === 'passed').length;
      stage.failedCount = stage.candidates.filter(c => c.stageStatus === 'failed').length;
      stage.currentCount = stage.candidates.filter(c => c.stageStatus === 'current').length;
    });

    return stages;
  });

  // For the technical tab - candidates currently eligible for technical interview
  let technicalEligibleCandidates = $derived.by(() => {
    const candidates = $candidatesQuery.data?.data?.data || [];
    return candidates.filter((c: any) => {
      const { reachedStage, failedAtStage } = getCandidateStageInfo(c);
      return reachedStage === 2 && failedAtStage === null;
    });
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
          <h1 class="text-2xl font-bold text-gray-900">{job.title}</h1>
          <StatusBadge status={job.status} />
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Job Description</h3>
      <p class="text-gray-500 whitespace-pre-wrap">{job.description}</p>

      {#if job.requirements && job.requirements.length > 0}
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Required Skills</h4>
          <div class="flex flex-wrap gap-2">
            {#each job.requirements as skill}
              <span class="px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-700">
                {skill.skill}
                <span class="text-gray-400 ml-1">({skill.level})</span>
              </span>
            {/each}
          </div>
        </div>
      {/if}

      {#if job.benefits && job.benefits.length > 0}
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-700 mb-3">Benefits</h4>
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
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Select Top Resumes -->
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">AI Resume Screening</h4>
          <p class="text-sm text-gray-500 mb-3">Select top candidates based on resume scores</p>
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
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">Aptitude Test</h4>
          <p class="text-sm text-gray-500 mb-3">Create AI-generated aptitude test</p>
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
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">Technical Interviews</h4>
          <p class="text-sm text-gray-500 mb-3">View technical interview results</p>
          <Button variant="secondary" onclick={() => goto(`/jobs/${jobId}/technical`)}>
            <Video class="w-4 h-4" />
            View Results
          </Button>
        </div>

        <!-- HR Interviews -->
        <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 class="font-medium text-gray-800 mb-2">HR Interviews</h4>
          <p class="text-sm text-gray-500 mb-3">View HR interview results</p>
          <Button variant="secondary" onclick={() => goto(`/jobs/${jobId}/hr`)}>
            <UserCheck class="w-4 h-4" />
            View Results
          </Button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="card-executive">
      <div class="border-b border-gray-200">
        <nav class="flex gap-1 p-2">
          {#each tabs as tab}
            {@const Icon = tab.icon}
            <button
              onclick={() => activeTab = tab.id}
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors {activeTab === tab.id ? 'bg-purple-50 text-purple-600' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}"
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
          {:else if ($candidatesQuery.data?.data?.data?.length || 0) === 0}
            <div class="text-center py-12">
              <Users class="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 class="text-lg font-medium text-gray-700 mb-2">No candidates yet</h4>
              <p class="text-gray-400">Candidates will appear here once they apply</p>
            </div>
          {:else}
            <div class="space-y-6">
              <!-- Pipeline stages - cumulative view -->
              <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
                {#each candidatesPipeline as stage}
                  <div class="rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
                    <!-- Stage header -->
                    <div class="px-4 py-3 border-b border-gray-100">
                      <div class="flex items-center justify-between">
                        <h5 class="text-sm font-semibold text-gray-800">{stage.label}</h5>
                        <span class="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-gray-700">{stage.candidates.length}</span>
                      </div>
                      {#if stage.candidates.length > 0}
                        <div class="flex gap-3 mt-2 text-xs">
                          {#if stage.passedCount > 0}
                            <span class="flex items-center gap-1 text-emerald-600">
                              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {stage.passedCount} passed
                            </span>
                          {/if}
                          {#if stage.failedCount > 0}
                            <span class="flex items-center gap-1 text-red-600">
                              <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              {stage.failedCount} failed
                            </span>
                          {/if}
                          {#if stage.currentCount > 0}
                            <span class="flex items-center gap-1 text-purple-600">
                              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                              {stage.currentCount} active
                            </span>
                          {/if}
                        </div>
                      {/if}
                    </div>
                    <!-- Candidate list -->
                    <div class="p-3 space-y-1.5 max-h-72 overflow-y-auto">
                      {#each stage.candidates as { candidate, stageStatus } (candidate.candidate_id)}
                        <a
                          href="/candidates/{candidate.candidate_id}"
                          class="flex items-center gap-2.5 p-2 rounded-md transition-colors hover:bg-white/80 {stageStatus === 'passed' ? 'bg-emerald-50/50' : stageStatus === 'failed' ? 'bg-red-50/50' : 'bg-purple-50/50'}"
                        >
                          <span class="flex-shrink-0 w-2 h-2 rounded-full {stageStatus === 'passed' ? 'bg-emerald-500' : stageStatus === 'failed' ? 'bg-red-500' : 'bg-purple-500'}"></span>
                          <div class="min-w-0 flex-1">
                            <p class="text-sm text-gray-800 truncate">
                              {candidate.first_name} {candidate.last_name}
                            </p>
                          </div>
                          <span class="flex-shrink-0 text-[10px] font-medium uppercase tracking-wide {stageStatus === 'passed' ? 'text-emerald-600' : stageStatus === 'failed' ? 'text-red-600' : 'text-purple-600'}">
                            {stageStatus === 'passed' ? '✓ Passed' : stageStatus === 'failed' ? '✗ Failed' : '● Active'}
                          </span>
                        </a>
                      {/each}
                      {#if stage.candidates.length === 0}
                        <p class="text-xs text-gray-400 text-center py-4">No candidates yet</p>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {:else if activeTab === 'aptitude'}
          <div class="text-center py-12">
            <Brain class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-gray-700 mb-2">Aptitude Test Management</h4>
            <p class="text-gray-400 mb-4">Create and manage aptitude tests for this job</p>
            <Button onclick={() => goto(`/jobs/${jobId}/aptitude`)}>
              Manage Aptitude Tests
            </Button>
          </div>
        {:else if activeTab === 'technical'}
          <div class="space-y-6">
            <!-- Candidates eligible for technical interview -->
            <div>
              <h4 class="text-lg font-medium text-gray-800 mb-4">Candidates Eligible for Technical Interview</h4>
              <p class="text-sm text-gray-500 mb-4">These candidates have passed the aptitude test and are ready for technical interview.</p>
              
              {#if technicalEligibleCandidates.length === 0}
                <div class="text-center py-8 bg-gray-50/50 rounded-lg">
                  <Video class="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p class="text-gray-500">No candidates eligible for technical interview yet</p>
                  <p class="text-sm text-gray-400 mt-1">Candidates will appear here after passing the aptitude test</p>
                </div>
              {:else}
                <div class="grid gap-4">
                  {#each technicalEligibleCandidates as candidate (candidate.candidate_id)}
                    <div class="p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium text-gray-800">{candidate.first_name} {candidate.last_name}</p>
                          <p class="text-sm text-gray-500">{candidate.email}</p>
                          {#if candidate.aptitude_test_result}
                            <p class="text-xs text-emerald-600 mt-1">Aptitude: Passed</p>
                          {/if}
                        </div>
                        <div class="flex items-center gap-2">
                          <Button 
                            variant="success" 
                            size="sm"
                            onclick={() => handleStartTechnicalInterview(candidate)}
                            loading={$startTechnicalMutation.isPending}
                          >
                            <Video class="w-4 h-4 mr-2" />
                            Start Interview
                          </Button>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Existing technical interviews -->
            <div class="pt-6 border-t border-gray-200">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-medium text-gray-800">Technical Interview Results</h4>
                <Button variant="ghost" size="sm" onclick={() => goto(`/jobs/${jobId}/technical`)}>
                  View All
                  <ExternalLink class="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {#if $technicalInterviewsQuery.isLoading}
                <Skeleton class="h-32" />
              {:else if ($technicalInterviewsQuery.data || []).length === 0}
                <div class="text-center py-8 bg-gray-50/50 rounded-lg">
                  <CheckCircle class="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p class="text-gray-500">No technical interviews completed yet</p>
                </div>
              {:else}
                <div class="space-y-3">
                  {#each ($technicalInterviewsQuery.data || []).slice(0, 5) as interview}
                    <div class="p-4 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
                      <div>
                        <p class="font-medium text-gray-800">{interview.candidate_name || 'Candidate'}</p>
                        <div class="flex items-center gap-3 mt-1">
                          <StatusBadge status={interview.interview_status || 'pending'} />
                          {#if interview.overall_score}
                            <span class="text-sm {interview.overall_score >= 70 ? 'text-emerald-600' : interview.overall_score >= 50 ? 'text-amber-600' : 'text-red-600'}">
                              Score: {interview.overall_score}%
                            </span>
                          {/if}
                        </div>
                      </div>
                      {#if interview.interview_url}
                        <Button variant="ghost" size="sm" onclick={() => window.open(interview.interview_url, '_blank')}>
                          <ExternalLink class="w-4 h-4" />
                        </Button>
                      {/if}
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {:else if activeTab === 'hr'}
          <div class="text-center py-12">
            <UserCheck class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 class="text-lg font-medium text-gray-700 mb-2">HR Interviews</h4>
            <p class="text-gray-400 mb-4">View AI-powered HR interview results</p>
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
    <h2 class="text-xl font-semibold text-gray-800 mb-2">Job not found</h2>
    <p class="text-gray-500 mb-4">The job requirement you're looking for doesn't exist</p>
    <Button onclick={() => goto('/jobs')}>Back to Jobs</Button>
  </div>
{/if}
