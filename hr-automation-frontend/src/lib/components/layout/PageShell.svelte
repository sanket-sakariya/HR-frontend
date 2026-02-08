<script lang="ts">
  import { uiStore } from '$lib/stores/ui.svelte';
  import { cn } from '$lib/utils/cn';
  import Sidebar from './Sidebar.svelte';
  import Header from './Header.svelte';

  interface Props {
    title?: string;
  }

  let { title = '', children }: Props & { children?: any } = $props();
</script>

<div class="min-h-screen bg-obsidian-950">
  <Sidebar />
  
  <div class={cn(
    'transition-all duration-300',
    uiStore.sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
  )}>
    <Header {title} />
    
    <main class="p-4 lg:p-6">
      {@render children?.()}
    </main>
  </div>
</div>
