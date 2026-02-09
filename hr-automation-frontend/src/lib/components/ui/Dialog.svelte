<script lang="ts">
  import { cn } from '$lib/utils/cn';

  interface Props {
    open?: boolean;
    onclose?: () => void;
    class?: string;
  }

  let {
    open = $bindable(false),
    onclose,
    class: className = '',
    children
  }: Props & { children?: any } = $props();

  function handleBackdropClick() {
    open = false;
    onclose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false;
      onclose?.();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in"
    onclick={handleBackdropClick}
    role="button"
    tabindex="-1"
  ></div>

  <!-- Dialog -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
    <div
      class={cn(
        'bg-white border border-gray-200 rounded-2xl shadow-elevated p-6 w-full max-w-md animate-scale-in pointer-events-auto',
        className
      )}
      role="dialog"
      aria-modal="true"
      onclick={(e) => e.stopPropagation()}
    >
      {@render children?.()}
    </div>
  </div>
{/if}
