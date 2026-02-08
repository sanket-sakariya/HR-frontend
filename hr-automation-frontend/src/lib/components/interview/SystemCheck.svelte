<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import Card from '$lib/components/ui/Card.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { AlertCircle, CheckCircle, Camera, Mic, Wifi, RefreshCw } from 'lucide-svelte';

  interface Props {
    cameraReady: boolean;
    micReady: boolean;
    networkReady: boolean;
    onStart: () => void;
    onRetry: () => void;
    class?: string;
  }

  let {
    cameraReady,
    micReady,
    networkReady,
    onStart,
    onRetry,
    class: className
  }: Props = $props();

  const allReady = $derived(cameraReady && micReady && networkReady);
</script>

<Card class={cn('p-8 max-w-lg mx-auto', className)}>
  <h2 class="text-xl font-semibold text-obsidian-100 text-center mb-6">
    System Check
  </h2>

  <div class="space-y-4 mb-8">
    <!-- Camera Check -->
    <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg">
      <div class={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        cameraReady ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'
      )}>
        <Camera class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <p class="font-medium text-obsidian-100">Camera</p>
        <p class="text-sm text-obsidian-400">
          {cameraReady ? 'Camera is working properly' : 'Camera access denied or unavailable'}
        </p>
      </div>
      {#if cameraReady}
        <CheckCircle class="w-5 h-5 text-emerald-500" />
      {:else}
        <AlertCircle class="w-5 h-5 text-red-500" />
      {/if}
    </div>

    <!-- Microphone Check -->
    <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg">
      <div class={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        micReady ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'
      )}>
        <Mic class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <p class="font-medium text-obsidian-100">Microphone</p>
        <p class="text-sm text-obsidian-400">
          {micReady ? 'Microphone is working properly' : 'Microphone access denied or unavailable'}
        </p>
      </div>
      {#if micReady}
        <CheckCircle class="w-5 h-5 text-emerald-500" />
      {:else}
        <AlertCircle class="w-5 h-5 text-red-500" />
      {/if}
    </div>

    <!-- Network Check -->
    <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg">
      <div class={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        networkReady ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'
      )}>
        <Wifi class="w-5 h-5" />
      </div>
      <div class="flex-1">
        <p class="font-medium text-obsidian-100">Network</p>
        <p class="text-sm text-obsidian-400">
          {networkReady ? 'Connection is stable' : 'Network connection issues detected'}
        </p>
      </div>
      {#if networkReady}
        <CheckCircle class="w-5 h-5 text-emerald-500" />
      {:else}
        <AlertCircle class="w-5 h-5 text-red-500" />
      {/if}
    </div>
  </div>

  <div class="flex gap-3">
    <Button variant="outline" class="flex-1" onclick={onRetry}>
      <RefreshCw class="w-4 h-4 mr-2" />
      Retry Check
    </Button>
    <Button class="flex-1" onclick={onStart} disabled={!allReady}>
      {allReady ? 'Start Interview' : 'Fix Issues to Continue'}
    </Button>
  </div>

  {#if !allReady}
    <p class="text-sm text-obsidian-500 text-center mt-4">
      Please ensure all systems are ready before starting the interview
    </p>
  {/if}
</Card>
