<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { Video, VideoOff, AlertCircle } from 'lucide-svelte';

  interface Props {
    stream: MediaStream | null;
    muted?: boolean;
    mirrored?: boolean;
    label?: string;
    class?: string;
  }

  let { stream, muted = false, mirrored = true, label, class: className }: Props = $props();
  let videoElement: HTMLVideoElement;

  $effect(() => {
    if (videoElement && stream) {
      videoElement.srcObject = stream;
    }
  });
</script>

<div class={cn(
  'relative bg-obsidian-900 rounded-lg overflow-hidden',
  className
)}>
  {#if stream}
    <video
      bind:this={videoElement}
      autoplay
      playsinline
      muted={muted}
      class={cn(
        'w-full h-full object-cover',
        mirrored && 'scale-x-[-1]'
      )}
    >
      <track kind="captions" />
    </video>
  {:else}
    <div class="absolute inset-0 flex flex-col items-center justify-center text-obsidian-500">
      <VideoOff class="w-12 h-12 mb-2" />
      <p class="text-sm">Camera not available</p>
    </div>
  {/if}

  {#if label}
    <div class="absolute bottom-3 left-3 px-2 py-1 bg-obsidian-900/80 rounded text-sm text-obsidian-200 backdrop-blur-sm">
      {label}
    </div>
  {/if}
</div>
