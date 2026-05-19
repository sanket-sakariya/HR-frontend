import { d as store_get, m as head, u as unsubscribe_stores } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
import { C as Card } from "../../../../../../chunks/Card.js";
import { B as Brain } from "../../../../../../chunks/brain.js";
import { L as Loader_circle } from "../../../../../../chunks/loader-circle.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.job_id;
    store_get($$store_subs ??= {}, "$page", page).params.test_id;
    head("1t2ijaj", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aptitude Test | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex items-center justify-center">`);
    Card($$renderer2, {
      class: "p-8 text-center max-w-md",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-purple-md animate-pulse">`);
        Brain($$renderer3, { class: "w-8 h-8 text-white" });
        $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">Redirecting...</h2> <p class="text-gray-500 mb-6">Taking you to the test login page</p> <div class="flex items-center justify-center gap-2 text-purple-600">`);
        Loader_circle($$renderer3, { class: "w-5 h-5 animate-spin" });
        $$renderer3.push(`<!----> <span class="font-medium">Please wait</span></div>`);
      }
    });
    $$renderer2.push(`<!----></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
