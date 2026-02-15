<script lang="ts">
  import type { JobRequirement } from '$lib/api/generated';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import { formatRelativeTime } from '$lib/utils/format';
  import { Users, ChevronRight } from 'lucide-svelte';

  interface Props {
    jobs: JobRequirement[];
  }

  let { jobs }: Props = $props();
</script>

<div class="space-y-3">
  {#if jobs.length === 0}
    <div class="text-center py-8">
      <p class="text-slate-400">No job requirements yet</p>
      <a href="/jobs/new" class="text-royal-400 hover:text-royal-300 text-sm font-medium">
        Create your first job
      </a>
    </div>
  {:else}
    {#each jobs.slice(0, 5) as job (job.job_requirement_id)}
      <a
        href="/jobs/{job.job_requirement_id}"
        class="flex items-center justify-between p-4 rounded-lg bg-gray-100 hover:bg-gray-100 border border-slate-800/50 hover:border-slate-700 transition-all group"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-1">
            <h4 class="font-medium text-gray-800 truncate">{job.title}</h4>
            <StatusBadge status={job.status} size="sm" />
          </div>
          <div class="flex items-center gap-4 text-sm text-slate-500">
            <span>{job.department || 'No department'}</span>
            <span>•</span>
            <span>{formatRelativeTime(job.created_at)}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5 text-slate-400">
            <Users class="w-4 h-4" />
            <span class="text-sm">{job.candidates_count || 0}</span>
          </div>
          <ChevronRight class="w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors" />
        </div>
      </a>
    {/each}

    {#if jobs.length > 5}
      <a
        href="/jobs"
        class="block text-center py-3 text-sm text-royal-400 hover:text-royal-300 font-medium"
      >
        View all {jobs.length} jobs →
      </a>
    {/if}
  {/if}
</div>
