<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';

  onMount(() => {
    // Redirect based on auth state
    if (authStore.isAuthenticated) {
      goto('/dashboard');
    } else {
      goto('/login');
    }
  });
</script>

<div class="min-h-screen bg-obsidian-950 flex items-center justify-center">
  <div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent"></div>
</div>
