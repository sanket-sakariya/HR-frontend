<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { STATUS_COLORS } from '$lib/constants/theme';
  import { formatStatus } from '$lib/utils/format';

  interface Props {
    status: string;
    size?: 'sm' | 'md';
    class?: string;
  }

  let { status, size = 'md', class: className = '' }: Props = $props();

  const colors = STATUS_COLORS[status] || STATUS_COLORS.draft;
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs'
  };
</script>

<span
  class={cn(
    'inline-flex items-center rounded-full font-medium border',
    colors.bg,
    colors.text,
    colors.border,
    sizes[size],
    className
  )}
>
  {formatStatus(status)}
</span>
