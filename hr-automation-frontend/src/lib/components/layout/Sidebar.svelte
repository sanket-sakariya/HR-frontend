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
    Users,
    BarChart3,
    Building2,
    LogOut,
    ChevronLeft,
    Sparkles
  } from 'lucide-svelte';

  const iconMap: Record<string, any> = {
    LayoutDashboard,
    Briefcase,
    Users,
    BarChart3,
    Building2
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
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
    onclick={() => uiStore.closeSidebar()}
    role="button"
    tabindex="-1"
  ></div>
{/if}

<!-- Sidebar -->
<aside
  class={cn(
    'fixed top-0 left-0 z-50 h-full bg-obsidian-900 border-r border-slate-800 transition-all duration-300',
    uiStore.sidebarCollapsed ? 'w-20' : 'w-64',
    uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full',
    'lg:translate-x-0'
  )}
>
  <div class="flex flex-col h-full">
    <!-- Logo -->
    <div class="flex items-center justify-between px-4 h-16 border-b border-slate-800">
      {#if !uiStore.sidebarCollapsed}
        <a href="/" class="flex items-center gap-2">
          <div class="p-2 rounded-lg bg-gradient-to-br from-royal-600 to-royal-500">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <span class="text-lg font-bold text-slate-100">HR Auto</span>
        </a>
      {:else}
        <a href="/" class="mx-auto">
          <div class="p-2 rounded-lg bg-gradient-to-br from-royal-600 to-royal-500">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
        </a>
      {/if}

      <button
        onclick={() => uiStore.toggleSidebarCollapse()}
        class="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ChevronLeft class={cn('w-5 h-5 transition-transform', uiStore.sidebarCollapsed && 'rotate-180')} />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3">
      <ul class="space-y-1">
        {#each NAV_ITEMS as item}
          {@const Icon = iconMap[item.icon]}
          {@const isActive = $page.url.pathname === item.href || 
            (item.href !== '/' && $page.url.pathname.startsWith(item.href))}
          
          <li>
            <a
              href={item.href}
              class={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-royal-500/10 text-royal-400 border border-royal-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              )}
            >
              <Icon class="w-5 h-5 flex-shrink-0" />
              {#if !uiStore.sidebarCollapsed}
                <span class="font-medium">{item.label}</span>
              {/if}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- User section -->
    <div class="border-t border-slate-800 p-3">
      {#if !uiStore.sidebarCollapsed}
        <div class="flex items-center gap-3 px-3 py-2 mb-2">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center">
            <span class="text-white font-semibold">
              {authStore.displayName?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-200 truncate">
              {authStore.displayName}
            </p>
            <p class="text-xs text-slate-500 truncate">
              {authStore.email || ''}
            </p>
          </div>
        </div>
      {/if}

      <button
        onclick={handleLogout}
        class={cn(
          'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-danger hover:bg-danger/10 transition-colors',
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
