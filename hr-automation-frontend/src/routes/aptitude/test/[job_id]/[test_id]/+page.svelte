<script lang="ts">
  import { page } from '$app/stores';
  import { useAptitudeLoginForm, useValidateAptitudeLogin, useAptitudeTestForm } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Label from '$lib/components/ui/Label.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    Brain,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowRight,
    Loader2,
    ExternalLink,
    User
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  // Queries
  const loginFormQuery = useAptitudeLoginForm(jobId, testId);
  const validateLoginMutation = useValidateAptitudeLogin();

  // State
  let email = $state('');
  let password = $state('');
  let loginStep = $state<'form' | 'validating' | 'success' | 'error'>('form');
  let candidateInfo = $state<any>(null);
  let attemptInfo = $state<any>(null);
  let testFormUrl = $state<string | null>(null);
  let errorMessage = $state<string | null>(null);

  // Get login form data
  const loginData = $derived($loginFormQuery.data?.data?.login_data);

  async function handleLogin() {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    loginStep = 'validating';
    errorMessage = null;

    try {
      const result = await $validateLoginMutation.mutateAsync({
        jobId,
        testId,
        email,
        password
      });

      if (result?.data) {
        candidateInfo = result.data.candidate_info;
        attemptInfo = result.data.attempt_info;
        testFormUrl = result.data.test_form_url;
        loginStep = 'success';
        toast.success('Login successful!');
      }
    } catch (error: any) {
      loginStep = 'error';
      errorMessage = error.message || 'Login failed. Please check your credentials.';
      toast.error('Login failed', {
        description: errorMessage
      });
    }
  }

  function startTest() {
    if (testFormUrl) {
      // Open the test form in a new window or redirect
      window.open(testFormUrl, '_blank');
    }
  }

  function retryLogin() {
    loginStep = 'form';
    errorMessage = null;
  }
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950">
  <!-- Header -->
  <header class="bg-obsidian-900 border-b border-obsidian-800">
    <div class="max-w-2xl mx-auto px-4 py-6">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-lg bg-royal-600 flex items-center justify-center">
          <Brain class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-obsidian-100">Aptitude Test</h1>
          <p class="text-sm text-obsidian-400">HR Automation Platform</p>
        </div>
      </div>
    </div>
  </header>

  <main class="max-w-2xl mx-auto px-4 py-8">
    {#if $loginFormQuery.isLoading}
      <Skeleton class="h-96" />
    {:else if loginStep === 'form' || loginStep === 'validating'}
      <!-- Login Form -->
      <Card class="p-8">
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-2xl bg-royal-900/50 flex items-center justify-center mx-auto mb-4">
            <Brain class="w-10 h-10 text-royal-400" />
          </div>
          <h2 class="text-2xl font-bold text-obsidian-100 mb-2">
            {loginData?.test_title || 'Aptitude Test'}
          </h2>
          <p class="text-obsidian-400">
            {loginData?.login_instructions || 'Please enter your credentials to access the test.'}
          </p>
        </div>

        <div class="space-y-4">
          <div>
            <Label for="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              bind:value={email}
              placeholder="your.email@example.com"
              disabled={loginStep === 'validating'}
            />
            <p class="text-xs text-obsidian-500 mt-1">
              Use the same email you used when applying for the job
            </p>
          </div>

          <div>
            <Label for="password">Password *</Label>
            <Input
              id="password"
              type="password"
              bind:value={password}
              placeholder="Enter your password"
              disabled={loginStep === 'validating'}
            />
            <p class="text-xs text-obsidian-500 mt-1">
              Check your email for the password sent to you
            </p>
          </div>

          {#if errorMessage}
            <div class="p-4 rounded-lg bg-red-900/20 border border-red-800/50">
              <div class="flex gap-3">
                <AlertCircle class="w-5 h-5 text-red-400 flex-shrink-0" />
                <p class="text-sm text-red-300">{errorMessage}</p>
              </div>
            </div>
          {/if}

          <Button 
            class="w-full" 
            onclick={handleLogin}
            disabled={loginStep === 'validating'}
          >
            {#if loginStep === 'validating'}
              <Loader2 class="w-4 h-4 mr-2 animate-spin" />
              Validating...
            {:else}
              Verify & Continue
              <ArrowRight class="w-4 h-4 ml-2" />
            {/if}
          </Button>
        </div>

        <div class="mt-8 p-4 rounded-lg bg-amber-900/20 border border-amber-800/50">
          <div class="flex gap-3">
            <AlertCircle class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div class="text-sm text-amber-200">
              <p class="font-medium mb-2">Before you begin:</p>
              <ul class="list-disc list-inside text-amber-300/80 space-y-1">
                <li>Ensure stable internet connection</li>
                <li>The test has a time limit</li>
                <li>You cannot pause once started</li>
                <li>Answer all questions before time runs out</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

    {:else if loginStep === 'success'}
      <!-- Login Success - Ready to Start -->
      <Card class="p-8">
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-full bg-emerald-900/50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-10 h-10 text-emerald-400" />
          </div>
          <h2 class="text-2xl font-bold text-obsidian-100 mb-2">Login Successful!</h2>
          <p class="text-obsidian-400">
            You are ready to start the aptitude test.
          </p>
        </div>

        {#if candidateInfo}
          <div class="bg-obsidian-800/50 rounded-lg p-4 mb-6">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-royal-900/50 flex items-center justify-center">
                <User class="w-5 h-5 text-royal-400" />
              </div>
              <div>
                <p class="font-medium text-obsidian-100">
                  {candidateInfo.first_name} {candidateInfo.last_name}
                </p>
                <p class="text-sm text-obsidian-400">{candidateInfo.email}</p>
              </div>
            </div>
          </div>
        {/if}

        {#if attemptInfo}
          <div class="bg-obsidian-800/50 rounded-lg p-4 mb-6">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-obsidian-500">Attempt</p>
                <p class="text-obsidian-200 font-medium">#{attemptInfo.user_attempt || 1}</p>
              </div>
              <div>
                <p class="text-obsidian-500">Status</p>
                <p class="text-obsidian-200 font-medium capitalize">{attemptInfo.status || 'Ready'}</p>
              </div>
            </div>
            {#if attemptInfo.message}
              <p class="text-sm text-obsidian-400 mt-3">{attemptInfo.message}</p>
            {/if}
          </div>
        {/if}

        <div class="space-y-3">
          {#if testFormUrl}
            <Button class="w-full" onclick={startTest}>
              <ExternalLink class="w-4 h-4 mr-2" />
              Open Test
            </Button>
            <p class="text-xs text-center text-obsidian-500">
              The test will open in a new window
            </p>
          {:else}
            <div class="p-4 rounded-lg bg-amber-900/20 border border-amber-800/50 text-center">
              <p class="text-amber-300">Test form URL not available. Please contact support.</p>
            </div>
          {/if}
        </div>

        <!-- Test Form URL Display -->
        {#if testFormUrl}
          <div class="mt-6 pt-6 border-t border-obsidian-700">
            <p class="text-xs text-obsidian-500 mb-2">Or copy this link:</p>
            <div class="flex items-center gap-2">
              <div class="flex-1 px-3 py-2 rounded-lg bg-obsidian-800 border border-obsidian-700 font-mono text-xs text-obsidian-400 truncate">
                {testFormUrl}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onclick={() => {
                  navigator.clipboard.writeText(testFormUrl || '');
                  toast.success('Link copied!');
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        {/if}
      </Card>

    {:else if loginStep === 'error'}
      <!-- Error State -->
      <Card class="p-8 text-center">
        <div class="w-20 h-20 rounded-full bg-red-900/50 flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-10 h-10 text-red-400" />
        </div>
        <h2 class="text-2xl font-bold text-obsidian-100 mb-2">Access Denied</h2>
        <p class="text-obsidian-400 mb-6">
          {errorMessage || 'Unable to validate your credentials.'}
        </p>
        <Button onclick={retryLogin}>
          Try Again
        </Button>
      </Card>
    {/if}
  </main>
</div>
