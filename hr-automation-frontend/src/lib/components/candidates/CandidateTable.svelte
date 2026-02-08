<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Candidate } from '$lib/api/generated';
  import { formatRelative } from '$lib/utils/format';
  import { cn } from '$lib/utils/cn';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Eye, MoreVertical, Calendar, FileText, Trash2 } from 'lucide-svelte';

  interface Props {
    candidates: Candidate[];
    loading?: boolean;
    class?: string;
  }

  let { candidates, loading = false, class: className }: Props = $props();

  const dispatch = createEventDispatcher<{
    view: { id: string };
    schedule: { id: string; type: 'aptitude' | 'technical' | 'hr' };
    delete: { id: string };
    viewResume: { id: string };
  }>();

  let openMenuId = $state<string | null>(null);

  const statusConfig: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info' }> = {
    applied: { label: 'Applied', variant: 'default' },
    screening: { label: 'Screening', variant: 'info' },
    aptitude: { label: 'Aptitude', variant: 'info' },
    technical: { label: 'Technical', variant: 'warning' },
    hr: { label: 'HR Round', variant: 'warning' },
    offered: { label: 'Offered', variant: 'success' },
    hired: { label: 'Hired', variant: 'success' },
    rejected: { label: 'Rejected', variant: 'error' }
  };

  function toggleMenu(id: string) {
    openMenuId = openMenuId === id ? null : id;
  }

  function handleClickOutside(event: MouseEvent) {
    if (openMenuId && !(event.target as Element).closest('.action-menu')) {
      openMenuId = null;
    }
  }
</script>

<svelte:window onclick={handleClickOutside} />

<div class={cn('overflow-x-auto', className)}>
  <table class="w-full">
    <thead>
      <tr class="border-b border-obsidian-700">
        <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          Candidate
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          Position
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          Status
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          AI Score
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          Applied
        </th>
        <th class="text-right py-3 px-4 text-xs font-medium text-obsidian-400 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-obsidian-700/50">
      {#if loading}
        {#each Array(5) as _}
          <tr>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-obsidian-700 animate-pulse"></div>
                <div class="space-y-2">
                  <div class="w-32 h-4 bg-obsidian-700 rounded animate-pulse"></div>
                  <div class="w-24 h-3 bg-obsidian-700 rounded animate-pulse"></div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="w-24 h-4 bg-obsidian-700 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-20 h-6 bg-obsidian-700 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-12 h-4 bg-obsidian-700 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-20 h-4 bg-obsidian-700 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-8 h-8 bg-obsidian-700 rounded animate-pulse ml-auto"></div>
            </td>
          </tr>
        {/each}
      {:else if candidates.length === 0}
        <tr>
          <td colspan="6" class="py-12 text-center text-obsidian-400">
            No candidates found
          </td>
        </tr>
      {:else}
        {#each candidates as candidate}
          {@const status = statusConfig[candidate.status || 'applied'] || statusConfig.applied}
          <tr class="hover:bg-obsidian-800/50 transition-colors">
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-semibold text-white">
                    {candidate.name?.charAt(0).toUpperCase() || 'C'}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-obsidian-100">{candidate.name || 'Unknown'}</p>
                  <p class="text-sm text-obsidian-400">{candidate.email || ''}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <p class="text-obsidian-200">{candidate.current_position || '-'}</p>
            </td>
            <td class="py-4 px-4">
              <StatusBadge status={status.label} variant={status.variant} />
            </td>
            <td class="py-4 px-4">
              {#if candidate.ai_score !== undefined}
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-obsidian-700 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-royal-500 to-emerald-500 rounded-full"
                      style="width: {candidate.ai_score}%"
                    ></div>
                  </div>
                  <span class="text-sm text-obsidian-200">{candidate.ai_score}%</span>
                </div>
              {:else}
                <span class="text-obsidian-500">-</span>
              {/if}
            </td>
            <td class="py-4 px-4 text-obsidian-300">
              {candidate.created_at ? formatRelative(candidate.created_at) : '-'}
            </td>
            <td class="py-4 px-4 text-right">
              <div class="relative inline-block action-menu">
                <Button
                  variant="ghost"
                  size="icon"
                  onclick={() => toggleMenu(candidate.candidate_id || '')}
                >
                  <MoreVertical class="w-4 h-4" />
                </Button>

                {#if openMenuId === candidate.candidate_id}
                  <div class="absolute right-0 mt-2 w-48 bg-obsidian-800 border border-obsidian-700 rounded-lg shadow-xl z-50">
                    <div class="py-1">
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-obsidian-200 hover:bg-obsidian-700 flex items-center gap-2"
                        onclick={() => {
                          dispatch('view', { id: candidate.candidate_id || '' });
                          openMenuId = null;
                        }}
                      >
                        <Eye class="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-obsidian-200 hover:bg-obsidian-700 flex items-center gap-2"
                        onclick={() => {
                          dispatch('viewResume', { id: candidate.candidate_id || '' });
                          openMenuId = null;
                        }}
                      >
                        <FileText class="w-4 h-4" />
                        View Resume
                      </button>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-obsidian-200 hover:bg-obsidian-700 flex items-center gap-2"
                        onclick={() => {
                          dispatch('schedule', { id: candidate.candidate_id || '', type: 'technical' });
                          openMenuId = null;
                        }}
                      >
                        <Calendar class="w-4 h-4" />
                        Schedule Interview
                      </button>
                      <div class="border-t border-obsidian-700 my-1"></div>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-obsidian-700 flex items-center gap-2"
                        onclick={() => {
                          dispatch('delete', { id: candidate.candidate_id || '' });
                          openMenuId = null;
                        }}
                      >
                        <Trash2 class="w-4 h-4" />
                        Remove Candidate
                      </button>
                    </div>
                  </div>
                {/if}
              </div>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
