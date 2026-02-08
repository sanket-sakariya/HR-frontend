<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    id?: string;
    name?: string;
    oninput?: (e: Event) => void;
    onchange?: (e: Event) => void;
  }

  let {
    type = 'text',
    placeholder = '',
    value = $bindable(''),
    disabled = false,
    required = false,
    class: className = '',
    id,
    name,
    oninput,
    onchange
  }: Props = $props();
</script>

<input
  {type}
  {placeholder}
  bind:value
  {disabled}
  {required}
  {id}
  {name}
  {oninput}
  {onchange}
  class={cn(
    'w-full bg-obsidian-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder:text-slate-500',
    'focus:border-royal-500 focus:ring-1 focus:ring-royal-500 focus:outline-none',
    'transition-colors duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  )}
/>
