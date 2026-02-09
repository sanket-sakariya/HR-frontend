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
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400',
    'focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none',
    'transition-colors duration-200 resize-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  )}
></textarea>
