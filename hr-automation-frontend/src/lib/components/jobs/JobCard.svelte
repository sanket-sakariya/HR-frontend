<script lang="ts">
  import type { JobRequirement } from '$lib/api/generated';
  import StatusBadge from '$lib/components/shared/StatusBadge.svelte';
  import { formatDate, formatSalaryRange } from '$lib/utils/format';
  import { MapPin, Clock, Users, Briefcase } from 'lucide-svelte';

  interface Props {
    job: JobRequirement;
  }

  let { job }: Props = $props();
</script>

<a
  href="/jobs/{job.job_requirement_id}"
  class="block card-executive p-6 hover:border-slate-700 transition-all group"
>
  <div class="flex items-start justify-between gap-4 mb-4">
    <div>
      <h3 class="text-lg font-semibold text-slate-100 group-hover:text-royal-400 transition-colors">
        {job.title}
      </h3>
      <div class="flex items-center gap-3 mt-2 text-sm text-slate-400">
        {#if job.department}
          <span class="flex items-center gap-1.5">
            <Briefcase class="w-4 h-4" />
            {job.department}
          </span>
        {/if}
        {#if job.location}
          <span class="flex items-center gap-1.5">
            <MapPin class="w-4 h-4" />
            {job.location}
          </span>
        {/if}
        <span class="flex items-center gap-1.5">
          <Clock class="w-4 h-4" />
          {job.job_type || 'Full-time'}
        </span>
      </div>
    </div>
    <StatusBadge status={job.status} />
  </div>

  <p class="text-sm text-slate-400 line-clamp-2 mb-4">
    {job.description}
  </p>

  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4 text-sm">
      {#if job.salary_range}
        <span class="text-slate-300 font-medium">
          {formatSalaryRange(job.salary_range.min, job.salary_range.max)}
        </span>
      {/if}
      <span class="flex items-center gap-1.5 text-slate-400">
        <Users class="w-4 h-4" />
        {job.candidates_count || 0} candidates
      </span>
    </div>
    <span class="text-xs text-slate-500">
      Posted {formatDate(job.created_at)}
    </span>
  </div>

  {#if job.requirements && job.requirements.length > 0}
    <div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800">
      {#each job.requirements.slice(0, 5) as skill}
        <span class="px-2 py-1 rounded bg-obsidian-800 text-xs text-slate-400">
          {skill.skill}
        </span>
      {/each}
      {#if job.requirements.length > 5}
        <span class="px-2 py-1 rounded bg-obsidian-800 text-xs text-slate-500">
          +{job.requirements.length - 5} more
        </span>
      {/if}
    </div>
  {/if}
</a>
