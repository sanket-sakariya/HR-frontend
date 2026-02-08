<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    score: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    class?: string;
  }

  let { 
    score, 
    size = 'md', 
    showLabel = true,
    class: className = '' 
  }: Props = $props();

  const normalizedScore = Math.min(100, Math.max(0, score));
  
  const getColor = (s: number) => {
    if (s >= 80) return 'text-success';
    if (s >= 60) return 'text-royal-400';
    if (s >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getStrokeColor = (s: number) => {
    if (s >= 80) return 'stroke-success';
    if (s >= 60) return 'stroke-royal-400';
    if (s >= 40) return 'stroke-warning';
    return 'stroke-danger';
  };

  const sizes = {
    sm: { width: 48, strokeWidth: 4, fontSize: 'text-sm' },
    md: { width: 64, strokeWidth: 5, fontSize: 'text-base' },
    lg: { width: 80, strokeWidth: 6, fontSize: 'text-lg' }
  };

  const config = sizes[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedScore / 100) * circumference;
</script>

<div class={cn('relative inline-flex items-center justify-center', className)}>
  <svg
    width={config.width}
    height={config.width}
    class="transform -rotate-90"
  >
    <!-- Background circle -->
    <circle
      cx={config.width / 2}
      cy={config.width / 2}
      r={radius}
      fill="none"
      stroke-width={config.strokeWidth}
      class="stroke-slate-700"
    />
    <!-- Progress circle -->
    <circle
      cx={config.width / 2}
      cy={config.width / 2}
      r={radius}
      fill="none"
      stroke-width={config.strokeWidth}
      stroke-linecap="round"
      stroke-dasharray={circumference}
      stroke-dashoffset={offset}
      class={cn('transition-all duration-500', getStrokeColor(normalizedScore))}
    />
  </svg>
  
  {#if showLabel}
    <span class={cn(
      'absolute font-semibold',
      config.fontSize,
      getColor(normalizedScore)
    )}>
      {Math.round(normalizedScore)}
    </span>
  {/if}
</div>
