<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import '../app.css';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false
      }
    }
  });

  let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
  {@render children()}
</QueryClientProvider>

<Toaster
  theme="light"
  position="top-right"
  richColors
  toastOptions={{
    classNames: {
      toast: 'bg-white border-gray-200 shadow-elevated'
    }
  }}
/>
