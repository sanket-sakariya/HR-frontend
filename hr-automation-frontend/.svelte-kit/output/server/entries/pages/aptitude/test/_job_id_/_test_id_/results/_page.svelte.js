import { d as store_get, m as head, u as unsubscribe_stores } from "../../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../../chunks/stores.js";
import { C as Card } from "../../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../../chunks/Button.js";
import { B as Brain } from "../../../../../../../chunks/brain.js";
import { C as Circle_x } from "../../../../../../../chunks/circle-x.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.job_id;
    store_get($$store_subs ??= {}, "$page", page).params.test_id;
    head("fy2g78", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Test Results | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300"><header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60"><div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">`);
    Brain($$renderer2, { class: "w-5 h-5 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="font-semibold text-gray-800">HR Automation</h1> <p class="text-xs text-gray-500">Test Results</p></div></div></header> <main class="max-w-2xl mx-auto px-4 py-8">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="text-center py-12">`);
      Card($$renderer2, {
        class: "p-8 max-w-md mx-auto",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">`);
          Circle_x($$renderer3, { class: "w-8 h-8 text-gray-400" });
          $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">No Results Found</h2> <p class="text-gray-500 mb-6">We couldn't find your test results. This may happen if you accessed this page directly.</p> `);
          Button($$renderer3, {
            onclick: () => window.close(),
            variant: "outline",
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Close Window`);
            }
          });
          $$renderer3.push(`<!---->`);
        }
      });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></main></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
