<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createJobQuery } from '$lib/api/queries/jobs';
  import { useCreateAptitudeTest } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    ArrowLeft,
    Brain,
    Plus,
    Copy,
    ExternalLink,
    Users,
    CheckCircle,
    Loader2
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const createMutation = useCreateAptitudeTest();

  const job = $derived($jobQuery.data);

  // Store the created test info
  let createdTest = $state<{
    aptitude_test_id: string;
    test_title: string;
    total_questions: number;
    public_url: string;
    test_access_url: string;
    already_exists: boolean;
  } | null>(null);

  // Check localStorage for existing test
  $effect(() => {
    if (jobId) {
      const stored = localStorage.getItem(`aptitude_test_${jobId}`);
      if (stored) {
        createdTest = JSON.parse(stored);
      }
    }
  });

  async function handleCreateTest() {
    try {
      const result = await $createMutation.mutateAsync(jobId);
      const testData = result?.data;
      
      if (testData) {
        createdTest = testData;
        // Store in localStorage for persistence
        localStorage.setItem(`aptitude_test_${jobId}`, JSON.stringify(testData));
        
        if (testData.already_exists) {
          toast.info('Aptitude test already exists for this job');
        } else {
          toast.success('Aptitude test created successfully!');
        }
      }
    } catch (error: any) {
      toast.error('Failed to create aptitude test', {
        description: error.message
      });
    }
  }

  function copyPublicUrl() {
    if (createdTest?.public_url) {
      navigator.clipboard.writeText(createdTest.public_url);
      toast.success('Public URL copied to clipboard');
    }
  }

  function copyTestAccessUrl() {
    if (createdTest?.test_access_url) {
      navigator.clipboard.writeText(createdTest.test_access_url);
      toast.success('Test access URL copied to clipboard');
    }
  }

  function copyCandidateUrl() {
    const url = `${window.location.origin}/aptitude/${jobId}`;
    navigator.clipboard.writeText(url);
    toast.success('Candidate test URL copied to clipboard');
  }
</script>

<svelte:head>
  <title>Aptitude Test - {job?.title || 'Job'} | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <!-- Back Button -->
  <Button variant="ghost" href="/jobs/{jobId}" class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Job
  </Button>

  <!-- Header -->
  <div class="flex items-start justify-between">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <Brain class="w-6 h-6 text-royal-400" />
        <h1 class="text-2xl font-bold text-obsidian-100">Aptitude Test</h1>
      </div>
      <p class="text-obsidian-400">
        AI-generated aptitude test for {job?.title || 'this job'}
      </p>
    </div>
  </div>

  {#if $jobQuery.isLoading}
    <Skeleton class="h-64" />
  {:else if !createdTest}
    <!-- No Test Created Yet -->
    <Card class="p-12 text-center">
      <Brain class="w-16 h-16 mx-auto text-obsidian-600 mb-4" />
      <h3 class="text-lg font-medium text-obsidian-200 mb-2">No aptitude test yet</h3>
      <p class="text-obsidian-400 mb-6 max-w-md mx-auto">
        Create an AI-generated aptitude test with 30 questions tailored to the job requirements. 
        Candidates who pass the resume screening will be able to take this test.
      </p>
      <Button onclick={handleCreateTest} disabled={$createMutation.isPending}>
        {#if $createMutation.isPending}
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Generating Test...
        {:else}
          <Plus class="w-4 h-4 mr-2" />
          Generate Aptitude Test
        {/if}
      </Button>
    </Card>
  {:else}
    <!-- Test Created -->
    <div class="space-y-6">
      <!-- Test Info Card -->
      <Card class="p-6">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl bg-royal-900/50 flex items-center justify-center flex-shrink-0">
            <Brain class="w-7 h-7 text-royal-400" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-xl font-semibold text-obsidian-100">{createdTest.test_title}</h3>
              <span class="px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">
                Active
              </span>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-obsidian-400">
              <span class="flex items-center gap-1.5">
                <Brain class="w-4 h-4" />
                {createdTest.total_questions} Questions
              </span>
              <span class="flex items-center gap-1.5">
                <CheckCircle class="w-4 h-4" />
                AI Generated
              </span>
            </div>
          </div>
        </div>
      </Card>

      <!-- URLs Card -->
      <Card class="p-6">
        <h4 class="font-medium text-obsidian-100 mb-4">Share Test with Candidates</h4>
        <p class="text-sm text-obsidian-400 mb-4">
          Share this URL with aptitude-eligible candidates so they can take the test:
        </p>
        
        <div class="space-y-4">
          <!-- Candidate Test URL -->
          <div>
            <label class="text-xs text-obsidian-500 mb-1 block">Candidate Test URL</label>
            <div class="flex items-center gap-2">
              <div class="flex-1 px-4 py-3 rounded-lg bg-obsidian-800 border border-obsidian-700 font-mono text-sm text-obsidian-300 truncate">
                {window.location.origin}/aptitude/{jobId}
              </div>
              <Button variant="outline" onclick={copyCandidateUrl}>
                <Copy class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <!-- API Public URL -->
          <div>
            <label class="text-xs text-obsidian-500 mb-1 block">API Public URL</label>
            <div class="flex items-center gap-2">
              <div class="flex-1 px-4 py-3 rounded-lg bg-obsidian-800 border border-obsidian-700 font-mono text-sm text-obsidian-300 truncate">
                {createdTest.public_url}
              </div>
              <Button variant="outline" onclick={copyPublicUrl}>
                <Copy class="w-4 h-4" />
              </Button>
            </div>
          </div>

          <!-- Test Access URL -->
          <div>
            <label class="text-xs text-obsidian-500 mb-1 block">Direct Test Start URL</label>
            <div class="flex items-center gap-2">
              <div class="flex-1 px-4 py-3 rounded-lg bg-obsidian-800 border border-obsidian-700 font-mono text-sm text-obsidian-300 truncate">
                {createdTest.test_access_url}
              </div>
              <Button variant="outline" onclick={copyTestAccessUrl}>
                <Copy class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <!-- Instructions Card -->
      <Card class="p-6">
        <h4 class="font-medium text-obsidian-100 mb-4">How It Works</h4>
        <ol class="space-y-3 text-sm text-obsidian-400">
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
            <span>Share the <strong class="text-obsidian-300">Candidate Test URL</strong> with aptitude-eligible candidates</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
            <span>Candidates log in using their email and receive the test questions</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
            <span>After submission, results are automatically recorded and scored</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span>
            <span>Use <strong class="text-obsidian-300">Select Top Candidates</strong> to advance passing candidates to technical interviews</span>
          </li>
        </ol>
      </Card>

      <!-- Actions -->
      <div class="flex gap-3">
        <Button variant="outline" onclick={handleCreateTest} disabled={$createMutation.isPending}>
          {#if $createMutation.isPending}
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          {:else}
            <Brain class="w-4 h-4 mr-2" />
          {/if}
          Regenerate Test
        </Button>
      </div>
    </div>
  {/if}
</div>
