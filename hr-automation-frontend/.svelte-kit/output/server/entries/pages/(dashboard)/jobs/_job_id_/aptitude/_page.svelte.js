import { d as store_get, m as head, u as unsubscribe_stores, n as stringify, a as attr } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
import { d as createJobQuery } from "../../../../../../chunks/jobs.js";
import { a as useCreateAptitudeTest } from "../../../../../../chunks/aptitude.js";
import { C as Card } from "../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { S as Skeleton } from "../../../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { B as Brain } from "../../../../../../chunks/brain.js";
import { A as Arrow_left } from "../../../../../../chunks/arrow-left.js";
import { L as Loader_circle } from "../../../../../../chunks/loader-circle.js";
import { P as Plus } from "../../../../../../chunks/plus.js";
import { C as Circle_check_big } from "../../../../../../chunks/circle-check-big.js";
import { C as Copy } from "../../../../../../chunks/copy.js";
import { E as External_link } from "../../../../../../chunks/external-link.js";
import { Y as escape_html } from "../../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const jobId = store_get($$store_subs ??= {}, "$page", page).params.job_id;
    const jobQuery = createJobQuery(jobId);
    const createMutation = useCreateAptitudeTest();
    const job = store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data;
    let createdTest = null;
    async function handleCreateTest() {
      try {
        const result = await store_get($$store_subs ??= {}, "$createMutation", createMutation).mutateAsync(jobId);
        const testData = result?.data;
        if (testData) {
          createdTest = testData;
          localStorage.setItem(`aptitude_test_${jobId}`, JSON.stringify(testData));
          if (testData.already_exists) {
            toast.info("Aptitude test already exists for this job");
          } else {
            toast.success("Aptitude test created successfully!");
          }
        }
      } catch (error) {
        toast.error("Failed to create aptitude test", { description: error.message });
      }
    }
    function copyPublicUrl() {
      if (createdTest?.public_url) {
        navigator.clipboard.writeText(createdTest.public_url);
        toast.success("Public URL copied to clipboard");
      }
    }
    function copyTestAccessUrl() {
      if (createdTest?.test_access_url) {
        navigator.clipboard.writeText(createdTest.test_access_url);
        toast.success("Test access URL copied to clipboard");
      }
    }
    function copyCandidateUrl() {
      const url = `${window.location.origin}/aptitude/${jobId}`;
      navigator.clipboard.writeText(url);
      toast.success("Candidate test URL copied to clipboard");
    }
    head("1ny3hly", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aptitude Test - ${escape_html(job?.title || "Job")} | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6">`);
    Button($$renderer2, {
      variant: "ghost",
      href: `/jobs/${stringify(jobId)}`,
      class: "!px-0",
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "w-4 h-4 mr-2" });
        $$renderer3.push(`<!----> Back to Job`);
      }
    });
    $$renderer2.push(`<!----> <div class="flex items-start justify-between"><div><div class="flex items-center gap-3 mb-2">`);
    Brain($$renderer2, { class: "w-6 h-6 text-royal-400" });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold text-gray-900">Aptitude Test</h1></div> <p class="text-gray-500">AI-generated aptitude test for ${escape_html(job?.title || "this job")}</p></div></div> `);
    if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      Skeleton($$renderer2, { class: "h-64" });
    } else {
      $$renderer2.push("<!--[!-->");
      if (!createdTest) {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          class: "p-12 text-center",
          children: ($$renderer3) => {
            Brain($$renderer3, { class: "w-16 h-16 mx-auto text-gray-400 mb-4" });
            $$renderer3.push(`<!----> <h3 class="text-lg font-medium text-gray-700 mb-2">No aptitude test yet</h3> <p class="text-gray-500 mb-6 max-w-md mx-auto">Create an AI-generated aptitude test with 30 questions tailored to the job requirements. 
        Candidates who pass the resume screening will be able to take this test.</p> `);
            Button($$renderer3, {
              onclick: handleCreateTest,
              disabled: store_get($$store_subs ??= {}, "$createMutation", createMutation).isPending,
              children: ($$renderer4) => {
                if (store_get($$store_subs ??= {}, "$createMutation", createMutation).isPending) {
                  $$renderer4.push("<!--[-->");
                  Loader_circle($$renderer4, { class: "w-4 h-4 mr-2 animate-spin" });
                  $$renderer4.push(`<!----> Generating Test...`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  Plus($$renderer4, { class: "w-4 h-4 mr-2" });
                  $$renderer4.push(`<!----> Generate Aptitude Test`);
                }
                $$renderer4.push(`<!--]-->`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-6">`);
        Card($$renderer2, {
          class: "p-6",
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="flex items-start gap-4"><div class="w-14 h-14 rounded-xl bg-royal-900/50 flex items-center justify-center flex-shrink-0">`);
            Brain($$renderer3, { class: "w-7 h-7 text-royal-400" });
            $$renderer3.push(`<!----></div> <div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="text-xl font-semibold text-gray-900">${escape_html(createdTest.test_title)}</h3> <span class="px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-medium">Active</span></div> <div class="flex flex-wrap gap-4 text-sm text-gray-500"><span class="flex items-center gap-1.5">`);
            Brain($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> ${escape_html(createdTest.total_questions)} Questions</span> <span class="flex items-center gap-1.5">`);
            Circle_check_big($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> AI Generated</span></div></div></div>`);
          }
        });
        $$renderer2.push(`<!----> `);
        Card($$renderer2, {
          class: "p-6",
          children: ($$renderer3) => {
            $$renderer3.push(`<h4 class="font-medium text-gray-900 mb-4">Share Test with Candidates</h4> <p class="text-sm text-gray-500 mb-4">Share this URL with aptitude-eligible candidates so they can take the test:</p> <div class="space-y-4"><div><label class="text-xs text-gray-400 mb-1 block">Candidate Test URL</label> <div class="flex items-center gap-2"><div class="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 font-mono text-sm text-gray-600 truncate">${escape_html(window.location.origin)}/aptitude/${escape_html(jobId)}</div> `);
            Button($$renderer3, {
              variant: "outline",
              onclick: copyCandidateUrl,
              title: "Copy URL",
              children: ($$renderer4) => {
                Copy($$renderer4, { class: "w-4 h-4" });
              }
            });
            $$renderer3.push(`<!----> <a${attr("href", `${window.location.origin}/aptitude/${jobId}`)} target="_blank" rel="noopener" title="Open in new tab" class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-purple-sm hover:shadow-purple-md transition-all no-underline">`);
            External_link($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> Open</a></div></div> <div><label class="text-xs text-gray-400 mb-1 block">API Public URL</label> <div class="flex items-center gap-2"><div class="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 font-mono text-sm text-gray-600 truncate">${escape_html(createdTest.public_url)}</div> `);
            Button($$renderer3, {
              variant: "outline",
              onclick: copyPublicUrl,
              title: "Copy URL",
              children: ($$renderer4) => {
                Copy($$renderer4, { class: "w-4 h-4" });
              }
            });
            $$renderer3.push(`<!----> <a${attr("href", createdTest.public_url)} target="_blank" rel="noopener" title="Open in new tab" class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2.5 bg-transparent hover:bg-purple-50 text-purple-600 border-2 border-purple-500 hover:border-purple-600 transition-all no-underline">`);
            External_link($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> Open</a></div></div> <div><label class="text-xs text-gray-400 mb-1 block">Direct Test Start URL</label> <div class="flex items-center gap-2"><div class="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 font-mono text-sm text-gray-600 truncate">${escape_html(createdTest.test_access_url)}</div> `);
            Button($$renderer3, {
              variant: "outline",
              onclick: copyTestAccessUrl,
              title: "Copy URL",
              children: ($$renderer4) => {
                Copy($$renderer4, { class: "w-4 h-4" });
              }
            });
            $$renderer3.push(`<!----> <a${attr("href", createdTest.test_access_url)} target="_blank" rel="noopener" title="Open in new tab" class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-purple-sm hover:shadow-purple-md transition-all no-underline">`);
            External_link($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> Open</a></div></div></div>`);
          }
        });
        $$renderer2.push(`<!----> `);
        Card($$renderer2, {
          class: "p-6",
          children: ($$renderer3) => {
            $$renderer3.push(`<h4 class="font-medium text-gray-900 mb-4">How It Works</h4> <ol class="space-y-3 text-sm text-gray-500"><li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span> <span>Share the <strong class="text-gray-600">Candidate Test URL</strong> with aptitude-eligible candidates</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span> <span>Candidates log in using their email and receive the test questions</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span> <span>After submission, results are automatically recorded and scored</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-royal-900/50 text-royal-400 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span> <span>Use <strong class="text-gray-600">Select Top Candidates</strong> to advance passing candidates to technical interviews</span></li></ol>`);
          }
        });
        $$renderer2.push(`<!----> <div class="flex gap-3">`);
        Button($$renderer2, {
          variant: "outline",
          onclick: handleCreateTest,
          disabled: store_get($$store_subs ??= {}, "$createMutation", createMutation).isPending,
          children: ($$renderer3) => {
            if (store_get($$store_subs ??= {}, "$createMutation", createMutation).isPending) {
              $$renderer3.push("<!--[-->");
              Loader_circle($$renderer3, { class: "w-4 h-4 mr-2 animate-spin" });
            } else {
              $$renderer3.push("<!--[!-->");
              Brain($$renderer3, { class: "w-4 h-4 mr-2" });
            }
            $$renderer3.push(`<!--]--> Regenerate Test`);
          }
        });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
