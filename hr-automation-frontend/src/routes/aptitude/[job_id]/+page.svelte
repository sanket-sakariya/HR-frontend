<script lang="ts">
  import { page } from '$app/stores';
  import { useCreateAptitudeTest, useGenerateAptitudeTest } from '$lib/api/queries/aptitude';
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

  // Mutations
  const createTestMutation = useCreateAptitudeTest();
  const generateTestMutation = useGenerateAptitudeTest();

  let testData = $state<any>(null);
  let isCreating = $state(false);
  let copied = $state(false);

  // Use the URLs from the backend response (login_form_url, test_form_url, entry_url)
  const entryUrl = $derived(
    testData?.data?.entry_url || 
    testData?.data?.login_form_url
  );

  const testFormUrl = $derived(testData?.data?.test_form_url);

  // Primary URL to share with candidates - directly use entry_url from backend
  const candidateUrl = $derived(entryUrl);

  async function createTest() {
    if (!jobId) return;
    isCreating = true;
    try {
      // Step 1: Create the aptitude test
      await $createTestMutation.mutateAsync(jobId);
      
      // Step 2: Generate the test forms and get URLs
      const result = await $generateTestMutation.mutateAsync(jobId);
      testData = result;
      
      if (result?.data?.test_details) {
        toast.success('Aptitude test created successfully', {
          description: `${result.data.questions_count || result.data.test_details.total_questions} questions generated`
        });
      } else {
        toast.success('Aptitude test created');
      }
    } catch (error: any) {
      // If create fails because test already exists, try to get the generated test
      if (error.message?.includes('already exists') || error.message?.includes('409')) {
        try {
          const result = await $generateTestMutation.mutateAsync(jobId);
          testData = result;
          toast.info('Aptitude test already exists', {
            description: 'Showing existing test details'
          });
          return;
        } catch (genError: any) {
          toast.error('Failed to fetch existing test', {
            description: genError.message
          });
        }
      } else {
        toast.error('Failed to create aptitude test', {
          description: error.message
        });
      }
    } finally {
      isCreating = false;
    }
  }

  function copyLink() {
    if (candidateUrl) {
      navigator.clipboard.writeText(candidateUrl);
      copied = true;
      toast.success('Link copied to clipboard');
      setTimeout(() => copied = false, 2000);
    }
  }

  function openTest() {
    if (candidateUrl) {
      window.open(candidateUrl, '_blank');
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
    {:else if testData?.data?.test_details?.aptitude_test_id}
      <!-- Success state - Show test link -->
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-2xl bg-green-900/50 flex items-center justify-center mx-auto mb-6">
          <Check class="w-10 h-10 text-green-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-2">
          {testData?.data?.test_details?.test_title || 'Aptitude Test Created'}
        </h2>
        <p class="text-obsidian-400 mb-6">
          {testData?.message || 'Share this link with selected candidates.'}
        </p>

        <div class="grid grid-cols-3 gap-3 mb-6 text-sm">
          <div class="bg-obsidian-800/50 rounded-lg p-3">
            <p class="text-obsidian-500 text-xs">Questions</p>
            <p class="text-lg font-semibold text-obsidian-100">
              {testData.data.questions_count || testData.data.test_details.total_questions || 30}
            </p>
          </div>
          <div class="bg-obsidian-800/50 rounded-lg p-3">
            <p class="text-obsidian-500 text-xs">Duration</p>
            <p class="text-lg font-semibold text-obsidian-100">
              {testData.data.test_details.total_time_minutes || 45} min
            </p>
          </div>
          <div class="bg-obsidian-800/50 rounded-lg p-3">
            <p class="text-obsidian-500 text-xs">Pass Score</p>
            <p class="text-lg font-semibold text-obsidian-100">
              {testData.data.test_details.passing_score_percentage || 60}%
            </p>
          </div>
        </div>

        {#if testData.data.test_details.proctoring_settings}
          <div class="mb-6 p-3 rounded-lg bg-obsidian-800/30 border border-obsidian-700">
            <p class="text-xs text-obsidian-500 mb-2">Proctoring Settings</p>
            <div class="flex flex-wrap gap-2 justify-center text-xs">
              {#if testData.data.test_details.proctoring_settings.fullscreen_mode}
                <span class="px-2 py-1 rounded bg-royal-900/50 text-royal-300">Fullscreen Required</span>
              {/if}
              {#if testData.data.test_details.proctoring_settings.tab_switch_detection}
                <span class="px-2 py-1 rounded bg-amber-900/50 text-amber-300">
                  Tab Switch Detection (max {testData.data.test_details.proctoring_settings.max_tab_switches_allowed || 3})
                </span>
              {/if}
              {#if testData.data.test_details.proctoring_settings.copy_paste_detection}
                <span class="px-2 py-1 rounded bg-red-900/50 text-red-300">Copy/Paste Disabled</span>
              {/if}
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
          <p class="text-xs text-obsidian-500 mb-2">Candidate Login URL (share this with candidates):</p>
          <p class="font-mono text-xs text-royal-400 break-all">
            {candidateUrl}
          </p>
        </div>

        {#if testFormUrl && testFormUrl !== entryUrl}
          <div class="mt-3 p-4 rounded-lg bg-obsidian-800/30 border border-obsidian-700">
            <p class="text-xs text-obsidian-500 mb-2">Direct Test Form URL:</p>
            <p class="font-mono text-xs text-obsidian-400 break-all">
              {testFormUrl}
            </p>
          </div>
        {/if}

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
