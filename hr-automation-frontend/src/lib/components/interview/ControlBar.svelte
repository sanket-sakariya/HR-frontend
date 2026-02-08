<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import Button from '$lib/components/ui/Button.svelte';
  import AudioVisualizer from './AudioVisualizer.svelte';
  import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    Phone,
    PhoneOff,
    Settings,
    Maximize,
    MessageSquare
  } from 'lucide-svelte';

  interface Props {
    isMicOn: boolean;
    isCameraOn: boolean;
    isConnected: boolean;
    audioLevel?: number;
    showTranscript?: boolean;
    class?: string;
  }

  let {
    isMicOn,
    isCameraOn,
    isConnected,
    audioLevel = 0,
    showTranscript = true,
    class: className
  }: Props = $props();

  const dispatch = createEventDispatcher<{
    toggleMic: void;
    toggleCamera: void;
    toggleTranscript: void;
    endCall: void;
    fullscreen: void;
    settings: void;
  }>();
</script>

<div class={cn(
  'flex items-center justify-center gap-4 p-4 bg-obsidian-900/90 backdrop-blur-sm rounded-full',
  className
)}>
  <!-- Audio Level Indicator -->
  {#if isMicOn}
    <AudioVisualizer level={audioLevel} class="mr-2" />
  {/if}

  <!-- Mic Toggle -->
  <button
    class={cn(
      'w-12 h-12 rounded-full flex items-center justify-center transition-all',
      isMicOn 
        ? 'bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600' 
        : 'bg-red-600 text-white hover:bg-red-700'
    )}
    onclick={() => dispatch('toggleMic')}
    aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
  >
    {#if isMicOn}
      <Mic class="w-5 h-5" />
    {:else}
      <MicOff class="w-5 h-5" />
    {/if}
  </button>

  <!-- Camera Toggle -->
  <button
    class={cn(
      'w-12 h-12 rounded-full flex items-center justify-center transition-all',
      isCameraOn 
        ? 'bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600' 
        : 'bg-red-600 text-white hover:bg-red-700'
    )}
    onclick={() => dispatch('toggleCamera')}
    aria-label={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
  >
    {#if isCameraOn}
      <Video class="w-5 h-5" />
    {:else}
      <VideoOff class="w-5 h-5" />
    {/if}
  </button>

  <!-- End Call -->
  <button
    class="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 transition-all"
    onclick={() => dispatch('endCall')}
    aria-label="End call"
  >
    <PhoneOff class="w-6 h-6" />
  </button>

  <!-- Transcript Toggle -->
  <button
    class={cn(
      'w-12 h-12 rounded-full flex items-center justify-center transition-all',
      showTranscript 
        ? 'bg-royal-600 text-white hover:bg-royal-700' 
        : 'bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600'
    )}
    onclick={() => dispatch('toggleTranscript')}
    aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
  >
    <MessageSquare class="w-5 h-5" />
  </button>

  <!-- Fullscreen -->
  <button
    class="w-12 h-12 rounded-full flex items-center justify-center bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600 transition-all"
    onclick={() => dispatch('fullscreen')}
    aria-label="Toggle fullscreen"
  >
    <Maximize class="w-5 h-5" />
  </button>

  <!-- Settings -->
  <button
    class="w-12 h-12 rounded-full flex items-center justify-center bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600 transition-all"
    onclick={() => dispatch('settings')}
    aria-label="Settings"
  >
    <Settings class="w-5 h-5" />
  </button>
</div>
