<script lang="ts">
  import { page } from '$app/stores';
  import { useCreateAptitudeTest } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle,
    Copy,
    Check
  } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const jobId = $derived($page.params.job_id);

  // Mutation to create aptitude test
  const createTestMutation = useCreateAptitudeTest();

  let testData = $state<any>(null);
  let isCreating = $state(false);
  let copied = $state(false);

  // Generate frontend URL for candidates to access the test
  // This uses the frontend route, not the backend API URL
  const frontendTestUrl = $derived(() => {
    if (!testData?.data?.aptitude_test_id || !jobId) return null;
    // Use the frontend route for candidates
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    return `${baseUrl}/aptitude/test/${jobId}/${testData.data.aptitude_test_id}/start`;
  });

  // Also keep the backend URL for reference
  const backendUrl = $derived(
    testData?.data?.test_access_url || 
    testData?.data?.public_url ||
    testData?.data?.entry_url || 
    testData?.data?.test_url ||
    testData?.data?.url
  );

  async function createTest() {
    if (!jobId) return;
    isCreating = true;
    try {
      const result = await $createTestMutation.mutateAsync(jobId);
      testData = result;
      if (result?.data?.already_exists) {
        toast.info('Aptitude test already exists for this job');
      } else {
        toast.success('Aptitude test created successfully');
      }
    } catch (error: any) {
      toast.error('Failed to create aptitude test', {
        description: error.message
      });
    } finally {
      isCreating = false;
    }
  }

  function copyLink() {
    const url = frontendTestUrl();
    if (url) {
      navigator.clipboard.writeText(url);
      copied = true;
      toast.success('Link copied to clipboard');
      setTimeout(() => copied = false, 2000);
    }
  }

  function openTest() {
    const url = frontendTestUrl();
    if (url) {
      window.open(url, '_blank');
    }
  }
</script>

<svelte:head>
  <title>Create Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
  <div class="max-w-md w-full mx-4">
    {#if !testData && !isCreating}
      <!-- Initial state - Create test button -->
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-2xl bg-royal-900/50 flex items-center justify-center mx-auto mb-6">
          <Brain class="w-10 h-10 text-royal-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-2">Create Aptitude Test</h2>
        <p class="text-obsidian-400 mb-6">
          Generate an AI-powered aptitude test for this job requirement. Selected candidates will be able to take this test.
        </p>
        
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700 mb-6 text-left">
          <h3 class="text-sm font-medium text-obsidian-200 mb-2">Test Details:</h3>
          <ul class="text-sm text-obsidian-400 space-y-1">
            <li>• 30 AI-generated questions</li>
            <li>• 45 minutes time limit</li>
            <li>• Multiple choice format</li>
            <li>• Automatic scoring</li>
          </ul>
        </div>

        <Button class="w-full" onclick={createTest} disabled={isCreating}>
          {#if isCreating}
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Creating Test...
          {:else}
            <Brain class="w-4 h-4 mr-2" />
            Create Aptitude Test
          {/if}
        </Button>
      </Card>
    {:else if isCreating}
      <!-- Loading state -->
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4">
          <Brain class="w-8 h-8 text-royal-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Creating Aptitude Test</h2>
        <p class="text-obsidian-400 mb-4">Please wait while we generate questions...</p>
        <div class="flex items-center justify-center gap-2 text-royal-400">
          <Loader2 class="w-5 h-5 animate-spin" />
          <span>This may take a moment</span>
        </div>
      </Card>
    {:else if testData?.data?.aptitude_test_id}
      <!-- Success state - Show test link -->
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-2xl bg-green-900/50 flex items-center justify-center mx-auto mb-6">
          <Check class="w-10 h-10 text-green-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-2">
          {testData?.data?.test_title || 'Aptitude Test Created'}
        </h2>
        <p class="text-obsidian-400 mb-6">
          {testData?.data?.already_exists ? 'Test already exists. ' : ''}
          Share this link with selected candidates.
        </p>

        {#if testData?.data?.total_questions}
          <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div class="bg-obsidian-800/50 rounded-lg p-3">
              <p class="text-obsidian-500">Questions</p>
              <p class="text-lg font-semibold text-obsidian-100">{testData.data.total_questions}</p>
            </div>
            <div class="bg-obsidian-800/50 rounded-lg p-3">
              <p class="text-obsidian-500">Test ID</p>
              <p class="text-xs font-mono text-obsidian-300 truncate">{testData.data.aptitude_test_id}</p>
            </div>
          </div>
        {/if}

        <div class="space-y-3 mb-6">
          <Button class="w-full" onclick={openTest}>
            <ExternalLink class="w-4 h-4 mr-2" />
            Open Test Page
          </Button>
          <Button variant="outline" class="w-full" onclick={copyLink}>
            {#if copied}
              <Check class="w-4 h-4 mr-2" />
              Copied!
            {:else}
              <Copy class="w-4 h-4 mr-2" />
              Copy Test Link
            {/if}
          </Button>
        </div>
        
        <div class="p-4 rounded-lg bg-obsidian-800/50 border border-obsidian-700">
          <p class="text-xs text-obsidian-500 mb-2">Candidate Test URL (share this with candidates):</p>
          <p class="font-mono text-xs text-obsidian-400 break-all">
            {frontendTestUrl()}
          </p>
        </div>

        <div class="mt-6 p-4 rounded-lg bg-amber-900/20 border border-amber-800/50">
          <div class="flex gap-3 text-left">
            <AlertCircle class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm text-amber-200">
              <p class="font-medium mb-1">Next Steps:</p>
              <ol class="list-decimal list-inside text-amber-300/80 space-y-1 text-xs">
                <li>Select top candidates from resume screening</li>
                <li>Share the test link with selected candidates</li>
                <li>Candidates take the test via the link</li>
                <li>Review results and select top performers</li>
              </ol>
            </div>
          </div>
        </div>
      </Card>
    {:else}
      <!-- Error state -->
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-red-400" />
        </div>
        <h2 class="text-xl font-bold text-obsidian-100 mb-2">Something Went Wrong</h2>
        <p class="text-obsidian-400 mb-4">
          Failed to create the aptitude test. Please try again.
        </p>
        <Button onclick={createTest}>
          Try Again
        </Button>
      </Card>
    {/if}
  </div>
</div>
