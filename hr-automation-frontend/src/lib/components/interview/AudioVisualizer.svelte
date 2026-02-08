<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    level: number; // 0-100
    class?: string;
  }

  let { level, class: className }: Props = $props();

  // Create bars based on level
  const bars = $derived(
    Array(20).fill(0).map((_, i) => {
      const threshold = (i + 1) * 5;
      return level >= threshold;
    })
  );
</script>

<div class={cn('flex items-end gap-0.5 h-6', className)}>
  {#each bars as active, i}
    <div
      class={cn(
        'w-1 rounded-sm transition-all duration-75',
        active ? 'bg-emerald-500' : 'bg-obsidian-700'
      )}
      style="height: {Math.max(15, (i + 1) * 5)}%"
    ></div>
  {/each}
</div>
