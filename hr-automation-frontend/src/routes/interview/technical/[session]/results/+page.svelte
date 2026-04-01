<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { useTechnicalInterviewBySession } from '$lib/api/queries/interviews';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import {
    Code,
    CheckCircle,
    XCircle,
    Download,
    ArrowLeft,
    Clock,
    MessageSquare,
    Star,
    AlertTriangle,
    TrendingUp,
    User,
    Briefcase,
    Brain,
    Zap,
    Target,
    Award
  } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const sessionId = $derived($page.params.session);

  // Fetch real interview data
  const interviewQuery = useTechnicalInterviewBySession(sessionId);
  const interview = $derived($interviewQuery.data);

  // Computed values
  const passed = $derived(interview?.result === 'pass' || (interview?.overall_score && interview.overall_score >= 60));
  const overallScore = $derived(interview?.overall_score || 0);
  const duration = $derived(interview?.interview_duration_seconds ? Math.round(interview.interview_duration_seconds / 60) : 0);
  const questionsAnswered = $derived(interview?.questions_answered || 0);

  // Score breakdown
  const technicalScore = $derived(interview?.technical_knowledge_score || interview?.domain_expertise_score || 0);
  const problemSolvingScore = $derived(interview?.response_depth_score || 0);
  const communicationScore = $derived(interview?.communication_score || 0);
  const codeQualityScore = $derived(interview?.response_relevance_score || interview?.response_clarity_score || 0);

  // Strengths and improvements
  const strengths = $derived(interview?.candidate_strengths || []);
  const improvements = $derived(interview?.candidate_weaknesses || interview?.improvement_areas || []);

  // Candidate info from job_details
  const candidateName = $derived(interview?.candidate_info?.name || 'Candidate');
  const jobTitle = $derived(interview?.job_details?.title || 'Technical Interview');

  function downloadReport() {
    toast.info('Report download feature coming soon');
  }
</script>

