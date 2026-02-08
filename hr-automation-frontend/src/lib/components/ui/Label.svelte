<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    for?: string;
    required?: boolean;
    class?: string;
  }

  let {
    for: htmlFor,
    required = false,
    class: className = '',
    children
  }: Props & { children?: any } = $props();
</script>

<label
  for={htmlFor}
  class={cn(
    'block text-sm font-medium text-slate-300 mb-1.5',
    className
  )}
>
  {@render children?.()}
  {#if required}
    <span class="text-danger ml-0.5">*</span>
  {/if}
</label>
