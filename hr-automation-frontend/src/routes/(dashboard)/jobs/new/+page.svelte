<script lang="ts">
  import JobForm from '$lib/components/jobs/JobForm.svelte';
</script>

<svelte:head>
  <title>Create Job | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-slate-100">Create Job Requirement</h1>
    <p class="text-slate-400 mt-1">Fill in the details to create a new job posting</p>
  </div>

  <JobForm mode="create" />
</div>
