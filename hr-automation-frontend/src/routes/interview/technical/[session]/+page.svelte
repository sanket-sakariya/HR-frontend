<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount, onDestroy } from 'svelte';
  import { interviewStore, type TranscriptEntry } from '$lib/stores/interview.svelte';
  import { mediaStore } from '$lib/stores/media.svelte';
  import VideoPreview from '$lib/components/interview/VideoPreview.svelte';
  import TranscriptPanel from '$lib/components/interview/TranscriptPanel.svelte';
  import ControlBar from '$lib/components/interview/ControlBar.svelte';
  import InterviewTimer from '$lib/components/interview/InterviewTimer.svelte';
  import SystemCheck from '$lib/components/interview/SystemCheck.svelte';
  import ConfirmDialog from '$lib/components/shared/ConfirmDialog.svelte';
  import { toast } from 'svelte-sonner';
  import { Code, Wifi, WifiOff } from 'lucide-svelte';

  const sessionId = $derived($page.params.session);
  
  let interviewState = $state<'checking' | 'ready' | 'active' | 'ended'>('checking');
  let showTranscript = $state(true);
  let showEndDialog = $state(false);
  let duration = $state(0);
  let durationInterval: ReturnType<typeof setInterval>;

  // System check states
  let cameraReady = $state(false);
  let micReady = $state(false);
  let networkReady = $state(false);

  // Mock transcript entries
  let transcriptEntries = $state<TranscriptEntry[]>([]);

  onMount(async () => {
    // Initialize media
    try {
      await mediaStore.initializeMedia();
      cameraReady = !!mediaStore.videoStream;
      micReady = !!mediaStore.audioStream;
    } catch (error) {
      console.error('Failed to initialize media:', error);
    }

    // Check network
    networkReady = navigator.onLine;
    window.addEventListener('online', () => networkReady = true);
    window.addEventListener('offline', () => networkReady = false);
  });

  onDestroy(() => {
    if (durationInterval) clearInterval(durationInterval);
    mediaStore.cleanup();
    interviewStore.disconnect();
  });

  async function startInterview() {
    interviewState = 'ready';
    
    // Connect to WebSocket
    const wsUrl = `ws://localhost:8100/ws/technical/${sessionId}`;
    
    try {
      // For demo, we'll simulate connection
      interviewStore.connect(wsUrl);
      interviewState = 'active';
      
      // Start timer
      durationInterval = setInterval(() => {
        duration++;
      }, 1000);

      // Add initial AI message
      setTimeout(() => {
        addTranscriptEntry('ai', 'Hello! Welcome to your technical interview. I\'m your AI interviewer today. Let\'s start with a brief introduction. Could you please tell me about yourself and your experience?');
      }, 2000);
    } catch (error) {
      toast.error('Failed to connect to interview server');
      interviewState = 'checking';
    }
  }

  function addTranscriptEntry(speaker: 'ai' | 'user', text: string) {
    transcriptEntries = [...transcriptEntries, {
      speaker,
      text,
      timestamp: Date.now()
    }];
  }

  function handleEndCall() {
    showEndDialog = true;
  }

  function confirmEndCall() {
    if (durationInterval) clearInterval(durationInterval);
    interviewStore.disconnect();
    mediaStore.cleanup();
    interviewState = 'ended';
    showEndDialog = false;
    
    // Redirect to results after delay
    setTimeout(() => {
      goto(`/interview/technical/${sessionId}/results`);
    }, 2000);
  }

  function retrySystemCheck() {
    cameraReady = false;
    micReady = false;
    networkReady = false;
    
    setTimeout(async () => {
      try {
        await mediaStore.initializeMedia();
        cameraReady = !!mediaStore.videoStream;
        micReady = !!mediaStore.audioStream;
      } catch (error) {
        console.error('Retry failed:', error);
      }
      networkReady = navigator.onLine;
    }, 1000);
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  // Mock user speech detection
  $effect(() => {
    if (interviewState === 'active' && mediaStore.audioLevel > 30) {
      // Simulate user speaking
    }
  });
</script>

<svelte:head>
  <title>Technical Interview | HR Automation</title>
</svelte:head>

<div class="fixed inset-0 bg-obsidian-950">
  {#if interviewState === 'checking'}
    <!-- System Check -->
    <div class="h-full flex items-center justify-center p-4">
      <SystemCheck
        {cameraReady}
        {micReady}
        {networkReady}
        onStart={startInterview}
        onRetry={retrySystemCheck}
      />
    </div>
  {:else if interviewState === 'ended'}
    <!-- Ended State -->
    <div class="h-full flex flex-col items-center justify-center text-center p-4">
      <div class="w-20 h-20 rounded-full bg-emerald-900/50 flex items-center justify-center mb-6">
        <Code class="w-10 h-10 text-emerald-400" />
      </div>
      <h1 class="text-2xl font-bold text-obsidian-100 mb-2">Interview Completed</h1>
      <p class="text-obsidian-400 mb-4">
        Your technical interview has been recorded and is being analyzed.
      </p>
      <p class="text-sm text-obsidian-500">Redirecting to results...</p>
    </div>
  {:else}
    <!-- Active Interview -->
    <div class="h-full flex flex-col">
      <!-- Header -->
      <header class="flex items-center justify-between px-6 py-4 bg-obsidian-900/80 border-b border-obsidian-800">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <Code class="w-5 h-5 text-royal-400" />
            <h1 class="font-semibold text-obsidian-100">Technical Interview</h1>
          </div>
          
          <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800">
            {#if networkReady}
              <Wifi class="w-4 h-4 text-emerald-500" />
              <span class="text-sm text-emerald-500">Connected</span>
            {:else}
              <WifiOff class="w-4 h-4 text-red-500" />
              <span class="text-sm text-red-500">Disconnected</span>
            {/if}
          </div>
        </div>

        <InterviewTimer {duration} maxDuration={3600} />
      </header>

      <!-- Main Content -->
      <div class="flex-1 flex overflow-hidden">
        <!-- Video Area -->
        <div class="flex-1 relative p-4">
          <!-- AI Video (Main) -->
          <div class="h-full rounded-xl overflow-hidden bg-gradient-to-br from-royal-900 to-obsidian-900 flex items-center justify-center">
            <div class="text-center">
              <div class="w-32 h-32 rounded-full bg-royal-800/50 flex items-center justify-center mx-auto mb-4">
                <Code class="w-16 h-16 text-royal-400" />
              </div>
              <h2 class="text-xl font-semibold text-obsidian-100">AI Interviewer</h2>
              <p class="text-obsidian-400 text-sm">Technical Assessment</p>
            </div>
          </div>

          <!-- User Video (PiP) -->
          <div class="absolute bottom-8 right-8 w-64 aspect-video rounded-lg overflow-hidden shadow-xl border-2 border-obsidian-700">
            <VideoPreview
              stream={mediaStore.videoStream}
              muted={true}
              label="You"
              class="w-full h-full"
            />
          </div>

          <!-- Control Bar -->
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ControlBar
              isMicOn={!mediaStore.isMuted}
              isCameraOn={mediaStore.isCameraOn}
              isConnected={networkReady}
              audioLevel={mediaStore.audioLevel}
              {showTranscript}
              on:toggleMic={() => mediaStore.toggleMute()}
              on:toggleCamera={() => mediaStore.toggleCamera()}
              on:toggleTranscript={() => showTranscript = !showTranscript}
              on:endCall={handleEndCall}
              on:fullscreen={toggleFullscreen}
              on:settings={() => toast.info('Settings coming soon')}
            />
          </div>
        </div>

        <!-- Transcript Sidebar -->
        {#if showTranscript}
          <aside class="w-96 border-l border-obsidian-800 bg-obsidian-900">
            <TranscriptPanel entries={transcriptEntries} class="h-full" />
          </aside>
        {/if}
      </div>
    </div>
  {/if}
</div>

<!-- End Call Confirmation -->
<ConfirmDialog
  open={showEndDialog}
  title="End Interview?"
  description="Are you sure you want to end the technical interview? Your progress will be saved and submitted for review."
  confirmText="End Interview"
  cancelText="Continue"
  variant="destructive"
  onconfirm={confirmEndCall}
  oncancel={() => showEndDialog = false}
/>
