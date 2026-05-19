import { d as store_get, m as head, u as unsubscribe_stores } from "../../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../../chunks/stores.js";
import { o as onDestroy } from "../../../../../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../../../../../chunks/exports.js";
import "../../../../../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../../../../chunks/state.svelte.js";
import { b as useAptitudeTestQuestions, d as useSubmitAptitudeTest } from "../../../../../../../chunks/aptitude.js";
import { C as Card } from "../../../../../../../chunks/Card.js";
import { a as toast } from "../../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { L as Loader_circle } from "../../../../../../../chunks/loader-circle.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const jobId = store_get($$store_subs ??= {}, "$page", page).params.job_id;
    store_get($$store_subs ??= {}, "$page", page).params.test_id;
    const testQuery = useAptitudeTestQuestions(jobId);
    useSubmitAptitudeTest();
    let currentQuestionIndex = 0;
    let answers = {};
    let tabSwitches = 0;
    store_get($$store_subs ??= {}, "$testQuery", testQuery).data?.data?.test_details;
    const questions = store_get($$store_subs ??= {}, "$testQuery", testQuery).data?.data?.questions || [];
    questions[currentQuestionIndex];
    questions.length;
    Object.keys(answers).length;
    function handleVisibilityChange() {
      if (document.hidden) {
        tabSwitches++;
        toast.warning("Tab switch detected", {
          description: `You have switched tabs ${tabSwitches} time(s). This is being recorded.`
        });
      }
    }
    function handleKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && ["c", "v", "a", "p", "f"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        toast.warning("Keyboard shortcuts are disabled during the test");
      }
    }
    function handleBeforeUnload(e) {
      e.preventDefault();
      e.returnValue = "";
    }
    onDestroy(() => {
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        document.removeEventListener("keydown", handleKeydown);
      }
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    });
    head("3miwtv", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aptitude Test | HR Automation</title>`);
      });
    });
    if (store_get($$store_subs ??= {}, "$testQuery", testQuery).isLoading || true) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex items-center justify-center">`);
      Card($$renderer2, {
        class: "p-8 text-center",
        children: ($$renderer3) => {
          Loader_circle($$renderer3, { class: "w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" });
          $$renderer3.push(`<!----> <p class="text-gray-600">Loading your test...</p>`);
        }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
