<script lang="ts">
  import { authStore } from '$lib/stores/auth.svelte';
  import { useCompanies, useCompany } from '$lib/api/queries/companies';
  import { useJobRequirements } from '$lib/api/queries/jobs';
  import StatCard from '$lib/components/dashboard/StatCard.svelte';
  import JobsOverview from '$lib/components/dashboard/JobsOverview.svelte';
  import RecentCandidates from '$lib/components/dashboard/RecentCandidates.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Plus, Briefcase, Users, Video, CheckCircle } from 'lucide-svelte';

  // First fetch companies for this user/workspace
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

  const companyQuery = useCompany(companyId);
  const jobsQuery = useJobRequirements(companyId);

  // Derived stats from jobs data
  let stats = $derived.by(() => {
    const jobs = $jobsQuery.data?.data || [];
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j: any) => j.status === 'active').length;
    const totalCandidates = jobs.reduce((acc: number, j: any) => acc + (j.candidates_count || 0), 0);
    
    return {
      totalJobs,
      activeJobs,
      totalCandidates,
      interviewsCompleted: 0 // Would need separate API call
    };
  });
</script>

<svelte:head>
  <title>Dashboard | HR Automation</title>
</svelte:head>

{#if $companiesQuery.isLoading}
  <!-- Loading state while fetching company -->
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent mx-auto mb-4"></div>
      <p class="text-slate-400">Loading your dashboard...</p>
    </div>
  </div>
{:else if !companyId && !$companiesQuery.isLoading}
  <!-- No company registered - prompt to create one -->
  <div class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center max-w-md">
      <div class="w-16 h-16 rounded-2xl bg-royal-900/50 flex items-center justify-center mx-auto mb-6">
        <Briefcase class="w-8 h-8 text-royal-400" />
      </div>
      <h2 class="text-2xl font-bold text-slate-100 mb-2">Welcome to HR Automation!</h2>
      <p class="text-slate-400 mb-6">
        To get started, please register your company details first.
      </p>
      <Button onclick={() => window.location.href = '/company'}>
        Register Company
      </Button>
    </div>
  </div>
{:else}
<div class="space-y-8">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-100">
        Welcome back{$companyQuery.data?.company_name ? `, ${$companyQuery.data.company_name}` : ''}!
      </h1>
      <p class="text-slate-400 mt-1">Here's what's happening with your hiring pipeline</p>
    </div>
    <Button onclick={() => window.location.href = '/jobs/new'}>
      <Plus class="w-4 h-4" />
      Create Job
    </Button>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#if $jobsQuery.isLoading}
      {#each Array(4) as _}
        <Skeleton class="h-32" />
      {/each}
    {:else}
      <StatCard
        title="Total Jobs"
        value={stats.totalJobs}
        icon={Briefcase}
        color="primary"
      />
      <StatCard
        title="Active Jobs"
        value={stats.activeJobs}
        icon={Briefcase}
        color="success"
      />
      <StatCard
        title="Total Candidates"
        value={stats.totalCandidates}
        icon={Users}
        color="warning"
      />
      <StatCard
        title="Interviews Completed"
        value={stats.interviewsCompleted}
        icon={Video}
        color="danger"
      />
    {/if}
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Jobs Overview -->
    <div class="card-executive p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-slate-100">Job Requirements</h2>
        <a href="/jobs" class="text-sm text-royal-400 hover:text-royal-300 font-medium">
          View all
        </a>
      </div>
      
      {#if $jobsQuery.isLoading}
        <div class="space-y-3">
          {#each Array(3) as _}
            <Skeleton class="h-20" />
          {/each}
        </div>
      {:else}
        <JobsOverview jobs={$jobsQuery.data?.data || []} />
      {/if}
    </div>

    <!-- Recent Candidates -->
    <div class="card-executive p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-slate-100">Recent Candidates</h2>
        <a href="/candidates" class="text-sm text-royal-400 hover:text-royal-300 font-medium">
          View all
        </a>
      </div>
      <RecentCandidates companyId={companyId || ''} />
    </div>
  </div>
</div>
{/if}
