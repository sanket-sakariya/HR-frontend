<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    id?: string;
    name?: string;
    rows?: number;
    oninput?: (e: Event) => void;
  }

  let {
    placeholder = '',
    value = $bindable(''),
    disabled = false,
    required = false,
    class: className = '',
    id,
    name,
    rows = 4,
    oninput
  }: Props = $props();
</script>

<textarea
  {placeholder}
  bind:value
  {disabled}
  {required}
  {id}
  {name}
  {rows}
  {oninput}
  class={cn(
    'w-full bg-obsidian-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 placeholder:text-slate-500',
    'focus:border-royal-500 focus:ring-1 focus:ring-royal-500 focus:outline-none',
    'transition-colors duration-200 resize-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  )}
></textarea>
