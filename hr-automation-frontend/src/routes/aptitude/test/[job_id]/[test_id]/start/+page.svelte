<script lang="ts">
  import { page } from '$app/stores';
  import { useValidateAptitudeLogin, useAptitudeTestForm } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle,
    Clock,
    FileQuestion,
    Mail,
    Lock
  } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  // Get test info
  const testFormQuery = useAptitudeTestForm(jobId, testId);
  const validateLoginMutation = useValidateAptitudeLogin();

  // Form state
  let email = $state('');
  let password = $state('');
  let isSubmitting = $state(false);
  let loginError = $state<string | null>(null);

  // Test form URL after successful login
  let testFormUrl = $state<string | null>(null);
  let candidateInfo = $state<any>(null);
  let attemptInfo = $state<any>(null);

  async function handleLogin(e: Event) {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    isSubmitting = true;
    loginError = null;

    try {
      const result = await $validateLoginMutation.mutateAsync({
        jobId,
        testId,
        email,
        password
      });

      if (result?.data) {
        testFormUrl = result.data.test_form_url || result.data.form_url;
        candidateInfo = result.data.candidate_info;
        attemptInfo = result.data.attempt_info;
        
        toast.success('Login successful! Redirecting to test...');
        
        // Auto-redirect after short delay
        if (testFormUrl) {
          setTimeout(() => {
            window.location.href = testFormUrl!;
          }, 1500);
        }
      }
    } catch (error: any) {
      loginError = error.message || 'Login failed. Please check your credentials.';
      toast.error('Login failed', {
        description: error.message
      });
    } finally {
      isSubmitting = false;
    }
  }

  function goToTest() {
    if (testFormUrl) {
      window.location.href = testFormUrl;
    }
  }
</script>

<svelte:head>
  <title>Start Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
  <div class="max-w-md w-full mx-4">
    {#if testFormUrl}
      <!-- Successfully logged in - redirecting -->
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-2xl bg-green-900/50 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Brain class="w-10 h-10 text-green-400" />
        </div>
        
        {#if candidateInfo}
          <p class="text-sm text-obsidian-400 mb-2">Welcome,</p>
          <h2 class="text-2xl font-bold text-obsidian-100 mb-1">
            {candidateInfo.first_name} {candidateInfo.last_name}
          </h2>
          <p class="text-obsidian-500 text-sm mb-6">{candidateInfo.email}</p>
        {:else}
          <h2 class="text-2xl font-bold text-obsidian-100 mb-6">Login Successful!</h2>
        {/if}

        {#if attemptInfo}
          <div class="bg-obsidian-800/50 rounded-lg p-4 mb-6">
            <p class="text-sm text-obsidian-300">
              {attemptInfo.message || `Attempt ${attemptInfo.user_attempt || 1}`}
            </p>
          </div>
        {/if}

        <p class="text-obsidian-400 mb-6">
          Redirecting you to the test...
        </p>
        
        <div class="flex items-center justify-center gap-2 text-royal-400 mb-6">
          <Loader2 class="w-5 h-5 animate-spin" />
          <span>Please wait</span>
        </div>

        <Button onclick={goToTest} class="w-full">
          <ExternalLink class="w-4 h-4 mr-2" />
          Start Test Now
        </Button>
      </Card>
    {:else}
      <!-- Login form -->
      <Card class="p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 rounded-xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4">
            <Brain class="w-8 h-8 text-royal-400" />
          </div>
          <h2 class="text-2xl font-bold text-obsidian-100 mb-2">Aptitude Test</h2>
          <p class="text-obsidian-400">
            Please login with your candidate credentials to start the test.
          </p>
        </div>

        {#if $testFormQuery.data?.data?.test_details}
          <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div class="bg-obsidian-800/50 rounded-lg p-3 text-center">
              <Clock class="w-5 h-5 text-obsidian-400 mx-auto mb-1" />
              <p class="text-obsidian-500 text-xs">Duration</p>
              <p class="font-semibold text-obsidian-100">
                {$testFormQuery.data.data.test_details.total_time_minutes || 45} min
              </p>
            </div>
            <div class="bg-obsidian-800/50 rounded-lg p-3 text-center">
              <FileQuestion class="w-5 h-5 text-obsidian-400 mx-auto mb-1" />
              <p class="text-obsidian-500 text-xs">Questions</p>
              <p class="font-semibold text-obsidian-100">
                {$testFormQuery.data.data.test_details.total_questions || 30}
              </p>
            </div>
          </div>
        {/if}

        {#if loginError}
          <div class="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-800/50">
            <div class="flex gap-3">
              <AlertCircle class="w-5 h-5 text-red-400 flex-shrink-0" />
              <p class="text-sm text-red-200">{loginError}</p>
            </div>
          </div>
        {/if}

        <form onsubmit={handleLogin} class="space-y-4">
          <div>
            <Label for="email">Email Address</Label>
            <div class="relative mt-1">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
              <Input
                id="email"
                type="email"
                bind:value={email}
                placeholder="your.email@example.com"
                class="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label for="password">Password</Label>
            <div class="relative mt-1">
              <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" />
              <Input
                id="password"
                type="password"
                bind:value={password}
                placeholder="••••••••"
                class="pl-10"
                required
              />
            </div>
            <p class="text-xs text-obsidian-500 mt-1">
              Use the password provided in your application confirmation email.
            </p>
          </div>

          <Button type="submit" class="w-full" disabled={isSubmitting}>
            {#if isSubmitting}
              <Loader2 class="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            {:else}
              Start Test
            {/if}
          </Button>
        </form>

        <div class="mt-6 p-4 rounded-lg bg-amber-900/20 border border-amber-800/50">
          <div class="flex gap-3 text-left">
            <AlertCircle class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm text-amber-200">
              <p class="font-medium mb-1">Before you begin:</p>
              <ul class="list-disc list-inside text-amber-300/80 space-y-1 text-xs">
                <li>Ensure stable internet connection</li>
                <li>The test has a time limit</li>
                <li>You cannot pause once started</li>
                <li>Tab switching may be monitored</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    {/if}
  </div>
</div>
