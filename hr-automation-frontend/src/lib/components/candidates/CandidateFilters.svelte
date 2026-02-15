<script lang="ts">
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import { Search, Filter, X, SlidersHorizontal } from 'lucide-svelte';
  import { cn } from '$lib/utils/cn';

  interface Props {
    search: string;
    status: string;
    sortBy: string;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSortChange: (value: string) => void;
    onClear: () => void;
    class?: string;
  }

  let {
    search,
    status,
    sortBy,
    onSearchChange,
    onStatusChange,
    onSortChange,
    onClear,
    class: className
  }: Props = $props();

  let showFilters = $state(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'applied', label: 'Applied' },
    { value: 'screening', label: 'Screening' },
    { value: 'aptitude', label: 'Aptitude' },
    { value: 'technical', label: 'Technical' },
    { value: 'hr', label: 'HR Round' },
    { value: 'offered', label: 'Offered' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'score_high', label: 'Highest Score' },
    { value: 'score_low', label: 'Lowest Score' },
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' }
  ];

  const hasActiveFilters = $derived(search || status || sortBy !== 'newest');
</script>

<div class={cn('space-y-4', className)}>
  <!-- Search & Toggle -->
  <div class="flex items-center gap-3">
    <div class="relative flex-1 max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search candidates..."
        value={search}
        oninput={(e) => onSearchChange(e.currentTarget.value)}
        class="pl-10"
      />
    </div>

    <Button
      variant={showFilters ? 'secondary' : 'outline'}
      size="sm"
      onclick={() => showFilters = !showFilters}
    >
      <SlidersHorizontal class="w-4 h-4 mr-2" />
      Filters
      {#if hasActiveFilters}
        <span class="ml-2 w-2 h-2 rounded-full bg-royal-500"></span>
      {/if}
    </Button>

    {#if hasActiveFilters}
      <Button
        variant="ghost"
        size="sm"
        onclick={onClear}
      >
        <X class="w-4 h-4 mr-1" />
        Clear
      </Button>
    {/if}
  </div>

  <!-- Filter Panel -->
  {#if showFilters}
    <div class="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-gray-500" />
        <span class="text-sm text-gray-500">Filter by:</span>
      </div>

      <div class="w-48">
        <Select
          value={status}
          options={statusOptions}
          placeholder="Status"
          onchange={(e) => onStatusChange(e.currentTarget.value)}
        />
      </div>

      <div class="w-48">
        <Select
          value={sortBy}
          options={sortOptions}
          placeholder="Sort by"
          onchange={(e) => onSortChange(e.currentTarget.value)}
        />
      </div>
    </div>
  {/if}
</div>
