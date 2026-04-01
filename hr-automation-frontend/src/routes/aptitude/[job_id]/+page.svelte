<script lang="ts">
  import { page } from '$app/stores';
  import { useCreateAptitudeTest } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle,
    Copy,
    Check,
    Sparkles,
    Clock,
    FileQuestion,
    Target,
    Users,
    ArrowRight,
    Link2,
    CheckCircle2,
    RefreshCw
  } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const jobId = $derived($page.params.job_id);

  // Mutation to create aptitude test
  const createTestMutation = useCreateAptitudeTest();

  let testData = $state<any>(null);
  let isCreating = $state(false);
  let copied = $state(false);

  // Generate frontend URL for candidates to access the test
  const frontendTestUrl = $derived(() => {
    if (!testData?.data?.aptitude_test_id || !jobId) return null;
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
      setTimeout(() => (copied = false), 2000);
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

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex flex-col">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
    <div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
        <Brain class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="font-semibold text-gray-800">HR Automation</h1>
        <p class="text-xs text-gray-500">Aptitude Test Generator</p>
      </div>
    </div>
  </header>

  <!-- Main content -->
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      {#if !testData && !isCreating}
        <!-- Initial state - Create test -->
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Sparkles class="w-4 h-4" />
            AI-Powered Assessment
          </span>
          <h1 class="text-3xl font-bold text-gray-800 mb-3">Create Aptitude Test</h1>
          <p class="text-gray-500 max-w-md mx-auto">
            Generate an intelligent aptitude test tailored to your job requirements
          </p>
        </div>

        <Card class="p-8">
          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <FileQuestion class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">30 Questions</p>
                <p class="text-sm text-gray-500">AI-generated based on job role</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Clock class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">45 Minutes</p>
                <p class="text-sm text-gray-500">Timed assessment</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Target class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">Multiple Choice</p>
                <p class="text-sm text-gray-500">Easy to complete format</p>
              </div>
            </div>
            <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Users class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="font-medium text-gray-800">Auto Scoring</p>
                <p class="text-sm text-gray-500">Instant results & ranking</p>
              </div>
            </div>
          </div>

          <Button class="w-full" size="lg" onclick={createTest}>
            <Sparkles class="w-5 h-5" />
            Generate Aptitude Test
            <ArrowRight class="w-5 h-5" />
          </Button>
        </Card>
      {:else if isCreating}
        <!-- Loading state -->
        <Card class="p-8">
          <div class="text-center">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-purple-md animate-pulse">
              <Brain class="w-10 h-10 text-white" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Creating Your Test</h2>
            <p class="text-gray-500 mb-6">Our AI is generating questions tailored to your job requirements...</p>

            <div class="flex items-center justify-center gap-3 text-purple-600 mb-6">
              <Loader2 class="w-5 h-5 animate-spin" />
              <span class="font-medium">This may take a moment</span>
            </div>

            <!-- Progress steps -->
            <div class="max-w-sm mx-auto space-y-3">
              <div class="flex items-center gap-3 text-sm">
                <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check class="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span class="text-gray-600">Analyzing job requirements</span>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center animate-pulse">
                  <Loader2 class="w-3.5 h-3.5 text-purple-600 animate-spin" />
                </div>
                <span class="text-gray-600">Generating questions</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-400">
                <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span class="w-2 h-2 rounded-full bg-gray-300"></span>
                </div>
                <span>Creating test form</span>
              </div>
            </div>
          </div>
        </Card>
      {:else if testData?.data?.aptitude_test_id}
        <!-- Success state - Show test link -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            {testData?.data?.test_title || 'Test Created Successfully!'}
          </h1>
          <p class="text-gray-500">
            {testData?.data?.already_exists ? 'Test already exists. ' : ''}
            Share the link below with candidates.
          </p>
        </div>

        <Card class="p-6 mb-6">
          {#if testData?.data?.total_questions}
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p class="text-2xl font-bold text-gray-800">{testData.data.total_questions}</p>
                <p class="text-sm text-gray-500">Questions</p>
              </div>
              <div class="text-center p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p class="text-xs font-mono text-gray-400 truncate">{testData.data.aptitude_test_id}</p>
                <p class="text-sm text-gray-500">Test ID</p>
              </div>
            </div>
          {/if}

          <div class="space-y-3">
            <Button class="w-full" size="lg" onclick={openTest}>
              <ExternalLink class="w-5 h-5" />
              Preview Test
            </Button>
            <Button variant="outline" class="w-full" size="lg" onclick={copyLink}>
              {#if copied}
                <Check class="w-5 h-5" />
                Copied to Clipboard!
              {:else}
                <Copy class="w-5 h-5" />
                Copy Candidate Link
              {/if}
            </Button>
          </div>
        </Card>

        <!-- URL display -->
        <Card class="p-4 mb-6">
          <div class="flex items-center gap-3 mb-2">
            <Link2 class="w-4 h-4 text-gray-400" />
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Candidate Test URL</p>
          </div>
          <p class="font-mono text-sm text-purple-600 break-all bg-purple-50 p-3 rounded-lg border border-purple-100">
            {frontendTestUrl()}
          </p>
        </Card>

        <!-- Next steps -->
        <Card class="p-6 border-purple-200 bg-purple-50/50">
          <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Target class="w-5 h-5 text-purple-600" />
            Next Steps
          </h3>
          <ol class="space-y-3">
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">1</span>
              <span class="text-gray-600 text-sm">Select top candidates from resume screening</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">2</span>
              <span class="text-gray-600 text-sm">Share the test link with selected candidates via email</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">3</span>
              <span class="text-gray-600 text-sm">Monitor test completions and review scores in dashboard</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">4</span>
              <span class="text-gray-600 text-sm">Proceed with top performers to technical/HR interviews</span>
            </li>
          </ol>
        </Card>
      {:else}
        <!-- Error state -->
        <Card class="p-8">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle class="w-8 h-8 text-red-500" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Something Went Wrong</h2>
            <p class="text-gray-500 mb-6">
              We couldn't create the aptitude test. Please try again.
            </p>
            <Button onclick={createTest} class="w-full">
              <RefreshCw class="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </Card>
      {/if}
    </div>
  </main>

  <!-- Footer -->
  <footer class="py-6 text-center">
    <p class="text-xs text-gray-400">
      Powered by HR Automation Platform
    </p>
  </footer>
</div>
