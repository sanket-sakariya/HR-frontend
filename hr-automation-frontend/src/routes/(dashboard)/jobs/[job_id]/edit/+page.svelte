<script lang="ts">
  import { page } from '$app/stores';
  import { useJobRequirement } from '$lib/api/queries/jobs';
  import JobForm from '$lib/components/jobs/JobForm.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';

  const jobId = $page.params.job_id;
  const jobQuery = useJobRequirement(jobId);
</script>

<svelte:head>
  <title>Edit Job | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-slate-100">Edit Job Requirement</h1>
    <p class="text-slate-400 mt-1">Update the job details</p>
  </div>

  {#if $jobQuery.isLoading}
    <div class="space-y-6">
      <Skeleton class="h-64" />
      <Skeleton class="h-48" />
      <Skeleton class="h-48" />
    </div>
  {:else if $jobQuery.data}
    <JobForm job={$jobQuery.data} mode="edit" />
  {:else}
    <div class="card-executive p-12 text-center">
      <p class="text-slate-400">Job not found</p>
    </div>
  {/if}
</div>
