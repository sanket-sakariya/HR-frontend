<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores/auth.svelte';
  import { useCandidates } from '$lib/api/queries/candidates';
  import { useJobRequirements } from '$lib/api/queries/jobs';
  import { useCompanies } from '$lib/api/queries/companies';
  import CandidateTable from '$lib/components/candidates/CandidateTable.svelte';
  import CandidateFilters from '$lib/components/candidates/CandidateFilters.svelte';
  import PipelineView from '$lib/components/candidates/PipelineView.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { Users, LayoutGrid, List, Download, Briefcase } from 'lucide-svelte';

  let search = $state('');
  let status = $state('');
  let sortBy = $state('newest');
  let viewMode = $state<'table' | 'pipeline'>('table');
  let selectedJobId = $state<string>('');

  // Fetch companies to get companyId if not already in authStore
  const companiesQuery = useCompanies({ limit: 1 });
  
  // Get company ID from stored value OR from companies list
  const companyId = $derived(
    authStore.companyId || $companiesQuery.data?.data?.[0]?.company_id || null
  );

  // Update authStore when we get company from API
  $effect(() => {
    if (!authStore.companyId && $companiesQuery.data?.data?.[0]) {
      authStore.setCompany($companiesQuery.data.data[0]);
    }
  });

  // Fetch jobs to allow job selection
  const jobsQuery = useJobRequirements(companyId);
  
  // Auto-select first job if none selected
  $effect(() => {
    if (!selectedJobId && $jobsQuery.data?.data?.length > 0) {
      selectedJobId = $jobsQuery.data.data[0].job_requirement_id;
    }
  });

  // Job options for dropdown
  const jobOptions = $derived([
    { value: '', label: 'Select a Job' },
    ...($jobsQuery.data?.data || []).map((job: any) => ({
      value: job.job_requirement_id,
      label: job.title
    }))
  ]);

  // Get candidates for selected job
  const candidatesQuery = useCandidates(selectedJobId ? { job_requirement_id: selectedJobId } : undefined);

  // Filter and sort candidates
  const filteredCandidates = $derived(() => {
    let result = $candidatesQuery.data?.data?.data || [];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((c: any) => 
        c.first_name?.toLowerCase().includes(searchLower) ||
        c.last_name?.toLowerCase().includes(searchLower) ||
        c.email?.toLowerCase().includes(searchLower) ||
        c.skills?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (status) {
      result = result.filter((c: any) => c.status === status);
    }

    // Sort
    result = [...result].sort((a: any, b: any) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'oldest':
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        case 'score_high':
          return (b.candidate_resume_score || 0) - (a.candidate_resume_score || 0);
        case 'score_low':
          return (a.candidate_resume_score || 0) - (b.candidate_resume_score || 0);
        case 'name_asc':
          return (`${a.first_name} ${a.last_name}` || '').localeCompare(`${b.first_name} ${b.last_name}` || '');
        case 'name_desc':
          return (`${b.first_name} ${b.last_name}` || '').localeCompare(`${a.first_name} ${a.last_name}` || '');
        default:
          return 0;
      }
    });

    return result;
  });

  const allCandidates = $derived(filteredCandidates() || []);

  function clearFilters() {
    search = '';
    status = '';
    sortBy = 'newest';
  }

  function handleViewCandidate(event: CustomEvent<{ id: string }>) {
    goto(`/candidates/${event.detail.id}`);
  }

  function handleExport() {
    // Export candidates to CSV
    const data = filteredCandidates();
    const headers = ['Name', 'Email', 'Phone', 'Status', 'Resume Score', 'Applied'];
    const rows = data.map((c: any) => [
      `${c.first_name || ''} ${c.last_name || ''}`.trim(),
      c.email || '',
      c.phone || '',
      c.status || '',
      c.candidate_resume_score?.toString() || '',
      c.created_at || ''
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'candidates.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Candidates | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Candidates</h1>
      <p class="text-gray-500 mt-1">
        Manage all candidates across your job openings
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Job Selector -->
      <div class="w-64">
        <Select 
          options={jobOptions} 
          value={selectedJobId} 
          onchange={(e) => selectedJobId = e.currentTarget.value}
          disabled={$jobsQuery.isLoading}
        />
      </div>

      <!-- View Mode Toggle -->
      <div class="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200">
        <button
          class="p-2 rounded-md transition-colors {viewMode === 'table' ? 'bg-royal-600 text-white' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => viewMode = 'table'}
          aria-label="Table view"
        >
          <List class="w-4 h-4" />
        </button>
        <button
          class="p-2 rounded-md transition-colors {viewMode === 'pipeline' ? 'bg-royal-600 text-white' : 'text-gray-500 hover:text-gray-700'}"
          onclick={() => viewMode = 'pipeline'}
          aria-label="Pipeline view"
        >
          <LayoutGrid class="w-4 h-4" />
        </button>
      </div>

      <Button variant="outline" size="sm" onclick={handleExport}>
        <Download class="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
    {#each [
      { label: 'Total', count: allCandidates.length, color: 'gray' },
      { label: 'Applied', count: allCandidates.filter((c: any) => c.status === 'applied').length, color: 'gray' },
      { label: 'Screening', count: allCandidates.filter((c: any) => c.status === 'resume_screened').length, color: 'royal' },
      { label: 'Aptitude', count: allCandidates.filter((c: any) => c.status?.includes('aptitude')).length, color: 'blue' },
      { label: 'Technical', count: allCandidates.filter((c: any) => c.status?.includes('technical')).length, color: 'amber' },
      { label: 'HR', count: allCandidates.filter((c: any) => c.status?.includes('hr')).length, color: 'purple' },
      { label: 'Offered', count: allCandidates.filter((c: any) => c.status === 'hire_recommended').length, color: 'emerald' },
      { label: 'Rejected', count: allCandidates.filter((c: any) => c.status === 'rejected').length, color: 'red' }
    ] as stat}
      <div class="bg-gray-100 border border-gray-200 rounded-lg p-3 text-center">
        <p class="text-2xl font-bold text-gray-900">{stat.count}</p>
        <p class="text-xs text-gray-500">{stat.label}</p>
      </div>
    {/each}
  </div>

  <!-- Filters -->
  <CandidateFilters
    {search}
    {status}
    {sortBy}
    onSearchChange={(v) => search = v}
    onStatusChange={(v) => status = v}
    onSortChange={(v) => sortBy = v}
    onClear={clearFilters}
  />

  <!-- Content -->
  {#if !selectedJobId}
    <!-- No job selected state -->
    <div class="text-center py-12">
      <Briefcase class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">Select a Job</h3>
      <p class="text-gray-500 mb-6">
        Please select a job from the dropdown above to view candidates
      </p>
      {#if $jobsQuery.data?.data?.length === 0}
        <Button href="/jobs/new">Create Your First Job</Button>
      {/if}
    </div>
  {:else if viewMode === 'table'}
    <div class="bg-gray-50 border border-gray-200 rounded-lg">
      <CandidateTable
        candidates={filteredCandidates()}
        loading={$candidatesQuery.isLoading}
        on:view={handleViewCandidate}
        on:viewResume={(e) => console.log('View resume:', e.detail.id)}
        on:schedule={(e) => console.log('Schedule:', e.detail)}
        on:delete={(e) => console.log('Delete:', e.detail.id)}
      />
    </div>
  {:else}
    <PipelineView
      candidates={filteredCandidates() || []}
      loading={$candidatesQuery.isLoading}
      on:view={handleViewCandidate}
      on:move={(e) => console.log('Move candidate:', e.detail)}
    />
  {/if}

  <!-- Empty State for when job is selected but no candidates -->
  {#if selectedJobId && !$candidatesQuery.isLoading && filteredCandidates().length === 0 && !search && !status}
    <div class="text-center py-12">
      <Users class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">No candidates yet</h3>
      <p class="text-gray-500 mb-6">
        Candidates will appear here when they apply for this job
      </p>
      <Button href="/jobs">View Job Openings</Button>
    </div>
  {/if}
</div>
