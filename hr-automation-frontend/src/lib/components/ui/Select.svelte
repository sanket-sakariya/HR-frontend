<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Option {
    value: string;
    label: string;
  }

  interface Props {
    options: Option[];
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    class?: string;
    id?: string;
    name?: string;
    onchange?: (e: Event) => void;
  }

  let {
    options,
    value = $bindable(''),
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    class: className = '',
    id,
    name,
    onchange
  }: Props = $props();
</script>

<select
  bind:value
  {disabled}
  {required}
  {id}
  {name}
  {onchange}
  class={cn(
    'w-full bg-obsidian-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200',
    'focus:border-royal-500 focus:ring-1 focus:ring-royal-500 focus:outline-none',
    'transition-colors duration-200 appearance-none cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
    className
  )}
>
  <option value="" disabled class="text-slate-500">{placeholder}</option>
  {#each options as option}
    <option value={option.value} class="bg-obsidian-800 text-slate-200">
      {option.label}
    </option>
  {/each}
</select>
