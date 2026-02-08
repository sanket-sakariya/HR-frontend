<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Candidate } from '$lib/api/generated';
  import { cn } from '$lib/utils/cn';
  import CandidateCard from './CandidateCard.svelte';
  import { Users, FileSearch, Brain, Code, Handshake, Gift, CheckCircle, XCircle } from 'lucide-svelte';

  interface Props {
    candidates: Candidate[];
    loading?: boolean;
    class?: string;
  }

  let { candidates, loading = false, class: className }: Props = $props();

  const dispatch = createEventDispatcher<{
    view: { id: string };
    move: { id: string; stage: string };
  }>();

  interface PipelineStage {
    id: string;
    label: string;
    icon: typeof Users;
    color: string;
  }

  const stages: PipelineStage[] = [
    { id: 'applied', label: 'Applied', icon: Users, color: 'obsidian' },
    { id: 'screening', label: 'Screening', icon: FileSearch, color: 'royal' },
    { id: 'aptitude', label: 'Aptitude', icon: Brain, color: 'blue' },
    { id: 'technical', label: 'Technical', icon: Code, color: 'amber' },
    { id: 'hr', label: 'HR Round', icon: Handshake, color: 'purple' },
    { id: 'offered', label: 'Offered', icon: Gift, color: 'emerald' },
    { id: 'hired', label: 'Hired', icon: CheckCircle, color: 'green' },
    { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'red' }
  ];

  const candidatesByStage = $derived(
    stages.reduce((acc, stage) => {
      acc[stage.id] = candidates.filter(c => c.status === stage.id);
      return acc;
    }, {} as Record<string, Candidate[]>)
  );

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    obsidian: { bg: 'bg-obsidian-700', border: 'border-obsidian-600', text: 'text-obsidian-300' },
    royal: { bg: 'bg-royal-900/50', border: 'border-royal-700', text: 'text-royal-300' },
    blue: { bg: 'bg-blue-900/50', border: 'border-blue-700', text: 'text-blue-300' },
    amber: { bg: 'bg-amber-900/50', border: 'border-amber-700', text: 'text-amber-300' },
    purple: { bg: 'bg-purple-900/50', border: 'border-purple-700', text: 'text-purple-300' },
    emerald: { bg: 'bg-emerald-900/50', border: 'border-emerald-700', text: 'text-emerald-300' },
    green: { bg: 'bg-green-900/50', border: 'border-green-700', text: 'text-green-300' },
    red: { bg: 'bg-red-900/50', border: 'border-red-700', text: 'text-red-300' }
  };

  function handleDragStart(event: DragEvent, candidateId: string) {
    event.dataTransfer?.setData('candidateId', candidateId);
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDrop(event: DragEvent, stageId: string) {
    event.preventDefault();
    const candidateId = event.dataTransfer?.getData('candidateId');
    if (candidateId) {
      dispatch('move', { id: candidateId, stage: stageId });
    }
  }
</script>

<div class={cn('flex gap-4 overflow-x-auto pb-4', className)}>
  {#each stages as stage}
    {@const stageColor = colorClasses[stage.color]}
    {@const stageCandidates = candidatesByStage[stage.id] || []}
    
    <div
      class={cn(
        'flex-shrink-0 w-72 rounded-lg border',
        stageColor.border,
        stageColor.bg
      )}
      ondragover={handleDragOver}
      ondrop={(e) => handleDrop(e, stage.id)}
      role="region"
      aria-label="{stage.label} stage"
    >
      <!-- Stage Header -->
      <div class="p-3 border-b border-obsidian-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svelte:component this={stage.icon} class={cn('w-4 h-4', stageColor.text)} />
            <h3 class={cn('font-medium text-sm', stageColor.text)}>{stage.label}</h3>
          </div>
          <span class={cn(
            'px-2 py-0.5 text-xs rounded-full',
            stageColor.bg,
            stageColor.text
          )}>
            {stageCandidates.length}
          </span>
        </div>
      </div>

      <!-- Stage Candidates -->
      <div class="p-2 space-y-2 min-h-[200px] max-h-[600px] overflow-y-auto">
        {#if loading}
          {#each Array(2) as _}
            <div class="bg-obsidian-800 rounded-lg p-4 animate-pulse">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-obsidian-700"></div>
                <div class="flex-1 space-y-2">
                  <div class="w-24 h-4 bg-obsidian-700 rounded"></div>
                  <div class="w-32 h-3 bg-obsidian-700 rounded"></div>
                </div>
              </div>
            </div>
          {/each}
        {:else if stageCandidates.length === 0}
          <div class="flex flex-col items-center justify-center h-32 text-obsidian-500 text-sm">
            <Users class="w-8 h-8 mb-2 opacity-50" />
            <p>No candidates</p>
          </div>
        {:else}
          {#each stageCandidates as candidate}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              draggable="true"
              ondragstart={(e) => handleDragStart(e, candidate.candidate_id || '')}
              class="cursor-grab active:cursor-grabbing"
            >
              <CandidateCard
                {candidate}
                showActions={false}
                class="!bg-obsidian-800/80 !p-3"
                on:view={(e) => dispatch('view', e.detail)}
              />
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/each}
</div>
