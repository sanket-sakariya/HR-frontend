<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { createJobQuery } from '$lib/api/queries/jobs';
  import { createAptitudeTestsQuery, createCreateAptitudeTestMutation } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Dialog from '$lib/components/ui/Dialog.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import { formatDate, formatRelative } from '$lib/utils/format';
  import {
    ArrowLeft,
    Brain,
    Plus,
    Play,
    Pause,
    Copy,
    ExternalLink,
    Users,
    Clock,
    CheckCircle,
    AlertCircle
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const jobQuery = createJobQuery(jobId);
  const aptitudeQuery = createAptitudeTestsQuery(jobId);
  const createMutation = createCreateAptitudeTestMutation();

  let showCreateDialog = $state(false);
  let createForm = $state({
    title: '',
    description: '',
    duration_minutes: '60',
    difficulty: 'medium',
    question_count: '20',
    passing_score: '70'
  });

  const job = $derived($jobQuery.data);
  const tests = $derived($aptitudeQuery.data || []);

  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  async function handleCreateTest() {
    if (!createForm.title) {
      toast.error('Please enter a test title');
      return;
    }

    try {
      await $createMutation.mutateAsync({
        jobId,
        data: {
          title: createForm.title,
          description: createForm.description,
          duration_minutes: parseInt(createForm.duration_minutes),
          difficulty: createForm.difficulty as 'easy' | 'medium' | 'hard',
          question_count: parseInt(createForm.question_count),
          passing_score: parseInt(createForm.passing_score)
        }
      });
      toast.success('Aptitude test created successfully');
      showCreateDialog = false;
      createForm = {
        title: '',
        description: '',
        duration_minutes: '60',
        difficulty: 'medium',
        question_count: '20',
        passing_score: '70'
      };
    } catch (error) {
      toast.error('Failed to create aptitude test');
    }
  }

  function copyTestLink(testId: string) {
    const link = `${window.location.origin}/aptitude/${testId}`;
    navigator.clipboard.writeText(link);
    toast.success('Test link copied to clipboard');
  }
</script>

<svelte:head>
  <title>Aptitude Tests - {job?.title || 'Job'} | HR Automation</title>
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
        <h1 class="text-2xl font-bold text-obsidian-100">Aptitude Tests</h1>
      </div>
      <p class="text-obsidian-400">
        Manage aptitude tests for {job?.title || 'this job'}
      </p>
    </div>

    <Button onclick={() => showCreateDialog = true}>
      <Plus class="w-4 h-4 mr-2" />
      Create Test
    </Button>
  </div>

  <!-- Stats -->
  <div class="grid sm:grid-cols-4 gap-4">
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-royal-900/50 flex items-center justify-center">
          <Brain class="w-5 h-5 text-royal-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">{tests.length}</p>
          <p class="text-xs text-obsidian-400">Total Tests</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
          <Play class="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">{tests.filter(t => t.status === 'active').length}</p>
          <p class="text-xs text-obsidian-400">Active</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-amber-900/50 flex items-center justify-center">
          <Users class="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">0</p>
          <p class="text-xs text-obsidian-400">Completed</p>
        </div>
      </div>
    </Card>
    <Card class="p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center">
          <CheckCircle class="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-obsidian-100">0%</p>
          <p class="text-xs text-obsidian-400">Pass Rate</p>
        </div>
      </div>
    </Card>
  </div>

  <!-- Tests List -->
  {#if $aptitudeQuery.isLoading}
    <div class="space-y-4">
      {#each Array(3) as _}
        <Skeleton class="h-32" />
      {/each}
    </div>
  {:else if tests.length === 0}
    <Card class="p-12 text-center">
      <Brain class="w-16 h-16 mx-auto text-obsidian-600 mb-4" />
      <h3 class="text-lg font-medium text-obsidian-200 mb-2">No aptitude tests yet</h3>
      <p class="text-obsidian-400 mb-6">
        Create your first aptitude test to assess candidate skills
      </p>
      <Button onclick={() => showCreateDialog = true}>
        <Plus class="w-4 h-4 mr-2" />
        Create Test
      </Button>
    </Card>
  {:else}
    <div class="space-y-4">
      {#each tests as test}
        <Card class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-lg bg-royal-900/50 flex items-center justify-center">
                <Brain class="w-6 h-6 text-royal-400" />
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="font-semibold text-obsidian-100">{test.title}</h3>
                  <StatusBadge 
                    status={test.status === 'active' ? 'Active' : 'Draft'} 
                    variant={test.status === 'active' ? 'success' : 'default'} 
                  />
                </div>
                {#if test.description}
                  <p class="text-sm text-obsidian-400 mb-3">{test.description}</p>
                {/if}
                <div class="flex flex-wrap gap-4 text-sm text-obsidian-400">
                  <span class="flex items-center gap-1">
                    <Clock class="w-4 h-4" />
                    {test.duration_minutes} minutes
                  </span>
                  <span class="flex items-center gap-1">
                    <Brain class="w-4 h-4" />
                    {test.question_count} questions
                  </span>
                  <span class="flex items-center gap-1">
                    <CheckCircle class="w-4 h-4" />
                    {test.passing_score}% to pass
                  </span>
                  <span class="capitalize">{test.difficulty} difficulty</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Button variant="ghost" size="icon" onclick={() => copyTestLink(test.id || '')}>
                <Copy class="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink class="w-4 h-4 mr-2" />
                View Results
              </Button>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  {/if}
</div>

<!-- Create Test Dialog -->
<Dialog 
  open={showCreateDialog} 
  onclose={() => showCreateDialog = false}
  title="Create Aptitude Test"
>
  <div class="space-y-4">
    <div>
      <Label for="title">Test Title *</Label>
      <Input
        id="title"
        bind:value={createForm.title}
        placeholder="e.g. Technical Assessment"
      />
    </div>

    <div>
      <Label for="description">Description</Label>
      <Textarea
        id="description"
        bind:value={createForm.description}
        placeholder="Describe what this test covers..."
        rows={3}
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <Label for="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min="10"
          max="180"
          bind:value={createForm.duration_minutes}
        />
      </div>
      <div>
        <Label for="questions">Number of Questions</Label>
        <Input
          id="questions"
          type="number"
          min="5"
          max="100"
          bind:value={createForm.question_count}
        />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <Label for="difficulty">Difficulty</Label>
        <Select
          id="difficulty"
          bind:value={createForm.difficulty}
          options={difficultyOptions}
        />
      </div>
      <div>
        <Label for="passing">Passing Score (%)</Label>
        <Input
          id="passing"
          type="number"
          min="0"
          max="100"
          bind:value={createForm.passing_score}
        />
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-6">
      <Button variant="outline" onclick={() => showCreateDialog = false}>
        Cancel
      </Button>
      <Button onclick={handleCreateTest} disabled={$createMutation.isPending}>
        {$createMutation.isPending ? 'Creating...' : 'Create Test'}
      </Button>
    </div>
  </div>
</Dialog>
