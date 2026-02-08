<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { createCandidatesQuery } from '$lib/api/queries/candidates';
  import CandidateTable from '$lib/components/candidates/CandidateTable.svelte';
  import CandidateFilters from '$lib/components/candidates/CandidateFilters.svelte';
  import PipelineView from '$lib/components/candidates/PipelineView.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Users, LayoutGrid, List, Download } from 'lucide-svelte';

  let search = $state('');
  let status = $state('');
  let sortBy = $state('newest');
  let viewMode = $state<'table' | 'pipeline'>('table');

  // Get candidates query
  const candidatesQuery = createCandidatesQuery();

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
    const headers = ['Name', 'Email', 'Phone', 'Position', 'Status', 'AI Score', 'Applied'];
    const rows = data.map(c => [
      c.name || '',
      c.email || '',
      c.phone || '',
      c.current_position || '',
      c.status || '',
      c.ai_score?.toString() || '',
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
      <h1 class="text-2xl font-bold text-obsidian-100">Candidates</h1>
      <p class="text-obsidian-400 mt-1">
        Manage all candidates across your job openings
      </p>
    </div>

    <div class="flex items-center gap-3">
      <!-- View Mode Toggle -->
      <div class="flex items-center bg-obsidian-800 rounded-lg p-1 border border-obsidian-700">
        <button
          class="p-2 rounded-md transition-colors {viewMode === 'table' ? 'bg-royal-600 text-white' : 'text-obsidian-400 hover:text-obsidian-200'}"
          onclick={() => viewMode = 'table'}
          aria-label="Table view"
        >
          <List class="w-4 h-4" />
        </button>
        <button
          class="p-2 rounded-md transition-colors {viewMode === 'pipeline' ? 'bg-royal-600 text-white' : 'text-obsidian-400 hover:text-obsidian-200'}"
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
      { label: 'Total', count: $candidatesQuery.data?.length || 0, color: 'obsidian' },
      { label: 'Applied', count: $candidatesQuery.data?.filter(c => c.status === 'applied').length || 0, color: 'obsidian' },
      { label: 'Screening', count: $candidatesQuery.data?.filter(c => c.status === 'screening').length || 0, color: 'royal' },
      { label: 'Aptitude', count: $candidatesQuery.data?.filter(c => c.status === 'aptitude').length || 0, color: 'blue' },
      { label: 'Technical', count: $candidatesQuery.data?.filter(c => c.status === 'technical').length || 0, color: 'amber' },
      { label: 'HR', count: $candidatesQuery.data?.filter(c => c.status === 'hr').length || 0, color: 'purple' },
      { label: 'Offered', count: $candidatesQuery.data?.filter(c => c.status === 'offered').length || 0, color: 'emerald' },
      { label: 'Hired', count: $candidatesQuery.data?.filter(c => c.status === 'hired').length || 0, color: 'green' }
    ] as stat}
      <div class="bg-obsidian-800/50 border border-obsidian-700 rounded-lg p-3 text-center">
        <p class="text-2xl font-bold text-obsidian-100">{stat.count}</p>
        <p class="text-xs text-obsidian-400">{stat.label}</p>
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
  {#if viewMode === 'table'}
    <div class="bg-obsidian-800/30 border border-obsidian-700 rounded-lg">
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
      candidates={$candidatesQuery.data || []}
      loading={$candidatesQuery.isLoading}
      on:view={handleViewCandidate}
      on:move={(e) => console.log('Move candidate:', e.detail)}
    />
  {/if}

  <!-- Empty State -->
  {#if !$candidatesQuery.isLoading && filteredCandidates().length === 0 && !search && !status}
    <div class="text-center py-12">
      <Users class="w-16 h-16 mx-auto text-obsidian-600 mb-4" />
      <h3 class="text-lg font-medium text-obsidian-200 mb-2">No candidates yet</h3>
      <p class="text-obsidian-400 mb-6">
        Candidates will appear here when they apply for your job openings
      </p>
      <Button href="/jobs">View Job Openings</Button>
    </div>
  {/if}
</div>
