<script lang="ts">
  import Dialog from '$lib/components/ui/Dialog.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { AlertTriangle } from 'lucide-svelte';

  interface Props {
    open?: boolean;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
    onconfirm?: () => void;
    oncancel?: () => void;
  }

  let {
    open = $bindable(false),
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    variant = 'danger',
    loading = false,
    onconfirm,
    oncancel
  }: Props = $props();

  function handleConfirm() {
    onconfirm?.();
  }

  function handleCancel() {
    open = false;
    oncancel?.();
  }
</script>

<Dialog bind:open onclose={handleCancel}>
  <div class="flex flex-col items-center text-center">
    <div class={`p-3 rounded-full mb-4 ${
      variant === 'danger' ? 'bg-danger/10' :
      variant === 'warning' ? 'bg-warning/10' : 'bg-royal-500/10'
    }`}>
      <AlertTriangle class={`w-8 h-8 ${
        variant === 'danger' ? 'text-danger' :
        variant === 'warning' ? 'text-warning' : 'text-royal-400'
      }`} />
    </div>

    <h3 class="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
    <p class="text-slate-400 mb-6">{description}</p>

    <div class="flex gap-3 w-full">
      <Button variant="secondary" onclick={handleCancel} class="flex-1">
        {cancelLabel}
      </Button>
      <Button 
        variant={variant === 'danger' ? 'danger' : 'primary'} 
        onclick={handleConfirm}
        {loading}
        class="flex-1"
      >
        {confirmLabel}
      </Button>
    </div>
  </div>
</Dialog>
