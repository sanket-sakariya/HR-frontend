<script lang="ts">
  import { page } from '$app/stores';
  import { authStore } from '$lib/stores/auth.svelte';
  import { uiStore } from '$lib/stores/ui.svelte';
  import { useLogout } from '$lib/api/queries/auth';
  import { NAV_ITEMS } from '$lib/constants/routes';
  import { cn } from '$lib/utils/cn';
  import { toast } from 'svelte-sonner';
  import {
    LayoutDashboard,
    Briefcase,
    BarChart3,
    Building2,
    Settings,
    LogOut,
    ChevronLeft,
    Sparkles
  } from 'lucide-svelte';

  const iconMap: Record<string, any> = {
    LayoutDashboard,
    Briefcase,
    BarChart3,
    Building2,
    Settings
  };

  const logoutMutation = useLogout();

  async function handleLogout() {
    try {
      await $logoutMutation.mutateAsync();
      authStore.logout();
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error: any) {
      // Even if API fails, clear local state and redirect
      authStore.logout();
      window.location.href = '/login';
    }
  }
</script>

<!-- Mobile backdrop -->
{#if uiStore.sidebarOpen && uiStore.isMobile}
  <div
    class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in"
    onclick={() => uiStore.closeSidebar()}
    role="button"
    tabindex="-1"
  ></div>
{/if}

<!-- Sidebar -->
<aside
  class={cn(
    'fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 shadow-soft',
    uiStore.sidebarCollapsed ? 'w-20' : 'w-64',
    uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full',
    'lg:translate-x-0'
  )}
>
  <div class="flex flex-col h-full">
    <!-- Logo -->
    <div class="flex items-center justify-between px-4 h-16 border-b border-gray-100">
      {#if !uiStore.sidebarCollapsed}
        <a href="/" class="flex items-center gap-2.5 group">
          <div class="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm group-hover:shadow-purple-md transition-all duration-300">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <span class="text-lg font-bold text-gradient-bold">HR Auto</span>
        </a>
      {:else}
        <a href="/" class="mx-auto group">
          <div class="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm group-hover:shadow-purple-md transition-all duration-300">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
        </a>
      {/if}

      <button
        onclick={() => uiStore.toggleSidebarCollapse()}
        class="hidden lg:flex p-1.5 rounded-lg hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200"
      >
        <ChevronLeft class={cn('w-5 h-5 transition-transform duration-300', uiStore.sidebarCollapsed && 'rotate-180')} />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <ul class="space-y-1">
        {#each NAV_ITEMS as item}
          {@const Icon = iconMap[item.icon]}
          {@const isActive = $page.url.pathname === item.href ||
            (item.href !== '/dashboard' && $page.url.pathname.startsWith(item.href))}
          
          <li>
            <a
              href={item.href}
              class={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
                isActive
                  ? 'bg-purple-50 text-purple-700 shadow-purple-sm font-semibold'
                  : 'text-gray-500 hover:text-purple-700 hover:bg-purple-50/50'
              )}
            >
              <Icon class={cn('w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110', isActive && 'text-purple-600')} />
              {#if !uiStore.sidebarCollapsed}
                <span class="font-medium">{item.label}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- User section -->
    <div class="border-t border-gray-100 p-3">
      {#if !uiStore.sidebarCollapsed}
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">
            <span class="text-white font-semibold">
              {authStore.displayName?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 truncate">
              {authStore.displayName}
            </p>
            <p class="text-xs text-gray-400 truncate">
              {authStore.email || ''}
            </p>
          </div>
        </div>
      {/if}

      <button
        onclick={handleLogout}
        class={cn(
          'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200',
          uiStore.sidebarCollapsed && 'justify-center'
        )}
      >
        <LogOut class="w-5 h-5" />
        {#if !uiStore.sidebarCollapsed}
          <span class="font-medium">Logout</span>
        {/if}
      </button>
    </div>
  </div>
</aside>
