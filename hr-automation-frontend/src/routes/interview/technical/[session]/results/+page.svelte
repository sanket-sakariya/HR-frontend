<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import { Code, CheckCircle, XCircle, Download, ArrowLeft, Clock, MessageSquare, Star } from 'lucide-svelte';

  const sessionId = $derived($page.params.session);

  // Mock results data
  const results = {
    overall_score: 82,
    technical_skills: 85,
    problem_solving: 78,
    communication: 80,
    code_quality: 84,
    duration: 58,
    questions_answered: 12,
    status: 'passed',
    strengths: [
      'Strong understanding of data structures',
      'Clear code organization and naming conventions',
      'Good problem decomposition skills'
    ],
    improvements: [
      'Could optimize time complexity in some solutions',
      'Consider edge cases more thoroughly',
      'Explain thought process more clearly'
    ],
    transcript: [
      { speaker: 'ai', text: 'Can you explain the time complexity of your solution?', timestamp: 1200 },
      { speaker: 'user', text: 'The time complexity is O(n log n) due to the sorting step...', timestamp: 1215 },
      { speaker: 'ai', text: 'Great explanation. Now, can you optimize it further?', timestamp: 1245 }
    ]
  };

  const passed = results.status === 'passed';
</script>

<svelte:head>
  <title>Technical Interview Results | HR Automation</title>
</svelte:head>

<div class="min-h-screen bg-obsidian-950 py-8 px-4">
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <Button variant="ghost" onclick={() => goto('/candidates')}>
        <ArrowLeft class="w-4 h-4 mr-2" />
        Back
      </Button>
      <Button variant="outline">
        <Download class="w-4 h-4 mr-2" />
        Download Report
      </Button>
    </div>

    <!-- Results Card -->
    <Card class="p-8 text-center">
      <div class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center {passed ? 'bg-emerald-900/50' : 'bg-red-900/50'}">
        {#if passed}
          <CheckCircle class="w-10 h-10 text-emerald-400" />
        {:else}
          <XCircle class="w-10 h-10 text-red-400" />
        {/if}
      </div>

      <h1 class="text-2xl font-bold text-obsidian-100 mb-2">
        {passed ? 'Interview Passed!' : 'Interview Not Passed'}
      </h1>
      <p class="text-obsidian-400 mb-8">
        Your technical interview has been evaluated by our AI system
      </p>

      <!-- Overall Score -->
      <div class="flex justify-center mb-8">
        <ScoreGauge score={results.overall_score} label="Overall Score" size="lg" />
      </div>

      <!-- Quick Stats -->
      <div class="flex justify-center gap-8 text-sm text-obsidian-400">
        <div class="flex items-center gap-2">
          <Clock class="w-4 h-4" />
          <span>{results.duration} minutes</span>
        </div>
        <div class="flex items-center gap-2">
          <MessageSquare class="w-4 h-4" />
          <span>{results.questions_answered} questions</span>
        </div>
      </div>
    </Card>

    <!-- Detailed Scores -->
    <Card class="p-6">
      <h2 class="text-lg font-semibold text-obsidian-100 mb-6">Performance Breakdown</h2>
      
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <ScoreGauge score={results.technical_skills} label="Technical Skills" color="royal" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.problem_solving} label="Problem Solving" color="amber" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.communication} label="Communication" color="purple" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.code_quality} label="Code Quality" color="emerald" />
        </div>
      </div>
    </Card>

    <!-- Feedback -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Strengths -->
      <Card class="p-6">
        <div class="flex items-center gap-2 mb-4">
          <CheckCircle class="w-5 h-5 text-emerald-400" />
          <h2 class="text-lg font-semibold text-obsidian-100">Strengths</h2>
        </div>
        <ul class="space-y-3">
          {#each results.strengths as strength}
            <li class="flex items-start gap-2 text-obsidian-300">
              <Star class="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
              <span>{strength}</span>
            </li>
          {/each}
        </ul>
      </Card>

      <!-- Areas for Improvement -->
      <Card class="p-6">
        <div class="flex items-center gap-2 mb-4">
          <Code class="w-5 h-5 text-amber-400" />
          <h2 class="text-lg font-semibold text-obsidian-100">Areas for Improvement</h2>
        </div>
        <ul class="space-y-3">
          {#each results.improvements as improvement}
            <li class="flex items-start gap-2 text-obsidian-300">
              <span class="w-4 h-4 rounded-full border-2 border-amber-400 mt-1 flex-shrink-0"></span>
              <span>{improvement}</span>
            </li>
          {/each}
        </ul>
      </Card>
    </div>

    <!-- Actions -->
    <div class="flex justify-center gap-4">
      <Button variant="outline" onclick={() => goto('/candidates')}>
        Return to Dashboard
      </Button>
      <Button onclick={() => goto(`/interview/technical/${sessionId}/transcript`)}>
        <MessageSquare class="w-4 h-4 mr-2" />
        View Full Transcript
      </Button>
    </div>
  </div>
</div>
