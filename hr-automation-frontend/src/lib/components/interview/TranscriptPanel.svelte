<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { TranscriptEntry } from '$lib/stores/interview.svelte';
  import { formatDistanceToNow } from '$lib/utils/format';
  import { MessageSquare, Bot, User } from 'lucide-svelte';

  interface Props {
    entries: TranscriptEntry[];
    class?: string;
  }

  let { entries, class: className }: Props = $props();
  let containerRef: HTMLDivElement;

  // Auto-scroll to bottom when new entries are added
  $effect(() => {
    if (entries.length > 0 && containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight;
    }
  });
</script>

<div class={cn('flex flex-col h-full', className)}>
  <div class="flex items-center gap-2 p-4 border-b border-obsidian-700">
    <MessageSquare class="w-5 h-5 text-royal-400" />
    <h3 class="font-semibold text-obsidian-100">Transcript</h3>
    <span class="ml-auto text-xs text-obsidian-500">{entries.length} messages</span>
  </div>

  <div 
    bind:this={containerRef}
    class="flex-1 overflow-y-auto p-4 space-y-4"
  >
    {#if entries.length === 0}
      <div class="text-center py-8 text-obsidian-500">
        <MessageSquare class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Transcript will appear here as the interview progresses</p>
      </div>
    {:else}
      {#each entries as entry}
        <div class={cn(
          'flex gap-3',
          entry.speaker === 'user' && 'flex-row-reverse'
        )}>
          <div class={cn(
            'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
            entry.speaker === 'ai' ? 'bg-royal-900 text-royal-400' : 'bg-emerald-900 text-emerald-400'
          )}>
            {#if entry.speaker === 'ai'}
              <Bot class="w-4 h-4" />
            {:else}
              <User class="w-4 h-4" />
            {/if}
          </div>

          <div class={cn(
            'flex-1 max-w-[80%]',
            entry.speaker === 'user' && 'text-right'
          )}>
            <div class={cn(
              'inline-block rounded-lg px-4 py-2',
              entry.speaker === 'ai' 
                ? 'bg-obsidian-800 text-obsidian-100' 
                : 'bg-royal-600 text-white'
            )}>
              <p class="text-sm whitespace-pre-wrap">{entry.text}</p>
            </div>
            <p class="text-xs text-obsidian-500 mt-1">
              {entry.speaker === 'ai' ? 'AI Interviewer' : 'You'} · {new Date(entry.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
