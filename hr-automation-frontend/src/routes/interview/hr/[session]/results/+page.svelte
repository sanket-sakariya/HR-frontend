<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import { Handshake, CheckCircle, XCircle, Download, ArrowLeft, Clock, MessageSquare, Heart, Users, ThumbsUp } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  const sessionId = $derived($page.params.session);

  // Mock results data
  const results = {
    overall_score: 88,
    cultural_fit: 92,
    communication: 85,
    enthusiasm: 90,
    professionalism: 86,
    duration: 42,
    questions_answered: 15,
    status: 'passed',
    strengths: [
      'Excellent communication and articulation',
      'Strong alignment with company values',
      'Genuine enthusiasm for the role',
      'Professional demeanor throughout'
    ],
    notes: [
      'Candidate shows strong leadership potential',
      'Team-oriented mindset',
      'Good work-life balance expectations'
    ],
    personality_traits: [
      { trait: 'Openness', score: 85 },
      { trait: 'Conscientiousness', score: 90 },
      { trait: 'Extraversion', score: 75 },
      { trait: 'Agreeableness', score: 88 },
      { trait: 'Emotional Stability', score: 82 }
    ]
  };

  const passed = results.status === 'passed';
</script>

<svelte:head>
  <title>HR Interview Results | HR Automation</title>
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
        Your HR interview has been evaluated by our AI system
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
      <h2 class="text-lg font-semibold text-obsidian-100 mb-6">Assessment Breakdown</h2>
      
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <ScoreGauge score={results.cultural_fit} label="Cultural Fit" color="purple" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.communication} label="Communication" color="royal" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.enthusiasm} label="Enthusiasm" color="amber" />
        </div>
        <div class="text-center">
          <ScoreGauge score={results.professionalism} label="Professionalism" color="emerald" />
        </div>
      </div>
    </Card>

    <!-- Personality Traits -->
    <Card class="p-6">
      <div class="flex items-center gap-2 mb-6">
        <Users class="w-5 h-5 text-purple-400" />
        <h2 class="text-lg font-semibold text-obsidian-100">Personality Profile</h2>
      </div>
      
      <div class="space-y-4">
        {#each results.personality_traits as trait}
          <div class="flex items-center gap-4">
            <span class="w-32 text-sm text-obsidian-300">{trait.trait}</span>
            <div class="flex-1 h-3 bg-obsidian-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-purple-600 to-royal-500 rounded-full transition-all duration-500"
                style="width: {trait.score}%"
              ></div>
            </div>
            <span class="w-12 text-right text-sm font-medium text-obsidian-200">{trait.score}%</span>
          </div>
        {/each}
      </div>
    </Card>

    <!-- Feedback -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Strengths -->
      <Card class="p-6">
        <div class="flex items-center gap-2 mb-4">
          <ThumbsUp class="w-5 h-5 text-emerald-400" />
          <h2 class="text-lg font-semibold text-obsidian-100">Strengths</h2>
        </div>
        <ul class="space-y-3">
          {#each results.strengths as strength}
            <li class="flex items-start gap-2 text-obsidian-300">
              <CheckCircle class="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
              <span>{strength}</span>
            </li>
          {/each}
        </ul>
      </Card>

      <!-- Notes -->
      <Card class="p-6">
        <div class="flex items-center gap-2 mb-4">
          <Heart class="w-5 h-5 text-royal-400" />
          <h2 class="text-lg font-semibold text-obsidian-100">Interview Notes</h2>
        </div>
        <ul class="space-y-3">
          {#each results.notes as note}
            <li class="flex items-start gap-2 text-obsidian-300">
              <span class="w-1.5 h-1.5 rounded-full bg-royal-400 mt-2 flex-shrink-0"></span>
              <span>{note}</span>
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
      <Button onclick={() => toast.info('Full transcript view coming soon')}>
        <MessageSquare class="w-4 h-4 mr-2" />
        View Full Transcript
      </Button>
    </div>
  </div>
</div>
