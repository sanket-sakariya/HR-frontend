<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte';
  import { useJobRequirements } from '$lib/api/queries/jobs';
  import { useCompanies } from '$lib/api/queries/companies';
  import JobCard from '$lib/components/jobs/JobCard.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { goto } from '$app/navigation';
  import { Plus, Search, Briefcase } from 'lucide-svelte';

  let searchQuery = $state('');
  let statusFilter = $state('');

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

  const jobsQuery = useJobRequirements(companyId, {
    status: statusFilter || undefined
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'closed', label: 'Closed' }
  ];

  let filteredJobs = $derived.by(() => {
    const jobs = $jobsQuery.data?.data || [];
    if (!searchQuery) return jobs;
    
    const query = searchQuery.toLowerCase();
    return jobs.filter((job: any) => 
      job.title.toLowerCase().includes(query) ||
      job.department?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });
</script>

<svelte:head>
  <title>Jobs | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Job Requirements</h1>
      <p class="text-gray-500 mt-1">Manage your job postings and requirements</p>
    </div>
    <Button onclick={() => goto('/jobs/new')}>
      <Plus class="w-4 h-4" />
      Create Job
    </Button>
  </div>

  <!-- Filters -->
  <div class="flex flex-col sm:flex-row gap-4">
    <div class="relative flex-1 max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        bind:value={searchQuery}
        placeholder="Search jobs..."
        class="pl-10"
      />
    </div>
    <div class="w-48">
      <Select
        options={statusOptions}
        bind:value={statusFilter}
      />
    </div>
  </div>

  <!-- Jobs List -->
  {#if $jobsQuery.isLoading}
    <div class="grid gap-4">
      {#each Array(3) as _}
        <Skeleton class="h-48" />
      {/each}
    </div>
  {:else if filteredJobs.length === 0}
    <div class="card-executive p-12 text-center">
      <div class="inline-flex items-center justify-center p-4 rounded-full bg-gray-100 mb-4">
        <Briefcase class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-800 mb-2">No jobs found</h3>
      <p class="text-gray-500 mb-6">
        {searchQuery ? 'Try adjusting your search criteria' : 'Create your first job requirement to get started'}
      </p>
      {#if !searchQuery}
        <Button onclick={() => goto('/jobs/new')}>
          <Plus class="w-4 h-4" />
          Create Job
        </Button>
      {/if}
    </div>
  {:else}
    <div class="grid gap-4">
      {#each filteredJobs as job (job.job_requirement_id)}
        <JobCard {job} />
      {/each}
    </div>
  {/if}
</div>
