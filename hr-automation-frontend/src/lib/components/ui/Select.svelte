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
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800',
    'focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none',
    'transition-all duration-200 appearance-none cursor-pointer',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50',
    'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10',
    className
  )}
>
  <option value="" disabled class="text-gray-400">{placeholder}</option>
  {#each options as option}
    <option value={option.value} class="bg-white text-gray-800">
      {option.label}
    </option>
  {/each}
</select>