<svelte:head>
  <title>Technical Interview Results | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300">
  <!-- Header -->
  <header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10">
    <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
          <Code class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="font-semibold text-gray-800">Technical Interview</h1>
          <p class="text-xs text-gray-500">Results & Analysis</p>
        </div>
      </div>
      <Button variant="outline" onclick={downloadReport}>
        <Download class="w-4 h-4" />
        Download Report
      </Button>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-4 py-8">
    {#if $interviewQuery.isLoading}
      <div class="space-y-6">
        <Skeleton class="h-64" />
        <div class="grid grid-cols-4 gap-4">
          {#each Array(4) as _}
            <Skeleton class="h-32" />
          {/each}
        </div>
        <div class="grid grid-cols-2 gap-6">
          <Skeleton class="h-48" />
          <Skeleton class="h-48" />
        </div>
      </div>
    {:else if $interviewQuery.error}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle class="w-8 h-8 text-red-500" />
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Unable to Load Results</h2>
        <p class="text-gray-500 mb-6">{$interviewQuery.error.message}</p>
        <Button onclick={() => goto('/dashboard')}>
          Return to Dashboard
        </Button>
      </Card>
    {:else if interview}
      <div class="space-y-6">
        <!-- Results Card -->
        <Card class="p-8">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div class="flex items-center gap-6">
              <div class="w-24 h-24 rounded-2xl flex items-center justify-center {passed ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-red-600'} shadow-lg">
                {#if passed}
                  <CheckCircle class="w-12 h-12 text-white" />
                {:else}
                  <XCircle class="w-12 h-12 text-white" />
                {/if}
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-3 py-1 rounded-full text-xs font-medium {passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
                    {passed ? 'PASSED' : 'NOT PASSED'}
                  </span>
                </div>
                <h1 class="text-2xl font-bold text-gray-800 mb-1">
                  {passed ? 'Interview Passed!' : 'Interview Not Passed'}
                </h1>
                <p class="text-gray-500">
                  Technical assessment completed and evaluated by AI
                </p>
              </div>
            </div>

            <div class="flex items-center gap-8">
              <ScoreGauge score={overallScore} size="lg" />
              <div class="text-center">
                <p class="text-3xl font-bold text-gray-800">{overallScore}%</p>
                <p class="text-sm text-gray-500">Overall Score</p>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-8">
            <div class="flex items-center gap-3 text-gray-600">
              <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Clock class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p class="text-lg font-semibold text-gray-800">{duration} min</p>
                <p class="text-xs text-gray-500">Duration</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-600">
              <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="text-lg font-semibold text-gray-800">{questionsAnswered}</p>
                <p class="text-xs text-gray-500">Questions</p>
              </div>
            </div>
            {#if interview.ai_recommendation}
              <div class="flex items-center gap-3 text-gray-600">
                <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Award class="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p class="text-lg font-semibold text-gray-800 capitalize">{interview.ai_recommendation}</p>
                  <p class="text-xs text-gray-500">AI Recommendation</p>
                </div>
              </div>
            {/if}
          </div>
        </Card>

        <!-- Detailed Scores -->
        <Card class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp class="w-5 h-5 text-purple-600" />
            Performance Breakdown
          </h2>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center p-4 rounded-xl bg-gray-50">
              <ScoreGauge score={technicalScore} />
              <p class="mt-3 text-sm font-medium text-gray-700">Technical Knowledge</p>
            </div>
            <div class="text-center p-4 rounded-xl bg-gray-50">
              <ScoreGauge score={problemSolvingScore} />
              <p class="mt-3 text-sm font-medium text-gray-700">Problem Solving</p>
            </div>
            <div class="text-center p-4 rounded-xl bg-gray-50">
              <ScoreGauge score={communicationScore} />
              <p class="mt-3 text-sm font-medium text-gray-700">Communication</p>
            </div>
            <div class="text-center p-4 rounded-xl bg-gray-50">
              <ScoreGauge score={codeQualityScore} />
              <p class="mt-3 text-sm font-medium text-gray-700">Response Quality</p>
            </div>
          </div>
        </Card>

        <!-- Feedback -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Strengths -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle class="w-4 h-4 text-emerald-600" />
              </div>
              <h2 class="text-lg font-semibold text-gray-800">Strengths</h2>
            </div>
            {#if strengths.length > 0}
              <ul class="space-y-3">
                {#each strengths as strength}
                  <li class="flex items-start gap-3">
                    <Star class="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span class="text-gray-600">{strength}</span>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="text-gray-400 text-sm">No specific strengths identified</p>
            {/if}
          </Card>

          <!-- Areas for Improvement -->
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Target class="w-4 h-4 text-amber-600" />
              </div>
              <h2 class="text-lg font-semibold text-gray-800">Areas for Improvement</h2>
            </div>
            {#if improvements.length > 0}
              <ul class="space-y-3">
                {#each improvements as improvement}
                  <li class="flex items-start gap-3">
                    <span class="w-4 h-4 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0"></span>
                    <span class="text-gray-600">{improvement}</span>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="text-gray-400 text-sm">No specific improvements identified</p>
            {/if}
          </Card>
        </div>

        <!-- AI Feedback Summary -->
        {#if interview.ai_feedback_summary}
          <Card class="p-6">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Brain class="w-4 h-4 text-purple-600" />
              </div>
              <h2 class="text-lg font-semibold text-gray-800">AI Feedback Summary</h2>
            </div>
            <p class="text-gray-600 leading-relaxed">{interview.ai_feedback_summary}</p>
          </Card>
        {/if}

        <!-- Actions -->
        <div class="flex justify-center gap-4 pt-4">
          <Button variant="outline" onclick={() => goto('/dashboard')}>
            <ArrowLeft class="w-4 h-4" />
            Return to Dashboard
          </Button>
          {#if interview.interview_transcript && interview.interview_transcript.length > 0}
            <Button onclick={() => toast.info('Full transcript view coming soon')}>
              <MessageSquare class="w-4 h-4" />
              View Full Transcript
            </Button>
          {/if}
        </div>
      </div>
    {:else}
      <Card class="p-8 text-center">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <Code class="w-8 h-8 text-gray-400" />
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Interview Not Found</h2>
        <p class="text-gray-500 mb-6">The interview results you're looking for don't exist or have been removed.</p>
        <Button onclick={() => goto('/dashboard')}>
          Return to Dashboard
        </Button>
      </Card>
    {/if}
  </main>

  <!-- Footer -->
  <footer class="py-6 text-center">
    <p class="text-xs text-gray-400">
      Powered by HR Automation Platform
    </p>
  </footer>
</div>
