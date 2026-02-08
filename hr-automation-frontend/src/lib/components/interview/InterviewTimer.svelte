<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { Clock } from 'lucide-svelte';

  interface Props {
    duration: number; // seconds
    maxDuration?: number; // seconds
    class?: string;
  }

  let { duration, maxDuration, class: className }: Props = $props();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = $derived(maxDuration ? (duration / maxDuration) * 100 : 0);
  const isWarning = $derived(maxDuration ? progress >= 80 : false);
  const isDanger = $derived(maxDuration ? progress >= 95 : false);
</script>

<div class={cn('flex items-center gap-3', className)}>
  <Clock class={cn(
    'w-5 h-5',
    isDanger ? 'text-red-500 animate-pulse' : isWarning ? 'text-amber-500' : 'text-obsidian-400'
  )} />
  
  <div class="flex flex-col">
    <span class={cn(
      'font-mono text-lg font-semibold',
      isDanger ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-obsidian-100'
    )}>
      {formatTime(duration)}
    </span>
    
    {#if maxDuration}
      <span class="text-xs text-obsidian-500">
        / {formatTime(maxDuration)}
      </span>
    {/if}
  </div>

  {#if maxDuration}
    <div class="flex-1 h-1.5 bg-obsidian-700 rounded-full overflow-hidden max-w-32">
      <div
        class={cn(
          'h-full rounded-full transition-all duration-300',
          isDanger ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-royal-500'
        )}
        style="width: {Math.min(progress, 100)}%"
      ></div>
    </div>
  {/if}
</div>
