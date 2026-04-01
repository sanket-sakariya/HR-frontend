<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (e: MouseEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    class: className = '',
    type = 'button',
    onclick,
    children
  }: Props & { children?: any } = $props();

  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-purple-sm hover:shadow-purple-md hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-white hover:bg-purple-50 text-gray-700 border border-gray-200 hover:border-purple-300',
    outline: 'bg-transparent hover:bg-purple-50 text-purple-600 border-2 border-purple-500 hover:border-purple-600',
    ghost: 'hover:bg-purple-50 text-gray-500 hover:text-purple-700',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200',
    success: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg'
  };
</script>

<button
  {type}
  {disabled}
  {onclick}
  class={cn(
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  )}
>
  {#if loading}
    <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  {@render children?.()}
</button>
