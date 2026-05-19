<script lang="ts">
  import { page } from '$app/stores';
  import { useCandidate } from '$lib/api/queries/candidates';
  import { useStartHRInterview } from '$lib/api/queries/interviews';
  import { API_URLS, fetchWithAuth } from '$lib/api/client';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { toast } from 'svelte-sonner';
  import {
    ArrowLeft,
    Handshake,
    Plus,
    Copy,
    ExternalLink,
    Loader2,
    RefreshCw,
    Mail,
    KeyRound
  } from 'lucide-svelte';

  const candidateId = $derived($page.params.candidate_id);
  const candidateQuery = useCandidate(candidateId);
  const startMutation = useStartHRInterview();

  const candidate = $derived($candidateQuery.data as any);

  type SessionInfo = { interview_url: string; session_id: string; hr_interview_id?: string };
  let sessionInfo = $state<SessionInfo | null>(null);

  $effect(() => {
    if (candidateId && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(`hr_iv_${candidateId}`);
      if (stored) {
        try {
          sessionInfo = JSON.parse(stored);
        } catch {
          /* ignore */
        }
      }
    }
  });

  const fullInterviewUrl = $derived.by(() => {
    if (!sessionInfo?.interview_url) return null;
    return /^https?:\/\//i.test(sessionInfo.interview_url)
      ? sessionInfo.interview_url
      : `http://localhost:8200${sessionInfo.interview_url}`;
  });

  const eligible = $derived(
    candidate?.technical_test_result === 'pass' &&
      !(candidate?.hr_test === true && candidate?.hr_test_result)
  );

  let generating = $state(false);
  async function generateLink() {
    if (!candidate) return;
    if (candidate.technical_test_result !== 'pass') {
      toast.error('Candidate must pass the technical interview first.');
      return;
    }
    if (candidate.hr_test && candidate.hr_test_result) {
      toast.error(
        `Candidate already completed HR interview (result: ${candidate.hr_test_result}). Use "Reset & Regenerate" first.`
      );
      return;
    }

    generating = true;
    try {
      const res: any = await $startMutation.mutateAsync({
        candidateId: candidate.candidate_id,
        jobRequirementId: candidate.job_requirement_id
      });
      const data = res?.data ?? {};
      const info: SessionInfo = {
        interview_url: data.interview_url,
        session_id: data.interview_session_id,
        hr_interview_id: data.hr_interview_id
      };
      sessionInfo = info;
      localStorage.setItem(`hr_iv_${candidateId}`, JSON.stringify(info));
      toast.success('Interview link generated — share it with the candidate.');
    } catch (err: any) {
      toast.error('Failed to generate link', { description: err?.message ?? String(err) });
    } finally {
      generating = false;
    }
  }

  let regenerating = $state(false);
  async function resetAndRegenerate() {
    if (!candidate) return;
    const confirmed = window.confirm(
      'This will delete the previous HR interview and create a fresh session. Continue?'
    );
    if (!confirmed) return;

    regenerating = true;
    try {
      const r = await fetchWithAuth(
        `${API_URLS.main}/hr-interview/reset/${candidate.candidate_id}`,
        { method: 'POST' }
      );
      const rb = await r.json().catch(() => ({}));
      if (!r.ok || rb?.success === false) {
        throw new Error(rb?.detail || rb?.message || `HTTP ${r.status}`);
      }
      sessionInfo = null;
      localStorage.removeItem(`hr_iv_${candidateId}`);
      await $candidateQuery.refetch?.();
      await generateLink();
    } catch (err: any) {
      toast.error('Failed to regenerate', { description: err?.message ?? String(err) });
    } finally {
      regenerating = false;
    }
  }

  function copyUrl() {
    if (!fullInterviewUrl) return;
    navigator.clipboard.writeText(fullInterviewUrl);
    toast.success('Interview URL copied to clipboard');
  }
</script>

<svelte:head>
  <title>Schedule HR Interview | HR Automation</title>
</svelte:head>

