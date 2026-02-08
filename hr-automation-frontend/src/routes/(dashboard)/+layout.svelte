<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';
  import PageShell from '$lib/components/layout/PageShell.svelte';

  let { children } = $props();

  onMount(() => {
    if (!authStore.isAuthenticated) {
      goto('/login');
    }
  });
</script>

{#if authStore.isAuthenticated}
  <PageShell>
    {@render children()}
  </PageShell>
{:else}
  <div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent"></div>
  </div>
{/if}
