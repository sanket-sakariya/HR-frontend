<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    class?: string;
  }

  let { class: className = '', children }: Props & { children?: any } = $props();
</script>

<div class={cn('card-executive', className)}>
  {@render children?.()}
</div>