<div class="space-y-6">
  <Button variant="ghost" href={`/candidates/${candidateId}`} class="!px-0">
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back to Candidate
  </Button>

  <div class="flex items-start justify-between">
    <div>
      <div class="flex items-center gap-3 mb-2">
        <Handshake class="w-6 h-6 text-purple-500" />
        <h1 class="text-2xl font-bold text-gray-900">Schedule HR Interview</h1>
      </div>
      <p class="text-gray-500">
        Generate a unique HR interview link for
        <span class="font-medium text-gray-700">
          {candidate ? `${candidate.first_name ?? ''} ${candidate.last_name ?? ''}`.trim() : '…'}
        </span>
        and share it with the candidate.
      </p>
    </div>
  </div>

  {#if $candidateQuery.isLoading}
    <Skeleton class="h-64" />
  {:else if !candidate}
    <Card class="p-8 text-center text-gray-500">Candidate not found.</Card>
  {:else if candidate.technical_test_result !== 'pass'}
    <Card class="p-8 text-center">
      <div class="w-14 h-14 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-3">
        <Handshake class="w-7 h-7 text-purple-600" />
      </div>
      <h3 class="text-lg font-medium text-gray-800 mb-2">Not eligible yet</h3>
      <p class="text-gray-500 mb-4">
        Candidate must pass the technical interview before an HR interview can be scheduled.
      </p>
      <p class="text-sm text-gray-400">
        Current technical result: <span class="font-medium">{candidate.technical_test_result || 'not taken'}</span>
      </p>
    </Card>
  {:else if !sessionInfo}
    <Card class="p-12 text-center">
      <Handshake class="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 class="text-lg font-medium text-gray-700 mb-2">No interview link yet</h3>
      <p class="text-gray-500 mb-6 max-w-md mx-auto">
        Generate a one-click HR interview link. The candidate logs in with their email and password,
        and the AI HR interviewer starts automatically.
      </p>
      <Button onclick={generateLink} disabled={generating || !eligible}>
        {#if generating}
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Generating Link...
        {:else}
          <Plus class="w-4 h-4 mr-2" />
          Generate Interview Link
        {/if}
      </Button>
    </Card>
  {:else}
    <div class="space-y-6">
      <Card class="p-6">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
            <Handshake class="w-7 h-7 text-purple-600" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-xl font-semibold text-gray-900">HR Interview Ready</h3>
              <span class="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">
                Active
              </span>
            </div>
            <p class="text-sm text-gray-500">
              Active session for <span class="font-medium text-gray-700">{candidate ? `${candidate.first_name ?? ''} ${candidate.last_name ?? ''}`.trim() : 'candidate'}</span>
            </p>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <h4 class="font-medium text-gray-900 mb-1">Share Interview Link</h4>
        <p class="text-sm text-gray-500 mb-4">
          Send this URL to the candidate. They log in with their email and password to start.
        </p>
        <div>
          <label class="text-xs text-gray-400 mb-1 block">Candidate Interview URL</label>
          <div class="flex items-center gap-2">
            <div class="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 font-mono text-sm text-gray-600 truncate">
              {fullInterviewUrl}
            </div>
            <Button variant="outline" onclick={copyUrl} title="Copy URL">
              <Copy class="w-4 h-4" />
            </Button>
            <a
              href={fullInterviewUrl}
              target="_blank"
              rel="noopener"
              title="Open in new tab"
              class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all no-underline"
            >
              <ExternalLink class="w-4 h-4" />
              Open
            </a>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <h4 class="font-medium text-gray-900 mb-3">Candidate Login Credentials</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <Mail class="w-5 h-5 text-gray-400" />
            <div class="min-w-0">
              <p class="text-xs text-gray-400">Email</p>
              <p class="font-mono text-sm text-gray-800 truncate">{candidate.email}</p>
            </div>
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
            <KeyRound class="w-5 h-5 text-gray-400" />
            <div class="min-w-0">
              <p class="text-xs text-gray-400">Password</p>
              <p class="font-mono text-sm text-gray-800 truncate">{candidate.password ?? '—'}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <h4 class="font-medium text-gray-900 mb-4">How It Works</h4>
        <ol class="space-y-3 text-sm text-gray-500">
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span>
            <span>Copy the <strong class="text-gray-700">Candidate Interview URL</strong> and share it with the candidate.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span>
            <span>Candidate opens the URL and logs in using their <strong class="text-gray-700">email + password</strong> shown above.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span>
            <span>The AI HR interviewer conducts a behavioural conversation.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span>
            <span>Score and detailed AI feedback appear on the candidate's profile automatically.</span>
          </li>
        </ol>
      </Card>

      <div class="flex gap-3">
        <Button variant="outline" onclick={resetAndRegenerate} disabled={regenerating || generating}>
          {#if regenerating}
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Regenerating...
          {:else}
            <RefreshCw class="w-4 h-4 mr-2" />
            Reset & Regenerate Link
          {/if}
        </Button>
      </div>
    </div>
  {/if}
</div>
