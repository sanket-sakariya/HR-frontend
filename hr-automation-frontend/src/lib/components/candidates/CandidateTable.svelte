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
    resume_screened: { label: 'Resume Screened', variant: 'info' },
    aptitude_eligible: { label: 'Aptitude Eligible', variant: 'info' },
    aptitude_passed: { label: 'Aptitude Passed', variant: 'success' },
    aptitude_failed: { label: 'Aptitude Failed', variant: 'error' },
    technical_eligible: { label: 'Technical Eligible', variant: 'warning' },
    technical_passed: { label: 'Technical Passed', variant: 'success' },
    technical_failed: { label: 'Technical Failed', variant: 'error' },
    hr_eligible: { label: 'HR Eligible', variant: 'warning' },
    hr_passed: { label: 'HR Passed', variant: 'success' },
    hr_failed: { label: 'HR Failed', variant: 'error' },
    hire_recommended: { label: 'Hire Recommended', variant: 'success' },
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
      <tr class="border-b border-gray-200">
        <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Candidate
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Resume Score
        </th>
        <th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Applied
        </th>
        <th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      {#if loading}
        {#each Array(5) as _}
          <tr>
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                <div class="space-y-2">
                  <div class="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div class="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4 px-4">
              <div class="w-8 h-8 bg-gray-200 rounded animate-pulse ml-auto"></div>
            </td>
          </tr>
        {/each}
      {:else if candidates.length === 0}
        <tr>
          <td colspan="6" class="py-12 text-center text-gray-500">
            No candidates found
          </td>
        </tr>
      {:else}
        {#each candidates as candidate}
          {@const status = statusConfig[candidate.status || 'applied'] || statusConfig.applied}
          <tr class="hover:bg-gray-50 transition-colors">
            <td class="py-4 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center flex-shrink-0">
                  <span class="text-sm font-semibold text-white">
                    {(candidate.first_name || 'C').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{[candidate.first_name, candidate.last_name].filter(Boolean).join(' ') || 'Unknown'}</p>
                  <p class="text-sm text-gray-500">{candidate.email || ''}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-4">
              <p class="text-gray-700">{candidate.email || '-'}</p>
            </td>
            <td class="py-4 px-4">
              <StatusBadge status={status.label} variant={status.variant} />
            </td>
            <td class="py-4 px-4">
              {#if (candidate as any).candidate_resume_score !== undefined}
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-gradient-to-r from-royal-500 to-emerald-500 rounded-full"
                      style="width: {(candidate as any).candidate_resume_score}%"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-700">{(candidate as any).candidate_resume_score}%</span>
                </div>
              {:else}
                <span class="text-gray-400">-</span>
              {/if}
            </td>
            <td class="py-4 px-4 text-gray-600">
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
                  <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                    <div class="py-1">
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onclick={() => {
                          dispatch('view', { id: candidate.candidate_id || '' });
                          openMenuId = null;
                        }}
                      >
                        <Eye class="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onclick={() => {
                          dispatch('viewResume', { id: candidate.candidate_id || '' });
                          openMenuId = null;
                        }}
                      >
                        <FileText class="w-4 h-4" />
                        View Resume
                      </button>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onclick={() => {
                          dispatch('schedule', { id: candidate.candidate_id || '', type: 'technical' });
                          openMenuId = null;
                        }}
                      >
                        <Calendar class="w-4 h-4" />
                        Schedule Interview
                      </button>
                      <div class="border-t border-gray-200 my-1"></div>
                      <button
                        class="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-100 flex items-center gap-2"
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
