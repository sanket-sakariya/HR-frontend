import { d as store_get, m as head, u as unsubscribe_stores } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import { g as goto } from "../../../../../chunks/client.js";
import { o as onDestroy } from "../../../../../chunks/index-server.js";
import { S as SystemCheck, m as mediaStore, i as interviewStore, W as Wifi_off, I as InterviewTimer, V as VideoPreview, C as ControlBar, T as TranscriptPanel } from "../../../../../chunks/SystemCheck.js";
import { C as ConfirmDialog } from "../../../../../chunks/ConfirmDialog.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "clsx";
import { H as Handshake } from "../../../../../chunks/handshake.js";
import { W as Wifi } from "../../../../../chunks/wifi.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const sessionId = store_get($$store_subs ??= {}, "$page", page).params.session;
    let interviewState = "checking";
    let showTranscript = true;
    let showEndDialog = false;
    let duration = 0;
    let durationInterval;
    let cameraReady = false;
    let micReady = false;
    let networkReady = false;
    let transcriptEntries = [];
    onDestroy(() => {
      if (durationInterval) clearInterval(durationInterval);
      mediaStore.cleanup();
      interviewStore.disconnect();
    });
    async function startInterview() {
      interviewState = "ready";
      const wsUrl = `ws://localhost:8200/ws/hr/${sessionId}`;
      try {
        interviewStore.connect(wsUrl);
        interviewState = "active";
        durationInterval = setInterval(
          () => {
            duration++;
          },
          1e3
        );
        setTimeout(
          () => {
            addTranscriptEntry("ai", "Hello! Welcome to your HR interview. I'm here to learn more about you as a person and understand your career aspirations. Let's have a friendly conversation. To start, could you tell me what attracted you to this role?");
          },
          2e3
        );
      } catch (error) {
        toast.error("Failed to connect to interview server");
        interviewState = "checking";
      }
    }
    function addTranscriptEntry(speaker, text) {
      transcriptEntries = [
        ...transcriptEntries,
        { speaker, text, timestamp: Date.now() }
      ];
    }
    function confirmEndCall() {
      if (durationInterval) clearInterval(durationInterval);
      interviewStore.disconnect();
      mediaStore.cleanup();
      interviewState = "ended";
      showEndDialog = false;
      setTimeout(
        () => {
          goto();
        },
        2e3
      );
    }
    function retrySystemCheck() {
      cameraReady = false;
      micReady = false;
      networkReady = false;
      setTimeout(
        async () => {
          try {
            await mediaStore.initializeMedia();
            cameraReady = !!mediaStore.videoStream;
            micReady = !!mediaStore.audioStream;
          } catch (error) {
            console.error("Retry failed:", error);
          }
          networkReady = navigator.onLine;
        },
        1e3
      );
    }
    head("148ycto", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>HR Interview | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="fixed inset-0 bg-obsidian-950">`);
    if (interviewState === "checking") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="h-full flex items-center justify-center p-4">`);
      SystemCheck($$renderer2, {
        cameraReady,
        micReady,
        networkReady,
        onStart: startInterview,
        onRetry: retrySystemCheck
      });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (interviewState === "ended") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="h-full flex flex-col items-center justify-center text-center p-4"><div class="w-20 h-20 rounded-full bg-purple-900/50 flex items-center justify-center mb-6">`);
        Handshake($$renderer2, { class: "w-10 h-10 text-purple-400" });
        $$renderer2.push(`<!----></div> <h1 class="text-2xl font-bold text-obsidian-100 mb-2">Interview Completed</h1> <p class="text-obsidian-400 mb-4">Your HR interview has been recorded and is being analyzed.</p> <p class="text-sm text-obsidian-500">Redirecting to results...</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="h-full flex flex-col"><header class="flex items-center justify-between px-6 py-4 bg-obsidian-900/80 border-b border-obsidian-800"><div class="flex items-center gap-4"><div class="flex items-center gap-2">`);
        Handshake($$renderer2, { class: "w-5 h-5 text-purple-400" });
        $$renderer2.push(`<!----> <h1 class="font-semibold text-obsidian-100">HR Interview</h1></div> <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-800">`);
        if (networkReady) {
          $$renderer2.push("<!--[-->");
          Wifi($$renderer2, { class: "w-4 h-4 text-emerald-500" });
          $$renderer2.push(`<!----> <span class="text-sm text-emerald-500">Connected</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          Wifi_off($$renderer2, { class: "w-4 h-4 text-red-500" });
          $$renderer2.push(`<!----> <span class="text-sm text-red-500">Disconnected</span>`);
        }
        $$renderer2.push(`<!--]--></div></div> `);
        InterviewTimer($$renderer2, { duration, maxDuration: 2700 });
        $$renderer2.push(`<!----></header> <div class="flex-1 flex overflow-hidden"><div class="flex-1 relative p-4"><div class="h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-900 to-obsidian-900 flex items-center justify-center"><div class="text-center"><div class="w-32 h-32 rounded-full bg-purple-800/50 flex items-center justify-center mx-auto mb-4">`);
        Handshake($$renderer2, { class: "w-16 h-16 text-purple-400" });
        $$renderer2.push(`<!----></div> <h2 class="text-xl font-semibold text-obsidian-100">AI HR Interviewer</h2> <p class="text-obsidian-400 text-sm">Cultural &amp; Behavioral Assessment</p></div></div> <div class="absolute bottom-8 right-8 w-64 aspect-video rounded-lg overflow-hidden shadow-xl border-2 border-obsidian-700">`);
        VideoPreview($$renderer2, {
          stream: mediaStore.videoStream,
          muted: true,
          label: "You",
          class: "w-full h-full"
        });
        $$renderer2.push(`<!----></div> <div class="absolute bottom-8 left-1/2 -translate-x-1/2">`);
        ControlBar($$renderer2, {
          isMicOn: !mediaStore.isMuted,
          isCameraOn: mediaStore.isCameraOn,
          isConnected: networkReady,
          audioLevel: mediaStore.audioLevel,
          showTranscript
        });
        $$renderer2.push(`<!----></div></div> `);
        {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<aside class="w-96 border-l border-obsidian-800 bg-obsidian-900">`);
          TranscriptPanel($$renderer2, { entries: transcriptEntries, class: "h-full" });
          $$renderer2.push(`<!----></aside>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> `);
    ConfirmDialog($$renderer2, {
      open: showEndDialog,
      title: "End Interview?",
      description: "Are you sure you want to end the HR interview? Your progress will be saved and submitted for review.",
      confirmText: "End Interview",
      cancelText: "Continue",
      variant: "destructive",
      onconfirm: confirmEndCall,
      oncancel: () => showEndDialog = false
    });
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
