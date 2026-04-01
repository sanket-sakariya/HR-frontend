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
    Lock,
    CheckCircle2,
    ShieldCheck,
    Wifi,
    Timer,
    BookOpen
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
          }, 2000);
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

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
    <div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
        <Brain class="w-5 h-5 text-white" />
      </div>
      <div>
        <h1 class="font-semibold text-gray-800">HR Automation</h1>
        <p class="text-xs text-gray-500">Aptitude Assessment</p>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8">
    {#if testFormUrl}
      <!-- Successfully logged in - redirecting -->
      <div class="max-w-md mx-auto animate-fade-in">
        <Card class="p-8 text-center">
          <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 class="w-10 h-10 text-white" />
          </div>

          {#if candidateInfo}
            <p class="text-sm text-gray-500 mb-1">Welcome back,</p>
            <h2 class="text-2xl font-bold text-gray-800 mb-1">
              {candidateInfo.first_name} {candidateInfo.last_name}
            </h2>
            <p class="text-gray-400 text-sm mb-6">{candidateInfo.email}</p>
          {:else}
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Login Successful!</h2>
          {/if}

          {#if attemptInfo}
            <div class="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
              <p class="text-sm text-purple-700 font-medium">
                {attemptInfo.message || `Test Attempt #${attemptInfo.user_attempt || 1}`}
              </p>
            </div>
          {/if}

          <p class="text-gray-600 mb-6">
            Preparing your test environment...
          </p>

          <div class="flex items-center justify-center gap-2 text-purple-600 mb-8">
            <Loader2 class="w-5 h-5 animate-spin" />
            <span class="font-medium">Redirecting</span>
          </div>

          <Button onclick={goToTest} class="w-full" size="lg">
            <ExternalLink class="w-5 h-5" />
            Start Test Now
          </Button>
        </Card>
      </div>
    {:else}
      <!-- Login form -->
      <div class="grid lg:grid-cols-2 gap-8 items-start">
        <!-- Left side - Test info -->
        <div class="space-y-6">
          <div>
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              <Brain class="w-4 h-4" />
              Aptitude Assessment
            </span>
            <h1 class="text-3xl font-bold text-gray-800 mb-3">
              Candidate Assessment Test
            </h1>
            <p class="text-gray-600 text-lg">
              Complete this assessment to demonstrate your skills and move forward in the hiring process.
            </p>
          </div>

          {#if $testFormQuery.data?.data?.test_details}
            <div class="grid grid-cols-2 gap-4">
              <Card class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Clock class="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                    <p class="text-lg font-bold text-gray-800">
                      {$testFormQuery.data.data.test_details.total_time_minutes || 45} min
                    </p>
                  </div>
                </div>
              </Card>
              <Card class="p-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <FileQuestion class="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p class="text-xs text-gray-500 uppercase tracking-wide">Questions</p>
                    <p class="text-lg font-bold text-gray-800">
                      {$testFormQuery.data.data.test_details.total_questions || 30}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          {/if}

          <!-- Instructions -->
          <Card class="p-6">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen class="w-5 h-5 text-purple-600" />
              Before You Begin
            </h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Wifi class="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Stable Internet Connection</p>
                  <p class="text-xs text-gray-500">Ensure you have reliable connectivity throughout the test</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Timer class="w-3.5 h-3.5 text-amber-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Time Limit</p>
                  <p class="text-xs text-gray-500">The test has a strict time limit and cannot be paused</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck class="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-700">Monitored Session</p>
                  <p class="text-xs text-gray-500">Tab switching and navigation may be recorded</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Right side - Login form -->
        <div>
          <Card class="p-6 lg:p-8">
            <div class="text-center mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-purple-md">
                <Lock class="w-7 h-7 text-white" />
              </div>
              <h2 class="text-xl font-bold text-gray-800">Candidate Login</h2>
              <p class="text-sm text-gray-500 mt-1">
                Enter your credentials to start the assessment
              </p>
            </div>

            {#if loginError}
              <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <div class="flex gap-3">
                  <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p class="text-sm text-red-700">{loginError}</p>
                </div>
              </div>
            {/if}

            <form onsubmit={handleLogin} class="space-y-5">
              <div>
                <Label for="email" class="text-gray-700">Email Address</Label>
                <div class="relative mt-1.5">
                  <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                <Label for="password" class="text-gray-700">Password</Label>
                <div class="relative mt-1.5">
                  <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Enter your password"
                    class="pl-10"
                    required
                  />
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  Use the password from your application confirmation email
                </p>
              </div>

              <Button type="submit" class="w-full" size="lg" disabled={isSubmitting}>
                {#if isSubmitting}
                  <Loader2 class="w-5 h-5 animate-spin" />
                  Verifying Credentials...
                {:else}
                  <Brain class="w-5 h-5" />
                  Start Assessment
                {/if}
              </Button>
            </form>

            <div class="mt-6 pt-6 border-t border-gray-100 text-center">
              <p class="text-xs text-gray-400">
                By starting the test, you agree to complete it honestly and independently.
              </p>
            </div>
          </Card>
        </div>
      </div>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="mt-auto py-6 text-center">
    <p class="text-xs text-gray-400">
      Powered by HR Automation Platform
    </p>
  </footer>
</div>
