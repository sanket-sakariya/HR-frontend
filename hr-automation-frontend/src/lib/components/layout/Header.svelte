<script lang="ts">
  import { uiStore } from '$lib/stores/ui.svelte';
  import { authStore } from '$lib/stores/auth.svelte';
  import { Menu, Bell, Search } from 'lucide-svelte';

  interface Props {
    title?: string;
  }

  let { title = '' }: Props = $props();
</script>

<header class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-soft">
  <div class="flex items-center justify-between h-16 px-4 lg:px-6">
    <div class="flex items-center gap-4">
      <!-- Mobile menu button -->
      <button
        onclick={() => uiStore.toggleSidebar()}
        class="lg:hidden p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200"
      >
        <Menu class="w-5 h-5" />
      </button>

      {#if title}
        <h1 class="text-xl font-bold text-gray-800">{title}</h1>
      {/if}
    </div>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="hidden md:flex items-center">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            class="w-64 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <!-- Notifications -->
      <button class="relative p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200">
        <Bell class="w-5 h-5" />
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-white"></span>
      </button>

      <!-- User avatar (mobile) -->
      <div class="lg:hidden w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
        <span class="text-white text-sm font-semibold">
          {authStore.displayName?.[0]?.toUpperCase() || 'U'}
        </span>
      </div>
    </div>
  </div>
</header>
