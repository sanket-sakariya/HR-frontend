<script lang="ts">
  import { page } from '$app/stores';
  import { useGenerateAptitudeTest } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);

  // Query to generate test and get entry URL
  const generateTestQuery = useGenerateAptitudeTest(jobId);

  // Get entry URL from query data
  const entryUrl = $derived(
    $generateTestQuery.data?.data?.entry_url || 
    $generateTestQuery.data?.data?.test_url ||
    $generateTestQuery.data?.data?.url
  );
  const testData = $derived($generateTestQuery.data?.data);

  function openTest() {
    if (entryUrl) {
      window.location.href = entryUrl;
    }
  }
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
  <div class="max-w-md w-full mx-4">
    {#if $generateTestQuery.isLoading}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4">
          <Brain class="w-8 h-8 text-royal-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Loading Aptitude Test</h2>
        <p class="text-obsidian-400 mb-4">Please wait while we prepare your test...</p>
        <div class="flex items-center justify-center gap-2 text-royal-400">
          <Loader2 class="w-5 h-5 animate-spin" />
          <span>Loading</span>
        </div>
      </Card>
    {:else if $generateTestQuery.error}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-red-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Unable to Load Test</h2>
        <p class="text-obsidian-400 mb-4">
          {$generateTestQuery.error.message || 'Failed to load aptitude test. Please try again.'}
        </p>
        <Button onclick={() => window.location.reload()}>
          Try Again
        </Button>
      </Card>
    {:else if entryUrl}
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-2xl bg-royal-900/50 flex items-center justify-center mx-auto mb-6">
          <Brain class="w-10 h-10 text-royal-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-2">
          {testData?.test_title || testData?.title || 'Aptitude Test'}
        </h2>
        <p class="text-obsidian-400 mb-6">
          Your aptitude test is ready. Click the button below to start.
        </p>

        {#if testData?.total_questions}
          <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div class="bg-obsidian-800/50 rounded-lg p-3">
              <p class="text-obsidian-500">Questions</p>
              <p class="text-lg font-semibold text-obsidian-100">{testData.total_questions}</p>
            </div>
            <div class="bg-obsidian-800/50 rounded-lg p-3">
              <p class="text-obsidian-500">Duration</p>
              <p class="text-lg font-semibold text-obsidian-100">{testData.duration_minutes || testData.total_time_minutes || 45} min</p>
            </div>
          </div>
        {/if}

        <Button class="w-full" onclick={openTest}>
          <ExternalLink class="w-4 h-4 mr-2" />
          Start Test
        </Button>
        
        <div class="mt-6 p-4 rounded-lg bg-amber-900/20 border border-amber-800/50">
          <div class="flex gap-3 text-left">
            <AlertCircle class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm text-amber-200">
              <p class="font-medium mb-1">Before you begin:</p>
              <ul class="list-disc list-inside text-amber-300/80 space-y-1 text-xs">
                <li>Ensure stable internet connection</li>
                <li>The test has a time limit</li>
                <li>You cannot pause once started</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-obsidian-700">
          <p class="text-xs text-obsidian-500 mb-2">Or copy this link:</p>
          <div class="flex items-center gap-2">
            <div class="flex-1 px-3 py-2 rounded-lg bg-obsidian-800 border border-obsidian-700 font-mono text-xs text-obsidian-400 truncate">
              {entryUrl}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onclick={() => {
                navigator.clipboard.writeText(entryUrl);
              }}
            >
              Copy
            </Button>
          </div>
        </div>
      </Card>
    {:else}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-amber-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-amber-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Test Not Available</h2>
        <p class="text-obsidian-400 mb-4">
          The aptitude test is not available at this time. Please contact HR for assistance.
        </p>
        <Button variant="outline" onclick={() => $generateTestQuery.refetch()}>
          Refresh
        </Button>
      </Card>
    {/if}
  </div>
</div>
