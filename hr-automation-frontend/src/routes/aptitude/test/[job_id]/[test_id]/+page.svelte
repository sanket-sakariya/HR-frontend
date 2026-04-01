<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { Brain, Loader2 } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  onMount(() => {
    // Redirect to the start page
    goto(`/aptitude/test/${jobId}/${testId}/start`);
  });
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex items-center justify-center">
  <Card class="p-8 text-center max-w-md">
    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-purple-md animate-pulse">
      <Brain class="w-8 h-8 text-white" />
    </div>
    <h2 class="text-xl font-bold text-gray-800 mb-2">Redirecting...</h2>
    <p class="text-gray-500 mb-6">Taking you to the test login page</p>
    <div class="flex items-center justify-center gap-2 text-purple-600">
      <Loader2 class="w-5 h-5 animate-spin" />
      <span class="font-medium">Please wait</span>
    </div>
  </Card>
</div>
