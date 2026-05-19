import { c as sanitize_props, j as spread_props, s as slot, d as store_get, m as head, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { a as useCreateAptitudeTest } from "../../../../chunks/aptitude.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { a as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { Y as escape_html } from "../../../../chunks/context.js";
import "clsx";
import { B as Brain } from "../../../../chunks/brain.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { F as File_question } from "../../../../chunks/file-question.js";
import { C as Clock } from "../../../../chunks/clock.js";
import { T as Target } from "../../../../chunks/target.js";
import { U as Users } from "../../../../chunks/users.js";
import { A as Arrow_right } from "../../../../chunks/arrow-right.js";
import { L as Loader_circle } from "../../../../chunks/loader-circle.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { C as Circle_check } from "../../../../chunks/circle-check.js";
import { E as External_link } from "../../../../chunks/external-link.js";
import { C as Copy } from "../../../../chunks/copy.js";
import { C as Circle_alert } from "../../../../chunks/circle-alert.js";
import { R as Refresh_cw } from "../../../../chunks/refresh-cw.js";
function Check($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon($$renderer, spread_props([
    { name: "check" },
    $$sanitized_props,
    {
      /**
       * @component @name Check
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/check
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
function Link_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M9 17H7A5 5 0 0 1 7 7h2" }],
    ["path", { "d": "M15 7h2a5 5 0 1 1 0 10h-2" }],
    ["line", { "x1": "8", "x2": "16", "y1": "12", "y2": "12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "link-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Link2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOSAxN0g3QTUgNSAwIDAgMSA3IDdoMiIgLz4KICA8cGF0aCBkPSJNMTUgN2gyYTUgNSAwIDEgMSAwIDEwaC0yIiAvPgogIDxsaW5lIHgxPSI4IiB4Mj0iMTYiIHkxPSIxMiIgeTI9IjEyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/link-2
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
    const createTestMutation = useCreateAptitudeTest();
    let testData = null;
    let isCreating = false;
    let copied = false;
    const frontendTestUrl = () => {
      if (!testData?.data?.aptitude_test_id || !jobId) return null;
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
      return `${baseUrl}/aptitude/test/${jobId}/${testData.data.aptitude_test_id}/start`;
    };
    testData?.data?.test_access_url || testData?.data?.public_url || testData?.data?.entry_url || testData?.data?.test_url || testData?.data?.url;
    async function createTest() {
      if (!jobId) return;
      isCreating = true;
      try {
        const result = await store_get($$store_subs ??= {}, "$createTestMutation", createTestMutation).mutateAsync(jobId);
        testData = result;
        if (result?.data?.already_exists) {
          toast.info("Aptitude test already exists for this job");
        } else {
          toast.success("Aptitude test created successfully");
        }
      } catch (error) {
        toast.error("Failed to create aptitude test", { description: error.message });
      } finally {
        isCreating = false;
      }
    }
    function copyLink() {
      const url = frontendTestUrl();
      if (url) {
        navigator.clipboard.writeText(url);
        copied = true;
        toast.success("Link copied to clipboard");
        setTimeout(() => copied = false, 2e3);
      }
    }
    function openTest() {
      const url = frontendTestUrl();
      if (url) {
        window.open(url, "_blank");
      }
    }
    head("q9rwqb", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Create Aptitude Test | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300 flex flex-col"><header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60"><div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">`);
    Brain($$renderer2, { class: "w-5 h-5 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="font-semibold text-gray-800">HR Automation</h1> <p class="text-xs text-gray-500">Aptitude Test Generator</p></div></div></header> <main class="flex-1 flex items-center justify-center p-4"><div class="max-w-2xl w-full">`);
    if (!testData && !isCreating) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center mb-8"><span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">`);
      Sparkles($$renderer2, { class: "w-4 h-4" });
      $$renderer2.push(`<!----> AI-Powered Assessment</span> <h1 class="text-3xl font-bold text-gray-800 mb-3">Create Aptitude Test</h1> <p class="text-gray-500 max-w-md mx-auto">Generate an intelligent aptitude test tailored to your job requirements</p></div> `);
      Card($$renderer2, {
        class: "p-8",
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="grid sm:grid-cols-2 gap-4 mb-8"><div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">`);
          File_question($$renderer3, { class: "w-5 h-5 text-purple-600" });
          $$renderer3.push(`<!----></div> <div><p class="font-medium text-gray-800">30 Questions</p> <p class="text-sm text-gray-500">AI-generated based on job role</p></div></div> <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">`);
          Clock($$renderer3, { class: "w-5 h-5 text-purple-600" });
          $$renderer3.push(`<!----></div> <div><p class="font-medium text-gray-800">45 Minutes</p> <p class="text-sm text-gray-500">Timed assessment</p></div></div> <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">`);
          Target($$renderer3, { class: "w-5 h-5 text-purple-600" });
          $$renderer3.push(`<!----></div> <div><p class="font-medium text-gray-800">Multiple Choice</p> <p class="text-sm text-gray-500">Easy to complete format</p></div></div> <div class="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">`);
          Users($$renderer3, { class: "w-5 h-5 text-purple-600" });
          $$renderer3.push(`<!----></div> <div><p class="font-medium text-gray-800">Auto Scoring</p> <p class="text-sm text-gray-500">Instant results &amp; ranking</p></div></div></div> `);
          Button($$renderer3, {
            class: "w-full",
            size: "lg",
            onclick: createTest,
            children: ($$renderer4) => {
              Sparkles($$renderer4, { class: "w-5 h-5" });
              $$renderer4.push(`<!----> Generate Aptitude Test `);
              Arrow_right($$renderer4, { class: "w-5 h-5" });
              $$renderer4.push(`<!---->`);
            }
          });
          $$renderer3.push(`<!---->`);
        }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (isCreating) {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          class: "p-8",
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="text-center"><div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-purple-md animate-pulse">`);
            Brain($$renderer3, { class: "w-10 h-10 text-white" });
            $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">Creating Your Test</h2> <p class="text-gray-500 mb-6">Our AI is generating questions tailored to your job requirements...</p> <div class="flex items-center justify-center gap-3 text-purple-600 mb-6">`);
            Loader_circle($$renderer3, { class: "w-5 h-5 animate-spin" });
            $$renderer3.push(`<!----> <span class="font-medium">This may take a moment</span></div> <div class="max-w-sm mx-auto space-y-3"><div class="flex items-center gap-3 text-sm"><div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">`);
            Check($$renderer3, { class: "w-3.5 h-3.5 text-emerald-600" });
            $$renderer3.push(`<!----></div> <span class="text-gray-600">Analyzing job requirements</span></div> <div class="flex items-center gap-3 text-sm"><div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center animate-pulse">`);
            Loader_circle($$renderer3, { class: "w-3.5 h-3.5 text-purple-600 animate-spin" });
            $$renderer3.push(`<!----></div> <span class="text-gray-600">Generating questions</span></div> <div class="flex items-center gap-3 text-sm text-gray-400"><div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center"><span class="w-2 h-2 rounded-full bg-gray-300"></span></div> <span>Creating test form</span></div></div></div>`);
          }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (testData?.data?.aptitude_test_id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-center mb-8"><div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">`);
          Circle_check($$renderer2, { class: "w-10 h-10 text-white" });
          $$renderer2.push(`<!----></div> <h1 class="text-3xl font-bold text-gray-800 mb-2">${escape_html(testData?.data?.test_title || "Test Created Successfully!")}</h1> <p class="text-gray-500">${escape_html(testData?.data?.already_exists ? "Test already exists. " : "")}
            Share the link below with candidates.</p></div> `);
          Card($$renderer2, {
            class: "p-6 mb-6",
            children: ($$renderer3) => {
              if (testData?.data?.total_questions) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<div class="grid grid-cols-2 gap-4 mb-6"><div class="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"><p class="text-2xl font-bold text-gray-800">${escape_html(testData.data.total_questions)}</p> <p class="text-sm text-gray-500">Questions</p></div> <div class="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"><p class="text-2xl font-bold text-gray-800">${escape_html(testData.data.passing_score ?? "—")}%</p> <p class="text-sm text-gray-500">Pass Mark</p></div></div>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--> <div class="space-y-3">`);
              Button($$renderer3, {
                class: "w-full",
                size: "lg",
                onclick: openTest,
                children: ($$renderer4) => {
                  External_link($$renderer4, { class: "w-5 h-5" });
                  $$renderer4.push(`<!----> Preview Test`);
                }
              });
              $$renderer3.push(`<!----> `);
              Button($$renderer3, {
                variant: "outline",
                class: "w-full",
                size: "lg",
                onclick: copyLink,
                children: ($$renderer4) => {
                  if (copied) {
                    $$renderer4.push("<!--[-->");
                    Check($$renderer4, { class: "w-5 h-5" });
                    $$renderer4.push(`<!----> Copied to Clipboard!`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                    Copy($$renderer4, { class: "w-5 h-5" });
                    $$renderer4.push(`<!----> Copy Candidate Link`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
              });
              $$renderer3.push(`<!----></div>`);
            }
          });
          $$renderer2.push(`<!----> `);
          Card($$renderer2, {
            class: "p-4 mb-6",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="flex items-center gap-3 mb-2">`);
              Link_2($$renderer3, { class: "w-4 h-4 text-gray-400" });
              $$renderer3.push(`<!----> <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Candidate Test URL</p></div> <p class="font-mono text-sm text-purple-600 break-all bg-purple-50 p-3 rounded-lg border border-purple-100">${escape_html(frontendTestUrl())}</p>`);
            }
          });
          $$renderer2.push(`<!----> `);
          Card($$renderer2, {
            class: "p-6 border-purple-200 bg-purple-50/50",
            children: ($$renderer3) => {
              $$renderer3.push(`<h3 class="font-semibold text-gray-800 mb-4 flex items-center gap-2">`);
              Target($$renderer3, { class: "w-5 h-5 text-purple-600" });
              $$renderer3.push(`<!----> Next Steps</h3> <ol class="space-y-3"><li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">1</span> <span class="text-gray-600 text-sm">Select top candidates from resume screening</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">2</span> <span class="text-gray-600 text-sm">Share the test link with selected candidates via email</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">3</span> <span class="text-gray-600 text-sm">Monitor test completions and review scores in dashboard</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-purple-700">4</span> <span class="text-gray-600 text-sm">Proceed with top performers to technical/HR interviews</span></li></ol>`);
            }
          });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
          Card($$renderer2, {
            class: "p-8",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="text-center"><div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-6">`);
              Circle_alert($$renderer3, { class: "w-8 h-8 text-red-500" });
              $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">Something Went Wrong</h2> <p class="text-gray-500 mb-6">We couldn't create the aptitude test. Please try again.</p> `);
              Button($$renderer3, {
                onclick: createTest,
                class: "w-full",
                children: ($$renderer4) => {
                  Refresh_cw($$renderer4, { class: "w-4 h-4" });
                  $$renderer4.push(`<!----> Try Again`);
                }
              });
              $$renderer3.push(`<!----></div>`);
            }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></main> <footer class="py-6 text-center"><p class="text-xs text-gray-400">Powered by HR Automation Platform</p></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
