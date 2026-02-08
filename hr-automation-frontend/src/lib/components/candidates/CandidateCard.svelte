<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Candidate } from '$lib/api/generated';
  import { formatRelative } from '$lib/utils/format';
  import { cn } from '$lib/utils/cn';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Mail, Phone, MapPin, Briefcase, Star, ChevronRight } from 'lucide-svelte';

  interface Props {
    candidate: Candidate;
    showActions?: boolean;
    class?: string;
  }

  let { candidate, showActions = true, class: className }: Props = $props();

  const dispatch = createEventDispatcher<{
    view: { id: string };
    schedule: { id: string; type: 'aptitude' | 'technical' | 'hr' };
  }>();

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    applied: { label: 'Applied', variant: 'default' },
    screening: { label: 'Screening', variant: 'info' },
    aptitude: { label: 'Aptitude', variant: 'info' },
    technical: { label: 'Technical', variant: 'warning' },
    hr: { label: 'HR Round', variant: 'warning' },
    offered: { label: 'Offered', variant: 'success' },
    hired: { label: 'Hired', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' }
  };

  const currentStatus = $derived(statusConfig[candidate.status || 'applied'] || statusConfig.applied);
</script>

<div class={cn(
  'bg-obsidian-800 border border-obsidian-700 rounded-lg p-4 hover:border-royal-500/50 transition-colors',
  className
)}>
  <div class="flex items-start gap-4">
    <!-- Avatar -->
    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
      <span class="text-lg font-semibold text-white">
        {candidate.name?.charAt(0).toUpperCase() || 'C'}
      </span>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between gap-2">
        <div>
          <h3 class="font-semibold text-obsidian-100 truncate">{candidate.name || 'Unknown'}</h3>
          {#if candidate.current_position}
            <p class="text-sm text-obsidian-400 flex items-center gap-1 mt-0.5">
              <Briefcase class="w-3 h-3" />
              {candidate.current_position}
            </p>
          {/if}
        </div>
        <StatusBadge status={currentStatus.label} variant={currentStatus.variant} />
      </div>

      <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-obsidian-400">
        {#if candidate.email}
          <span class="flex items-center gap-1">
            <Mail class="w-3 h-3" />
            {candidate.email}
          </span>
        {/if}
        {#if candidate.phone}
          <span class="flex items-center gap-1">
            <Phone class="w-3 h-3" />
            {candidate.phone}
          </span>
        {/if}
        {#if candidate.location}
          <span class="flex items-center gap-1">
            <MapPin class="w-3 h-3" />
            {candidate.location}
          </span>
        {/if}
      </div>

      <!-- Skills -->
      {#if candidate.skills && candidate.skills.length > 0}
        <div class="mt-3 flex flex-wrap gap-1">
          {#each candidate.skills.slice(0, 5) as skill}
            <span class="px-2 py-0.5 text-xs bg-obsidian-700 text-obsidian-300 rounded">
              {skill}
            </span>
          {/each}
          {#if candidate.skills.length > 5}
            <span class="px-2 py-0.5 text-xs bg-obsidian-700 text-obsidian-400 rounded">
              +{candidate.skills.length - 5}
            </span>
          {/if}
        </div>
      {/if}

      <!-- Score & Actions -->
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-4 text-sm">
          {#if candidate.ai_score !== undefined}
            <div class="flex items-center gap-1">
              <Star class="w-4 h-4 text-amber-500" />
              <span class="text-obsidian-200 font-medium">{candidate.ai_score}%</span>
              <span class="text-obsidian-500">AI Score</span>
            </div>
          {/if}
          {#if candidate.created_at}
            <span class="text-obsidian-500">
              Applied {formatRelative(candidate.created_at)}
            </span>
          {/if}
        </div>

        {#if showActions}
          <Button
            variant="ghost"
            size="sm"
            onclick={() => dispatch('view', { id: candidate.candidate_id || '' })}
          >
            View
            <ChevronRight class="w-4 h-4 ml-1" />
          </Button>
        {/if}
      </div>
    </div>
  </div>
</div>
