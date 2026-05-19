import { c as sanitize_props, j as spread_props, s as slot, d as store_get, u as unsubscribe_stores, m as head } from "../../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../../../../chunks/exports.js";
import "../../../../../../../chunks/utils.js";
import { Y as escape_html } from "../../../../../../../chunks/context.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../../../../../../chunks/state.svelte.js";
import { b as useAptitudeTestQuestions, c as useValidateAptitudeLogin } from "../../../../../../../chunks/aptitude.js";
import { C as Card } from "../../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../../chunks/Button.js";
import { I as Input } from "../../../../../../../chunks/Input.js";
import { L as Label } from "../../../../../../../chunks/Label.js";
import "../../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { B as Brain } from "../../../../../../../chunks/brain.js";
import { C as Clock } from "../../../../../../../chunks/clock.js";
import { F as File_question } from "../../../../../../../chunks/file-question.js";
import { I as Icon } from "../../../../../../../chunks/Icon.js";
import { W as Wifi } from "../../../../../../../chunks/wifi.js";
import { L as Lock } from "../../../../../../../chunks/lock.js";
import { M as Mail } from "../../../../../../../chunks/mail.js";
function Book_open($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 7v14" }],
    [
      "path",
      {
        "d": "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "book-open" },
    $$sanitized_props,
    {
      /**
       * @component @name BookOpen
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgN3YxNCIgLz4KICA8cGF0aCBkPSJNMyAxOGExIDEgMCAwIDEtMS0xVjRhMSAxIDAgMCAxIDEtMWg1YTQgNCAwIDAgMSA0IDQgNCA0IDAgMCAxIDQtNGg1YTEgMSAwIDAgMSAxIDF2MTNhMSAxIDAgMCAxLTEgMWgtNmEzIDMgMCAwIDAtMyAzIDMgMyAwIDAgMC0zLTN6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/book-open
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Shield_check($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "shield-check" },
    $$sanitized_props,
    {
      /**
       * @component @name ShieldCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgMTNjMCA1LTMuNSA3LjUtNy42NiA4Ljk1YTEgMSAwIDAgMS0uNjctLjAxQzcuNSAyMC41IDQgMTggNCAxM1Y2YTEgMSAwIDAgMSAxLTFjMiAwIDQuNS0xLjIgNi4yNC0yLjcyYTEuMTcgMS4xNyAwIDAgMSAxLjUyIDBDMTQuNTEgMy44MSAxNyA1IDE5IDVhMSAxIDAgMCAxIDEgMXoiIC8+CiAgPHBhdGggZD0ibTkgMTIgMiAyIDQtNCIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/shield-check
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Timer($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["line", { "x1": "10", "x2": "14", "y1": "2", "y2": "2" }],
    ["line", { "x1": "12", "x2": "15", "y1": "14", "y2": "11" }],
    ["circle", { "cx": "12", "cy": "14", "r": "8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "timer" },
    $$sanitized_props,
    {
      /**
       * @component @name Timer
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMTAiIHgyPSIxNCIgeTE9IjIiIHkyPSIyIiAvPgogIDxsaW5lIHgxPSIxMiIgeDI9IjE1IiB5MT0iMTQiIHkyPSIxMSIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjE0IiByPSI4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/timer
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const jobId = store_get($$store_subs ??= {}, "$page", page).params.job_id;
    store_get($$store_subs ??= {}, "$page", page).params.test_id;
    const testQuery = useAptitudeTestQuestions(jobId);
    useValidateAptitudeLogin();
    let email = "";
    let password = "";
    const testDetails = store_get($$store_subs ??= {}, "$testQuery", testQuery).data?.data?.test_details;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("ep162q", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Start Aptitude Test | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300"><header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10"><div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">`);
      Brain($$renderer3, { class: "w-5 h-5 text-white" });
      $$renderer3.push(`<!----></div> <div><h1 class="font-semibold text-gray-800">HR Automation</h1> <p class="text-xs text-gray-500">Aptitude Assessment</p></div></div></header> <main class="max-w-4xl mx-auto px-4 py-8"><div class="grid lg:grid-cols-2 gap-8 items-start"><div class="space-y-6"><div><span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">`);
      Brain($$renderer3, { class: "w-4 h-4" });
      $$renderer3.push(`<!----> Aptitude Assessment</span> <h1 class="text-3xl font-bold text-gray-800 mb-3">${escape_html(testDetails?.test_title || "Candidate Assessment Test")}</h1> <p class="text-gray-600 text-lg">Complete this assessment to demonstrate your skills and move forward in the hiring process.</p></div> `);
      if (store_get($$store_subs ??= {}, "$testQuery", testQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="grid grid-cols-2 gap-4">`);
        Card($$renderer3, {
          class: "p-4 animate-pulse",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="h-16 bg-gray-100 rounded"></div>`);
          }
        });
        $$renderer3.push(`<!----> `);
        Card($$renderer3, {
          class: "p-4 animate-pulse",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="h-16 bg-gray-100 rounded"></div>`);
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (testDetails) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="grid grid-cols-2 gap-4">`);
          Card($$renderer3, {
            class: "p-4",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">`);
              Clock($$renderer4, { class: "w-5 h-5 text-purple-600" });
              $$renderer4.push(`<!----></div> <div><p class="text-xs text-gray-500 uppercase tracking-wide">Duration</p> <p class="text-lg font-bold text-gray-800">${escape_html(testDetails.total_time_minutes || 45)} min</p></div></div>`);
            }
          });
          $$renderer3.push(`<!----> `);
          Card($$renderer3, {
            class: "p-4",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">`);
              File_question($$renderer4, { class: "w-5 h-5 text-purple-600" });
              $$renderer4.push(`<!----></div> <div><p class="text-xs text-gray-500 uppercase tracking-wide">Questions</p> <p class="text-lg font-bold text-gray-800">${escape_html(testDetails.total_questions || 30)}</p></div></div>`);
            }
          });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> `);
      Card($$renderer3, {
        class: "p-6",
        children: ($$renderer4) => {
          $$renderer4.push(`<h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
          Book_open($$renderer4, { class: "w-5 h-5 text-purple-600" });
          $$renderer4.push(`<!----> Before You Begin</h3> <div class="space-y-3"><div class="flex items-start gap-3"><div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">`);
          Wifi($$renderer4, { class: "w-3.5 h-3.5 text-emerald-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-sm font-medium text-gray-700">Stable Internet Connection</p> <p class="text-xs text-gray-500">Ensure you have reliable connectivity throughout the test</p></div></div> <div class="flex items-start gap-3"><div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">`);
          Timer($$renderer4, { class: "w-3.5 h-3.5 text-amber-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-sm font-medium text-gray-700">Time Limit</p> <p class="text-xs text-gray-500">The test has a strict time limit and cannot be paused</p></div></div> <div class="flex items-start gap-3"><div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">`);
          Shield_check($$renderer4, { class: "w-3.5 h-3.5 text-purple-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-sm font-medium text-gray-700">Monitored Session</p> <p class="text-xs text-gray-500">Tab switching and navigation will be recorded</p></div></div></div>`);
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Card($$renderer3, {
        class: "p-6 lg:p-8",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="text-center mb-6"><div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-purple-md">`);
          Lock($$renderer4, { class: "w-7 h-7 text-white" });
          $$renderer4.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800">Candidate Login</h2> <p class="text-sm text-gray-500 mt-1">Enter your credentials to start the assessment</p></div> `);
          {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]--> <form class="space-y-5"><div>`);
          Label($$renderer4, {
            for: "email",
            class: "text-gray-700",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Email Address`);
            }
          });
          $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
          Mail($$renderer4, {
            class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "email",
            type: "email",
            placeholder: "your.email@example.com",
            class: "pl-10",
            required: true,
            get value() {
              return email;
            },
            set value($$value) {
              email = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div></div> <div>`);
          Label($$renderer4, {
            for: "password",
            class: "text-gray-700",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->Password`);
            }
          });
          $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
          Lock($$renderer4, {
            class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          });
          $$renderer4.push(`<!----> `);
          Input($$renderer4, {
            id: "password",
            type: "password",
            placeholder: "Enter your password",
            class: "pl-10",
            required: true,
            get value() {
              return password;
            },
            set value($$value) {
              password = $$value;
              $$settled = false;
            }
          });
          $$renderer4.push(`<!----></div> <p class="text-xs text-gray-500 mt-2">Use the password from your application confirmation email</p></div> `);
          Button($$renderer4, {
            type: "submit",
            class: "w-full",
            size: "lg",
            disabled: store_get($$store_subs ??= {}, "$testQuery", testQuery).isLoading,
            children: ($$renderer5) => {
              {
                $$renderer5.push("<!--[!-->");
                Brain($$renderer5, { class: "w-5 h-5" });
                $$renderer5.push(`<!----> Start Assessment`);
              }
              $$renderer5.push(`<!--]-->`);
            }
          });
          $$renderer4.push(`<!----></form> <div class="mt-6 pt-6 border-t border-gray-100 text-center"><p class="text-xs text-gray-400">By starting the test, you agree to complete it honestly and independently.</p></div>`);
        }
      });
      $$renderer3.push(`<!----></div></div></main> <footer class="mt-auto py-6 text-center"><p class="text-xs text-gray-400">Powered by HR Automation Platform</p></footer></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
