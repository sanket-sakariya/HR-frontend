<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { TestResult } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import {
    Brain,
    Trophy,
    XCircle,
    Clock,
    CheckCircle2,
    Target,
    BarChart3,
    Share2,
    Home
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  let result = $state<TestResult | null>(null);

  onMount(() => {
    const stored = sessionStorage.getItem(`aptitude_result_${jobId}_${testId}`);
    if (stored) {
      try {
        result = JSON.parse(stored);
      } catch {
        result = null;
      }
    }
  });

  // Format time as MM:SS
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  // Calculate percentage
  const scorePercentage = $derived(
    result ? Math.round((result.correct_answers_count / result.total_questions) * 100) : 0
  );
</script>

<svelte:head>
  <title>Test Results | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60">
    <div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
        <Brain class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="font-semibold text-gray-800">HR Automation</h1>
        <p class="text-xs text-gray-500">Test Results</p>
      </div>
    </div>
  </header>

  <main class="max-w-2xl mx-auto px-4 py-8">
    {#if result}
      <div class="text-center mb-8">
        <!-- Result icon -->
        <div class="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center
          {result.passed ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-red-600'}
          shadow-lg">
          {#if result.passed}
            <Trophy class="w-12 h-12 text-white" />
          {:else}
            <XCircle class="w-12 h-12 text-white" />
          {/if}
        </div>

        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          {result.passed ? 'Congratulations!' : 'Test Completed'}
        </h1>
        <p class="text-gray-500 text-lg">
          {result.passed
            ? 'You have successfully passed the aptitude test.'
            : 'Unfortunately, you did not pass this time.'}
        </p>
      </div>

      <!-- Score card -->
      <Card class="p-8 mb-6">
        <div class="text-center mb-8">
          <div class="relative w-40 h-40 mx-auto">
            <!-- Background circle -->
            <svg class="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={result.passed ? '#10b981' : '#ef4444'}
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray={2 * Math.PI * 70}
                stroke-dashoffset={2 * Math.PI * 70 * (1 - scorePercentage / 100)}
                class="transition-all duration-1000"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-4xl font-bold {result.passed ? 'text-emerald-600' : 'text-red-600'}">
                {scorePercentage}%
              </span>
              <span class="text-sm text-gray-500">Score</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 rounded-xl bg-gray-50">
            <CheckCircle2 class="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p class="text-2xl font-bold text-gray-800">{result.correct_answers_count}</p>
            <p class="text-xs text-gray-500">Correct</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-gray-50">
            <XCircle class="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p class="text-2xl font-bold text-gray-800">{result.total_questions - result.correct_answers_count}</p>
            <p class="text-xs text-gray-500">Incorrect</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-gray-50">
            <Target class="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p class="text-2xl font-bold text-gray-800">{result.total_questions_attempted}</p>
            <p class="text-xs text-gray-500">Attempted</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-gray-50">
            <Clock class="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p class="text-2xl font-bold text-gray-800">{formatTime(result.time_taken_seconds)}</p>
            <p class="text-xs text-gray-500">Time Taken</p>
          </div>
        </div>
      </Card>

      <!-- Details card -->
      <Card class="p-6 mb-6">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 class="w-5 h-5 text-purple-600" />
          Test Summary
        </h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Candidate</span>
            <span class="font-medium text-gray-800">{result.candidate_name || result.candidate_email}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Email</span>
            <span class="font-medium text-gray-800">{result.candidate_email}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Total Questions</span>
            <span class="font-medium text-gray-800">{result.total_questions}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-100">
            <span class="text-gray-500">Result</span>
            <span class="font-medium {result.passed ? 'text-emerald-600' : 'text-red-600'}">
              {result.aptitude_test_result.toUpperCase()}
            </span>
          </div>
          {#if result.submitted_at}
            <div class="flex justify-between py-2">
              <span class="text-gray-500">Submitted At</span>
              <span class="font-medium text-gray-800">
                {new Date(result.submitted_at).toLocaleString()}
              </span>
            </div>
          {/if}
        </div>
      </Card>

      <!-- Next steps -->
      <Card class="p-6 {result.passed ? 'border-emerald-200 bg-emerald-50/50' : 'border-gray-200'}">
        <h3 class="font-semibold text-gray-800 mb-3">
          {result.passed ? 'What\'s Next?' : 'Don\'t Give Up!'}
        </h3>
        <p class="text-gray-600 text-sm mb-4">
          {result.passed
            ? 'Our HR team will review your results and contact you for the next steps in the hiring process. Please check your email for updates.'
            : 'Thank you for taking the time to complete this assessment. We encourage you to continue developing your skills and apply again in the future.'}
        </p>

        {#if result.passed}
          <div class="flex items-center gap-2 p-3 rounded-lg bg-emerald-100">
            <CheckCircle2 class="w-5 h-5 text-emerald-600" />
            <span class="text-sm text-emerald-700 font-medium">
              You may be contacted for a technical or HR interview soon.
            </span>
          </div>
        {/if}
      </Card>

      <!-- Close message -->
      <div class="text-center mt-8">
        <p class="text-gray-400 text-sm mb-4">
          You can safely close this window now.
        </p>
        <p class="text-xs text-gray-400">
          Powered by HR Automation Platform
        </p>
      </div>
    {:else}
      <!-- No result found -->
      <div class="text-center py-12">
        <Card class="p-8 max-w-md mx-auto">
          <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <XCircle class="w-8 h-8 text-gray-400" />
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">No Results Found</h2>
          <p class="text-gray-500 mb-6">
            We couldn't find your test results. This may happen if you accessed this page directly.
          </p>
          <Button onclick={() => window.close()} variant="outline">
            Close Window
          </Button>
        </Card>
      </div>
    {/if}
  </main>
</div>
