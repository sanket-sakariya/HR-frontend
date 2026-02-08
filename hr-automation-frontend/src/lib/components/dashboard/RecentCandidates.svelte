<script lang="ts">
  import { useCandidates } from '$lib/api/queries/candidates';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import ScoreGauge from '$lib/components/shared/ScoreGauge.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { formatRelativeTime } from '$lib/utils/format';

  interface Props {
    companyId: string;
  }

  let { companyId }: Props = $props();

  const candidatesQuery = useCandidates({ limit: 5 });
</script>

<div class="space-y-3">
  {#if $candidatesQuery.isLoading}
    {#each Array(3) as _}
      <div class="flex items-center gap-4 p-4 rounded-lg bg-obsidian-800/50">
        <Skeleton class="w-10 h-10 rounded-full" />
        <div class="flex-1">
          <Skeleton class="h-4 w-32 mb-2" />
          <Skeleton class="h-3 w-48" />
        </div>
      </div>
    {/each}
  {:else if $candidatesQuery.data?.data?.length === 0}
    <div class="text-center py-8">
      <p class="text-slate-400">No candidates yet</p>
      <p class="text-sm text-slate-500 mt-1">
        Candidates will appear here once they apply to your jobs
      </p>
    </div>
  {:else}
    {#each ($candidatesQuery.data?.data || []).slice(0, 5) as candidate (candidate.candidate_id)}
      <a
        href="/candidates/{candidate.candidate_id}"
        class="flex items-center gap-4 p-4 rounded-lg bg-obsidian-800/50 hover:bg-obsidian-800 border border-slate-800/50 hover:border-slate-700 transition-all"
      >
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center flex-shrink-0">
          <span class="text-white font-semibold">
            {candidate.first_name?.[0]}{candidate.last_name?.[0]}
          </span>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h4 class="font-medium text-slate-200 truncate">
              {candidate.first_name} {candidate.last_name}
            </h4>
            <StatusBadge status={candidate.status} size="sm" />
          </div>
          <p class="text-sm text-slate-500 truncate">
            {candidate.email}
          </p>
        </div>

        <!-- Score -->
        {#if candidate.resume_score}
          <ScoreGauge score={candidate.resume_score} size="sm" />
        {/if}
      </a>
    {/each}

    {#if ($candidatesQuery.data?.pagination?.total_count || 0) > 5}
      <a
        href="/candidates"
        class="block text-center py-3 text-sm text-royal-400 hover:text-royal-300 font-medium"
      >
        View all candidates →
      </a>
    {/if}
  {/if}
</div>
