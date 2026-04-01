<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { useAptitudeTestQuestions, useSubmitAptitudeTest } from '$lib/api/queries/aptitude';
  import type { AptitudeQuestion, TestDetails, CandidateInfo, AttemptInfo } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import {
    Brain,
    Loader2,
    AlertCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Circle,
    Flag,
    Send,
    AlertTriangle,
    Timer
  } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  // Session data
  let sessionData = $state<{
    candidateInfo: CandidateInfo;
    attemptInfo: AttemptInfo;
    sessionToken: string;
    loginTime: number;
  } | null>(null);

  // Test data
  const testQuery = useAptitudeTestQuestions(jobId);
  const submitMutation = useSubmitAptitudeTest();

  // Test state
  let currentQuestionIndex = $state(0);
  let answers = $state<Record<number, string>>({});
  let flaggedQuestions = $state<Set<number>>(new Set());
  let timeRemaining = $state(0); // in seconds
  let timerInterval: number | undefined;
  let testStartTime = $state(0);
  let tabSwitches = $state(0);
  let isSubmitting = $state(false);
  let showSubmitConfirm = $state(false);

  // Derived values
  const testDetails = $derived($testQuery.data?.data?.test_details as TestDetails | undefined);
  const questions = $derived(($testQuery.data?.data?.questions || []) as AptitudeQuestion[]);
  const currentQuestion = $derived(questions[currentQuestionIndex]);
  const totalQuestions = $derived(questions.length);
  const answeredCount = $derived(Object.keys(answers).length);
  const progress = $derived(totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0);

  // Format time as MM:SS
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Check session on mount
  onMount(() => {
    const stored = sessionStorage.getItem(`aptitude_session_${jobId}_${testId}`);
    if (!stored) {
      toast.error('Session expired. Please login again.');
      goto(`/aptitude/test/${jobId}/${testId}/start`);
      return;
    }

    try {
      sessionData = JSON.parse(stored);
      testStartTime = Date.now();

      // Initialize timer based on test details
      if (testDetails) {
        timeRemaining = testDetails.total_time_minutes * 60;
      }
    } catch {
      toast.error('Invalid session. Please login again.');
      goto(`/aptitude/test/${jobId}/${testId}/start`);
    }

    // Tab visibility detection
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Prevent keyboard shortcuts
    document.addEventListener('keydown', handleKeydown);

    // Warn before leaving
    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  // Start timer when test details load
  $effect(() => {
    if (testDetails && timeRemaining === 0) {
      timeRemaining = testDetails.total_time_minutes * 60;
      startTimer();
    }
  });

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        handleAutoSubmit();
      }
    }, 1000);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      tabSwitches++;
      toast.warning('Tab switch detected', {
        description: `You have switched tabs ${tabSwitches} time(s). This is being recorded.`
      });
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    // Block common shortcuts
    if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'a', 'p', 'f'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      toast.warning('Keyboard shortcuts are disabled during the test');
    }
  }

  function handleBeforeUnload(e: BeforeUnloadEvent) {
    e.preventDefault();
    e.returnValue = '';
  }

  onDestroy(() => {
    if (timerInterval) clearInterval(timerInterval);
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeydown);
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  });

  function selectAnswer(questionIndex: number, answer: string) {
    answers = { ...answers, [questionIndex]: answer };
  }

  function toggleFlag(questionIndex: number) {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(questionIndex)) {
      newFlagged.delete(questionIndex);
    } else {
      newFlagged.add(questionIndex);
    }
    flaggedQuestions = newFlagged;
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions) {
      currentQuestionIndex = index;
    }
  }

  function handleAutoSubmit() {
    toast.warning('Time is up! Submitting your test...');
    submitTest();
  }

  async function submitTest() {
    if (!sessionData?.attemptInfo.attempt_id) {
      toast.error('Session error. Please contact support.');
      return;
    }

    isSubmitting = true;
    showSubmitConfirm = false;

    const timeTaken = Math.floor((Date.now() - testStartTime) / 1000);

    try {
      const result = await $submitMutation.mutateAsync({
        attempt_id: sessionData.attemptInfo.attempt_id,
        answers,
        time_taken_seconds: timeTaken,
        tab_switches: tabSwitches,
        keyboard_violations: 0
      });

      // Clear session
      sessionStorage.removeItem(`aptitude_session_${jobId}_${testId}`);

      // Store result for results page
      sessionStorage.setItem(
        `aptitude_result_${jobId}_${testId}`,
        JSON.stringify(result.data)
      );

      toast.success('Test submitted successfully!');
      goto(`/aptitude/test/${jobId}/${testId}/results`);
    } catch (error: any) {
      toast.error('Failed to submit test', {
        description: error.message
      });
      isSubmitting = false;
    }
  }

  // Get question status for navigator
  function getQuestionStatus(index: number): 'answered' | 'flagged' | 'current' | 'unanswered' {
    if (index === currentQuestionIndex) return 'current';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (answers[index]) return 'answered';
    return 'unanswered';
  }
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
</svelte:head>

