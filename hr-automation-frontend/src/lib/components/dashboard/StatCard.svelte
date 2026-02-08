<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    title: string;
    value: string | number;
    change?: number;
    icon?: any;
    color?: 'primary' | 'success' | 'warning' | 'danger';
  }

  let { 
    title, 
    value, 
    change, 
    icon: Icon,
    color = 'primary' 
  }: Props = $props();

  const colors = {
    primary: 'from-royal-600 to-royal-500',
    success: 'from-emerald-600 to-emerald-500',
    warning: 'from-amber-600 to-amber-500',
    danger: 'from-red-600 to-red-500'
  };
</script>

<div class="card-executive p-6">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm text-slate-400 mb-1">{title}</p>
      <p class="text-3xl font-bold text-slate-100">{value}</p>
      
      {#if change !== undefined}
        <div class="flex items-center gap-1 mt-2">
          <span class={cn(
            'text-sm font-medium',
            change >= 0 ? 'text-success' : 'text-danger'
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span class="text-xs text-slate-500">vs last month</span>
        </div>
      {/if}
    </div>

    {#if Icon}
      <div class={cn(
        'p-3 rounded-xl bg-gradient-to-br',
        colors[color]
      )}>
        <Icon class="w-6 h-6 text-white" />
      </div>
    {/if}
  </div>
</div>
