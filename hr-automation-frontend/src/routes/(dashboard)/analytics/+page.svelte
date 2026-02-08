<script lang="ts">
  import { createJobsQuery } from '$lib/api/queries/jobs';
  import { createCandidatesQuery } from '$lib/api/queries/candidates';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    Briefcase,
    Clock,
    Target,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Download
  } from 'lucide-svelte';

  const jobsQuery = createJobsQuery();
  const candidatesQuery = createCandidatesQuery();

  let timeRange = $state('30d');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '365d', label: 'Last year' }
  ];

  // Computed stats
  const totalJobs = $derived($jobsQuery.data?.length || 0);
  const activeJobs = $derived($jobsQuery.data?.filter(j => j.status === 'active').length || 0);
  const totalCandidates = $derived($candidatesQuery.data?.length || 0);
  const hiredCandidates = $derived($candidatesQuery.data?.filter(c => c.status === 'hired').length || 0);
  
  // Mock conversion rates
  const avgTimeToHire = 24; // days
  const conversionRate = totalCandidates > 0 ? Math.round((hiredCandidates / totalCandidates) * 100) : 0;

  // Pipeline data
  const pipelineData = $derived({
    applied: $candidatesQuery.data?.filter(c => c.status === 'applied').length || 0,
    screening: $candidatesQuery.data?.filter(c => c.status === 'screening').length || 0,
    aptitude: $candidatesQuery.data?.filter(c => c.status === 'aptitude').length || 0,
    technical: $candidatesQuery.data?.filter(c => c.status === 'technical').length || 0,
    hr: $candidatesQuery.data?.filter(c => c.status === 'hr').length || 0,
    offered: $candidatesQuery.data?.filter(c => c.status === 'offered').length || 0,
    hired: $candidatesQuery.data?.filter(c => c.status === 'hired').length || 0,
    rejected: $candidatesQuery.data?.filter(c => c.status === 'rejected').length || 0
  });

  const maxPipelineValue = $derived(Math.max(...Object.values(pipelineData), 1));

  // Mock source data
  const sourceData = [
    { source: 'Direct Application', count: 45, percentage: 45 },
    { source: 'LinkedIn', count: 25, percentage: 25 },
    { source: 'Referral', count: 15, percentage: 15 },
    { source: 'Job Boards', count: 10, percentage: 10 },
    { source: 'Other', count: 5, percentage: 5 }
  ];

  function exportReport() {
    // Mock export functionality
    const data = {
      timeRange,
      stats: { totalJobs, activeJobs, totalCandidates, hiredCandidates, avgTimeToHire, conversionRate },
      pipeline: pipelineData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Analytics | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-obsidian-100">Analytics</h1>
      <p class="text-obsidian-400 mt-1">Track your hiring performance and metrics</p>
    </div>

    <div class="flex items-center gap-3">
      <Select
        value={timeRange}
        options={timeRangeOptions}
        onchange={(e) => timeRange = e.currentTarget.value}
        class="w-40"
      />
      <Button variant="outline" onclick={exportReport}>
        <Download class="w-4 h-4 mr-2" />
        Export
      </Button>
    </div>
  </div>

  <!-- Key Metrics -->
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-obsidian-400">Total Candidates</p>
          <p class="text-3xl font-bold text-obsidian-100 mt-1">{totalCandidates}</p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-500">
            <ArrowUpRight class="w-4 h-4" />
            <span>+12% vs last period</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-royal-900/50 flex items-center justify-center">
          <Users class="w-6 h-6 text-royal-400" />
        </div>
      </div>
    </Card>

    <Card class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-obsidian-400">Active Jobs</p>
          <p class="text-3xl font-bold text-obsidian-100 mt-1">{activeJobs}</p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-500">
            <ArrowUpRight class="w-4 h-4" />
            <span>+3 new this week</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-emerald-900/50 flex items-center justify-center">
          <Briefcase class="w-6 h-6 text-emerald-400" />
        </div>
      </div>
    </Card>

    <Card class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-obsidian-400">Avg. Time to Hire</p>
          <p class="text-3xl font-bold text-obsidian-100 mt-1">{avgTimeToHire}<span class="text-lg text-obsidian-400 ml-1">days</span></p>
          <div class="flex items-center gap-1 mt-2 text-sm text-emerald-500">
            <TrendingDown class="w-4 h-4" />
            <span>-2 days vs last period</span>
          </div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-amber-900/50 flex items-center justify-center">
          <Clock class="w-6 h-6 text-amber-400" />
        </div>
      </div>
    </Card>

    <Card class="p-6">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-obsidian-400">Conversion Rate</p>
          <p class="text-3xl font-bold text-obsidian-100 mt-1">{conversionRate}<span class="text-lg text-obsidian-400">%</span></p>
          <div class="flex items-center gap-1 mt-2 text-sm {conversionRate > 10 ? 'text-emerald-500' : 'text-red-500'}">
            {#if conversionRate > 10}
              <ArrowUpRight class="w-4 h-4" />
              <span>Above average</span>
            {:else}
              <ArrowDownRight class="w-4 h-4" />
              <span>Below average</span>
            {/if}
          </div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center">
          <Target class="w-6 h-6 text-purple-400" />
        </div>
      </div>
    </Card>
  </div>

  <div class="grid lg:grid-cols-2 gap-6">
    <!-- Pipeline Funnel -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-obsidian-100">Hiring Pipeline</h2>
        <BarChart3 class="w-5 h-5 text-obsidian-400" />
      </div>

      <div class="space-y-4">
        {#each [
          { label: 'Applied', value: pipelineData.applied, color: 'obsidian' },
          { label: 'Screening', value: pipelineData.screening, color: 'royal' },
          { label: 'Aptitude', value: pipelineData.aptitude, color: 'blue' },
          { label: 'Technical', value: pipelineData.technical, color: 'amber' },
          { label: 'HR Round', value: pipelineData.hr, color: 'purple' },
          { label: 'Offered', value: pipelineData.offered, color: 'emerald' },
          { label: 'Hired', value: pipelineData.hired, color: 'green' }
        ] as stage}
          <div class="flex items-center gap-4">
            <span class="w-24 text-sm text-obsidian-400">{stage.label}</span>
            <div class="flex-1 h-8 bg-obsidian-800 rounded-lg overflow-hidden">
              <div
                class="h-full bg-{stage.color}-600 rounded-lg flex items-center justify-end pr-3 transition-all duration-500"
                style="width: {(stage.value / maxPipelineValue) * 100}%"
              >
                {#if stage.value > 0}
                  <span class="text-sm font-medium text-white">{stage.value}</span>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </Card>

    <!-- Candidate Sources -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold text-obsidian-100">Candidate Sources</h2>
        <TrendingUp class="w-5 h-5 text-obsidian-400" />
      </div>

      <div class="space-y-4">
        {#each sourceData as source}
          <div class="flex items-center gap-4">
            <span class="w-32 text-sm text-obsidian-300">{source.source}</span>
            <div class="flex-1 h-4 bg-obsidian-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-royal-500 rounded-full transition-all duration-500"
                style="width: {source.percentage}%"
              ></div>
            </div>
            <span class="w-16 text-right text-sm text-obsidian-400">{source.count} ({source.percentage}%)</span>
          </div>
        {/each}
      </div>
    </Card>
  </div>

  <!-- Hiring Trends -->
  <Card class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-obsidian-100">Hiring Trends</h2>
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-royal-500"></div>
          <span class="text-obsidian-400">Applications</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span class="text-obsidian-400">Hires</span>
        </div>
      </div>
    </div>

    <!-- Simple chart placeholder -->
    <div class="h-64 flex items-end justify-between gap-2 px-4">
      {#each Array(12) as _, i}
        {@const appHeight = 30 + Math.random() * 60}
        {@const hireHeight = 10 + Math.random() * 30}
        <div class="flex-1 flex flex-col items-center gap-1">
          <div class="w-full flex gap-1 items-end">
            <div class="flex-1 bg-royal-500 rounded-t transition-all duration-500" style="height: {appHeight}%"></div>
            <div class="flex-1 bg-emerald-500 rounded-t transition-all duration-500" style="height: {hireHeight}%"></div>
          </div>
          <span class="text-xs text-obsidian-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
          </span>
        </div>
      {/each}
    </div>
  </Card>

  <!-- Performance Summary -->
  <div class="grid sm:grid-cols-3 gap-4">
    <Card class="p-6 text-center">
      <div class="text-4xl font-bold text-obsidian-100 mb-2">{hiredCandidates}</div>
      <p class="text-obsidian-400">Total Hires</p>
      <p class="text-sm text-emerald-500 mt-2">
        <ArrowUpRight class="w-4 h-4 inline" />
        +8 this month
      </p>
    </Card>

    <Card class="p-6 text-center">
      <div class="text-4xl font-bold text-obsidian-100 mb-2">{pipelineData.offered}</div>
      <p class="text-obsidian-400">Pending Offers</p>
      <p class="text-sm text-amber-500 mt-2">
        Awaiting response
      </p>
    </Card>

    <Card class="p-6 text-center">
      <div class="text-4xl font-bold text-obsidian-100 mb-2">
        {pipelineData.aptitude + pipelineData.technical + pipelineData.hr}
      </div>
      <p class="text-obsidian-400">In Interview Stage</p>
      <p class="text-sm text-royal-500 mt-2">
        Active candidates
      </p>
    </Card>
  </div>
</div>
