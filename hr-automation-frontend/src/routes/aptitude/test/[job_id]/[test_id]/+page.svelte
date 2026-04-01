<script lang="ts">
  import { page } from '$app/stores';
  import { useAptitudeLoginForm } from '$lib/api/queries/aptitude';
  import Card from '$lib/components/ui/Card.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import {
    Brain,
    Loader2,
    ExternalLink,
    AlertCircle,
    RefreshCw,
    ArrowRight
  } from 'lucide-svelte';

  const jobId = $derived($page.params.job_id);
  const testId = $derived($page.params.test_id);

  // Query to get login form URL
  const loginFormQuery = useAptitudeLoginForm(jobId, testId);

  // Get login URL from query data
  const loginUrl = $derived($loginFormQuery.data?.data?.login_url || $loginFormQuery.data?.data?.form_url);
  const loginData = $derived($loginFormQuery.data?.data?.login_data);

  // Auto-redirect when login URL is available
  $effect(() => {
    if (loginUrl && !$loginFormQuery.isLoading) {
      // Small delay to show the loading state
      setTimeout(() => {
        window.location.href = loginUrl;
      }, 1500);
    }
  });
</script>

<svelte:head>
  <title>Aptitude Test | HR Automation</title>
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
        <p class="text-xs text-gray-500">Aptitude Assessment</p>
      </div>
    </div>
  </header>

  <!-- Main content -->
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      {#if $loginFormQuery.isLoading}
        <Card class="p-8">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Brain class="w-8 h-8 text-purple-600" />
            </div>
            <Skeleton class="h-7 w-48 mx-auto mb-3" />
            <Skeleton class="h-5 w-64 mx-auto mb-6" />
            <div class="space-y-3">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-3/4 mx-auto" />
            </div>
          </div>
        </Card>
      {:else if $loginFormQuery.error}
        <Card class="p-8">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle class="w-8 h-8 text-red-500" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Unable to Load Test</h2>
            <p class="text-gray-500 mb-6">
              {$loginFormQuery.error.message || 'Failed to load aptitude test. Please try again.'}
            </p>
            <Button onclick={() => window.location.reload()} class="w-full">
              <RefreshCw class="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </Card>
      {:else if loginUrl}
        <Card class="p-8">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-purple-md animate-pulse">
              <Brain class="w-8 h-8 text-white" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              {loginData?.test_title || 'Aptitude Assessment'}
            </h2>
            <p class="text-gray-500 mb-6">
              Preparing your test environment...
            </p>

            <div class="flex items-center justify-center gap-2 text-purple-600 mb-8">
              <Loader2 class="w-5 h-5 animate-spin" />
              <span class="font-medium">Redirecting</span>
            </div>

            <!-- Progress indicator -->
            <div class="w-full bg-gray-100 rounded-full h-1.5 mb-8 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full animate-pulse" style="width: 60%"></div>
            </div>

            <div class="pt-6 border-t border-gray-100">
              <p class="text-xs text-gray-400 mb-4">Not redirected automatically?</p>
              <Button variant="outline" onclick={() => window.location.href = loginUrl} class="w-full">
                <ExternalLink class="w-4 h-4" />
                Open Test Manually
                <ArrowRight class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      {:else}
        <Card class="p-8">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <AlertCircle class="w-8 h-8 text-amber-500" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Test Not Available</h2>
            <p class="text-gray-500 mb-6">
              The aptitude test link is not available at this time. This may happen if:
            </p>
            <ul class="text-sm text-gray-500 text-left space-y-2 mb-6">
              <li class="flex items-start gap-2">
                <span class="text-amber-500 mt-0.5">-</span>
                The test has not been assigned to you yet
              </li>
              <li class="flex items-start gap-2">
                <span class="text-amber-500 mt-0.5">-</span>
                The test link has expired
              </li>
              <li class="flex items-start gap-2">
                <span class="text-amber-500 mt-0.5">-</span>
                There's a temporary system issue
              </li>
            </ul>
            <p class="text-sm text-gray-500">
              Please contact HR or the hiring team for assistance.
            </p>
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
