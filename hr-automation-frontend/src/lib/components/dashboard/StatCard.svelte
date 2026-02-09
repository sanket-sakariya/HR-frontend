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
    primary: 'from-purple-600 to-purple-500',
    success: 'from-emerald-500 to-emerald-400',
    warning: 'from-amber-500 to-amber-400',
    danger: 'from-red-500 to-red-400'
  };
</script>

<div class="card-executive p-6 animate-fade-in-up group">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p class="text-3xl font-bold text-gray-900 animate-count-up">{value}</p>
      
      {#if change !== undefined}
        <div class="flex items-center gap-1 mt-2">
          <span class={cn(
            'text-sm font-semibold',
            change >= 0 ? 'text-emerald-600' : 'text-red-600'
          )}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
          <span class="text-xs text-gray-400">vs last month</span>
        </div>
      {/if}
    </div>

    {#if Icon}
      <div class={cn(
        'p-3 rounded-2xl bg-gradient-to-br shadow-sm group-hover:scale-110 transition-transform duration-300',
        colors[color]
      )}>
        <Icon class="w-6 h-6 text-white" />
      </div>
    {/if}
  </div>
</div>
