<script lang="ts">
  import { page } from '$app/stores';
  import { useAptitudeLoginForm } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  // Query to get login form URL
  const loginFormQuery = useAptitudeLoginForm(jobId, testId);

  // Get login URL from query data
  const loginUrl = $derived($loginFormQuery.data?.data?.login_url || $loginFormQuery.data?.data?.form_url);
  const loginData = $derived($loginFormQuery.data?.data?.login_data);

  // Auto-redirect when login URL is available
  $effect(() => {
    if (loginUrl && !$loginFormQuery.isLoading) {
      // Small delay to show the loading state
      setTimeout(() => {
        window.location.href = loginUrl;
      }, 1500);
    }
  });
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
  <div class="max-w-md w-full mx-4">
    {#if $loginFormQuery.isLoading}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4">
          <Brain class="w-8 h-8 text-royal-400" />
        </div>
        <Skeleton class="h-6 w-48 mx-auto mb-2" />
        <Skeleton class="h-4 w-64 mx-auto" />
      </Card>
    {:else if $loginFormQuery.error}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-red-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Unable to Load Test</h2>
        <p class="text-obsidian-400 mb-4">
          {$loginFormQuery.error.message || 'Failed to load aptitude test. Please try again.'}
        </p>
        <button
          class="px-4 py-2 bg-royal-600 text-white rounded-lg hover:bg-royal-700 transition-colors"
          onclick={() => window.location.reload()}
        >
          Try Again
        </button>
      </Card>
    {:else if loginUrl}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Brain class="w-8 h-8 text-royal-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">
          {loginData?.test_title || 'Aptitude Test'}
        </h2>
        <p class="text-obsidian-400 mb-6">
          Redirecting you to the test...
        </p>
        <div class="flex items-center justify-center gap-2 text-royal-400">
          <Loader2 class="w-5 h-5 animate-spin" />
          <span>Please wait</span>
        </div>
        
        <div class="mt-6 pt-6 border-t border-obsidian-700">
          <p class="text-xs text-obsidian-500 mb-2">Not redirected automatically?</p>
          <a
            href={loginUrl}
            class="inline-flex items-center gap-2 px-4 py-2 bg-obsidian-800 text-obsidian-200 rounded-lg hover:bg-obsidian-700 transition-colors text-sm"
          >
            <ExternalLink class="w-4 h-4" />
            Click here to open test
          </a>
        </div>
      </Card>
    {:else}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-amber-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-amber-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Test Not Available</h2>
        <p class="text-obsidian-400">
          The aptitude test link is not available. Please contact HR for assistance.
        </p>
      </Card>
    {/if}
  </div>
</div>
