<script lang="ts">
  import { uiStore } from '$lib/stores/ui.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { Menu, Bell, Search } from 'lucide-svelte';

  interface Props {
    title?: string;
  }

  let { title = '' }: Props = $props();
</script>

<header class="sticky top-0 z-30 bg-obsidian-950/80 backdrop-blur-glass border-b border-slate-800">
  <div class="flex items-center justify-between h-16 px-4 lg:px-6">
    <div class="flex items-center gap-4">
      <!-- Mobile menu button -->
      <button
        onclick={() => uiStore.toggleSidebar()}
        class="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
      >
        <Menu class="w-5 h-5" />
      </button>

      {#if title}
        <h1 class="text-xl font-semibold text-slate-100">{title}</h1>
      {/if}
    </div>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="hidden md:flex items-center">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            class="w-64 bg-obsidian-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-royal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <!-- Notifications -->
      <button class="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
        <Bell class="w-5 h-5" />
        <span class="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
      </button>

      <!-- User avatar (mobile) -->
      <div class="lg:hidden w-9 h-9 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center">
        <span class="text-white text-sm font-semibold">
          {authStore.displayName?.[0]?.toUpperCase() || 'U'}
        </span>
      </div>
    </div>
  </div>
</header>
