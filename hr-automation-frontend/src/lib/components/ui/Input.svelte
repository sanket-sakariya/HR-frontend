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
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400',
    'focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none',
    'transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    className
  )}
/>