{#if $testQuery.isLoading || !sessionData}
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex items-center justify-center">
    <Card class="p-8 text-center">
      <Loader2 class="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
      <p class="text-gray-600">Loading your test...</p>
    </Card>
  </div>
{:else if $testQuery.error}
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex items-center justify-center">
    <Card class="p-8 text-center max-w-md">
      <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h2 class="text-xl font-bold text-gray-800 mb-2">Failed to Load Test</h2>
      <p class="text-gray-500 mb-4">{$testQuery.error.message}</p>
      <Button onclick={() => goto(`/aptitude/test/${jobId}/${testId}/start`)}>
        Back to Login
      </Button>
    </Card>
  </div>
{:else}
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top bar -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
              <Brain class="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 class="font-semibold text-gray-800 text-sm">{testDetails?.test_title || 'Aptitude Test'}</h1>
              <p class="text-xs text-gray-500">{sessionData.candidateInfo.first_name} {sessionData.candidateInfo.last_name}</p>
            </div>
          </div>

          <!-- Timer -->
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2 px-4 py-2 rounded-lg {timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}">
              <Timer class="w-4 h-4" />
              <span class="font-mono font-bold text-lg">{formatTime(timeRemaining)}</span>
            </div>

            <div class="text-right">
              <p class="text-xs text-gray-500">Progress</p>
              <p class="font-semibold text-gray-800">{answeredCount} / {totalQuestions}</p>
            </div>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300"
            style="width: {progress}%"
          ></div>
        </div>
      </div>
    </header>

    <div class="flex-1 flex">
      <!-- Question navigator sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block">
        <h3 class="font-semibold text-gray-800 mb-4">Questions</h3>
        <div class="grid grid-cols-5 gap-2">
          {#each questions as _, index}
            {@const status = getQuestionStatus(index)}
            <button
              onclick={() => goToQuestion(index)}
              class="w-10 h-10 rounded-lg text-sm font-medium transition-all
                {status === 'current' ? 'bg-purple-600 text-white ring-2 ring-purple-300' : ''}
                {status === 'answered' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : ''}
                {status === 'flagged' ? 'bg-amber-100 text-amber-700 border border-amber-200' : ''}
                {status === 'unanswered' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : ''}"
            >
              {index + 1}
            </button>
          {/each}
        </div>

        <div class="mt-6 space-y-2 text-xs">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-emerald-100 border border-emerald-200"></div>
            <span class="text-gray-600">Answered</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-amber-100 border border-amber-200"></div>
            <span class="text-gray-600">Flagged for review</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gray-100"></div>
            <span class="text-gray-600">Not answered</span>
          </div>
        </div>

        {#if tabSwitches > 0}
          <div class="mt-6 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div class="flex items-center gap-2 text-amber-700 text-sm">
              <AlertTriangle class="w-4 h-4" />
              <span class="font-medium">Tab switches: {tabSwitches}</span>
            </div>
          </div>
        {/if}
      </aside>

      <!-- Main question area -->
      <main class="flex-1 p-6">
        <div class="max-w-3xl mx-auto">
          {#if currentQuestion}
            <Card class="p-6 lg:p-8">
              <!-- Question header -->
              <div class="flex items-start justify-between mb-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                    <span class="px-2 py-0.5 rounded text-xs font-medium
                      {currentQuestion.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                       currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' :
                       'bg-emerald-100 text-emerald-700'}">
                      {currentQuestion.difficulty}
                    </span>
                    <span class="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>
                <button
                  onclick={() => toggleFlag(currentQuestionIndex)}
                  class="p-2 rounded-lg transition-colors
                    {flaggedQuestions.has(currentQuestionIndex)
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}"
                  title={flaggedQuestions.has(currentQuestionIndex) ? 'Remove flag' : 'Flag for review'}
                >
                  <Flag class="w-5 h-5" />
                </button>
              </div>

              <!-- Question text -->
              <h2 class="text-lg font-medium text-gray-800 mb-6 leading-relaxed">
                {currentQuestion.question_text}
              </h2>

              <!-- Options -->
              <div class="space-y-3">
                {#each Object.entries(currentQuestion.options) as [key, value]}
                  <button
                    onclick={() => selectAnswer(currentQuestionIndex, key)}
                    class="w-full p-4 rounded-xl border-2 text-left transition-all
                      {answers[currentQuestionIndex] === key
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'}"
                  >
                    <div class="flex items-center gap-4">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        {answers[currentQuestionIndex] === key
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600'}">
                        {key}
                      </div>
                      <span class="text-gray-700">{value}</span>
                    </div>
                  </button>
                {/each}
              </div>
            </Card>

            <!-- Navigation -->
            <div class="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onclick={() => goToQuestion(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft class="w-4 h-4" />
                Previous
              </Button>

              <div class="flex items-center gap-3">
                {#if currentQuestionIndex === totalQuestions - 1}
                  <Button onclick={() => showSubmitConfirm = true} variant="success">
                    <Send class="w-4 h-4" />
                    Submit Test
                  </Button>
                {:else}
                  <Button onclick={() => goToQuestion(currentQuestionIndex + 1)}>
                    Next
                    <ChevronRight class="w-4 h-4" />
                  </Button>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      </main>
    </div>

    <!-- Mobile question navigator -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
      <div class="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          onclick={() => goToQuestion(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft class="w-4 h-4" />
        </Button>

        <div class="flex-1 flex items-center justify-center gap-1 overflow-x-auto">
          {#each questions.slice(Math.max(0, currentQuestionIndex - 2), Math.min(totalQuestions, currentQuestionIndex + 3)) as _, i}
            {@const actualIndex = Math.max(0, currentQuestionIndex - 2) + i}
            {@const status = getQuestionStatus(actualIndex)}
            <button
              onclick={() => goToQuestion(actualIndex)}
              class="w-8 h-8 rounded-lg text-xs font-medium flex-shrink-0
                {status === 'current' ? 'bg-purple-600 text-white' : ''}
                {status === 'answered' ? 'bg-emerald-100 text-emerald-700' : ''}
                {status === 'flagged' ? 'bg-amber-100 text-amber-700' : ''}
                {status === 'unanswered' ? 'bg-gray-100 text-gray-600' : ''}"
            >
              {actualIndex + 1}
            </button>
          {/each}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onclick={() => goToQuestion(currentQuestionIndex + 1)}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          <ChevronRight class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>

  <!-- Submit confirmation modal -->
  {#if showSubmitConfirm}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card class="p-6 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <Send class="w-8 h-8 text-purple-600" />
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">Submit Test?</h2>
          <p class="text-gray-500">
            You have answered <strong>{answeredCount}</strong> out of <strong>{totalQuestions}</strong> questions.
          </p>
          {#if answeredCount < totalQuestions}
            <p class="text-amber-600 text-sm mt-2">
              {totalQuestions - answeredCount} question(s) are unanswered.
            </p>
          {/if}
          {#if flaggedQuestions.size > 0}
            <p class="text-amber-600 text-sm mt-1">
              {flaggedQuestions.size} question(s) are flagged for review.
            </p>
          {/if}
        </div>

        <div class="flex gap-3">
          <Button variant="outline" class="flex-1" onclick={() => showSubmitConfirm = false}>
            Review Answers
          </Button>
          <Button class="flex-1" onclick={submitTest} disabled={isSubmitting}>
            {#if isSubmitting}
              <Loader2 class="w-4 h-4 animate-spin" />
              Submitting...
            {:else}
              Submit Now
            {/if}
          </Button>
        </div>
      </Card>
    </div>
  {/if}
{/if}
