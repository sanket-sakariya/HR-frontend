<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';
  import { useJobRequirements, useJobRequirement } from '$lib/api/queries/jobs';
  import { useCompanies } from '$lib/api/queries/companies';
  import { useCandidates, useAllJobsCandidates } from '$lib/api/queries/candidates';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { ArrowLeft, Search, Users } from 'lucide-svelte';

  let searchQuery = $state('');
  let statusFilter = $state('');

  // ?job_id=<uuid> narrows to a single job's candidates.
  const jobIdParam = $derived($page.url.searchParams.get('job_id') || '');

  // Single-job branch ----------------------------------------------------
  const singleJobQuery = useJobRequirement(jobIdParam || null);
  const jobCandidatesQuery = useCandidates(
    jobIdParam ? { job_requirement_id: jobIdParam } : undefined
  );

  // All-jobs branch (no filter) ------------------------------------------
  const companiesQuery = useCompanies({ limit: 1 });
  const companyId = $derived(
    authStore.companyId || $companiesQuery.data?.data?.[0]?.company_id || null
  );

  $effect(() => {
    if (!authStore.companyId && $companiesQuery.data?.data?.[0]) {
      authStore.setCompany($companiesQuery.data.data[0]);
    }
  });

  const jobsQuery = useJobRequirements(jobIdParam ? null : companyId);

  const jobIds = $derived.by(() => {
    const jobs = $jobsQuery.data?.data || [];
    return jobs
      .map((j: any) => j.job_requirement_id)
      .filter((id: any): id is string => typeof id === 'string');
  });

  const allCandidatesQuery = useAllJobsCandidates(jobIdParam ? [] : jobIds);

  // Unified data + loading ----------------------------------------------
  const loading = $derived(
    jobIdParam
      ? $jobCandidatesQuery.isLoading
      : $jobsQuery.isLoading || $allCandidatesQuery.isLoading
  );

  const rawCandidates = $derived.by<any[]>(() => {
    if (jobIdParam) {
      return $jobCandidatesQuery.data?.data?.data || [];
    }
    return $allCandidatesQuery.data || [];
  });

  const job = $derived($singleJobQuery.data);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'applied', label: 'Applied' },
    { value: 'resume_screened', label: 'Resume Screened' },
    { value: 'aptitude_eligible', label: 'Aptitude Eligible' },
    { value: 'aptitude_passed', label: 'Aptitude Passed' },
    { value: 'aptitude_failed', label: 'Aptitude Failed' },
    { value: 'technical_eligible', label: 'Technical Eligible' },
    { value: 'technical_passed', label: 'Technical Passed' },
    { value: 'technical_failed', label: 'Technical Failed' },
    { value: 'hr_eligible', label: 'HR Eligible' },
    { value: 'hr_passed', label: 'HR Passed' },
    { value: 'hr_failed', label: 'HR Failed' },
    { value: 'hire_recommended', label: 'Hire Recommended' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const filteredCandidates = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...rawCandidates]
      .filter((c) => {
        if (statusFilter && c.status !== statusFilter) return false;
        if (!q) return true;
        const name = `${c.first_name ?? ''} ${c.last_name ?? ''}`.toLowerCase();
        return (
          name.includes(q) ||
          (c.email ?? '').toLowerCase().includes(q) ||
          (c.phone ?? '').toLowerCase().includes(q)
        );
      })
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
  });
</script>

<svelte:head>
  <title>Candidates | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      {#if jobIdParam}
        <button
          type="button"
          onclick={() => goto(`/jobs/${jobIdParam}`)}
          class="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mb-2"
        >
          <ArrowLeft class="w-4 h-4" /> Back to job
        </button>
        <h1 class="text-2xl font-bold text-gray-900">
          Candidates {job?.title ? `· ${job.title}` : ''}
        </h1>
        <p class="text-gray-500 mt-1">
          {job?.title ? `All candidates who applied for "${job.title}"` : 'Candidates for this job'}
        </p>
      {:else}
        <h1 class="text-2xl font-bold text-gray-900">Candidates</h1>
        <p class="text-gray-500 mt-1">All candidates who have applied across your jobs</p>
      {/if}
    </div>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="relative flex-1 max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        bind:value={searchQuery}
        placeholder="Search by name, email, phone..."
        class="pl-10"
      />
    </div>
    <div class="w-full sm:w-64">
      <Select options={statusOptions} bind:value={statusFilter} />
    </div>
    {#if jobIdParam}
      <button
        type="button"
        class="text-sm text-gray-500 hover:text-purple-600 underline self-center"
        onclick={() => goto('/candidates')}
      >
        Clear job filter
      </button>
    {/if}
  </div>

  <!-- List -->
  {#if loading}
    <div class="space-y-3">
      {#each Array(5) as _}
        <Skeleton class="h-20" />
      {/each}
    </div>
  {:else if filteredCandidates.length === 0}
    <div class="card-executive p-12 text-center">
      <div class="inline-flex items-center justify-center p-4 rounded-full bg-gray-100 mb-4">
        <Users class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-800 mb-2">No candidates found</h3>
      <p class="text-gray-500">
        {searchQuery || statusFilter
          ? 'Try adjusting your filters'
          : jobIdParam
            ? 'No one has applied for this job yet.'
            : 'Candidates will appear here once they apply to your jobs'}
      </p>
    </div>
  {:else}
    <div class="space-y-3">
      {#each filteredCandidates as candidate (candidate.candidate_id)}
        <a
          href={`/candidates/${candidate.candidate_id}`}
          class="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-sm no-underline"
        >
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center flex-shrink-0"
          >
            <span class="text-white font-semibold">
              {candidate.first_name?.[0] ?? ''}{candidate.last_name?.[0] ?? ''}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-medium text-gray-900 truncate">
                {candidate.first_name ?? ''} {candidate.last_name ?? ''}
              </h4>
              <StatusBadge status={candidate.status} size="sm" />
            </div>
            <p class="text-sm text-gray-500 truncate">
              {candidate.email ?? '—'}
            </p>
          </div>

          {#if candidate.candidate_resume_score}
            <ScoreGauge score={candidate.candidate_resume_score} size="sm" />
          {/if}
        </a>
      {/each}
    </div>
  {/if}
</div>
