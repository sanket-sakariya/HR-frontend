import { d as store_get, m as head, u as unsubscribe_stores, a as attr } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { b as useCandidate } from "../../../../../../chunks/candidates.js";
import { b as useStartTechnicalInterview } from "../../../../../../chunks/interviews.js";
import { f as fetchWithAuth, A as API_URLS } from "../../../../../../chunks/client2.js";
import { C as Card } from "../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { S as Skeleton } from "../../../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { C as Code } from "../../../../../../chunks/code.js";
import { A as Arrow_left } from "../../../../../../chunks/arrow-left.js";
import { P as Plus } from "../../../../../../chunks/plus.js";
import { L as Loader_circle } from "../../../../../../chunks/loader-circle.js";
import { C as Copy } from "../../../../../../chunks/copy.js";
import { E as External_link } from "../../../../../../chunks/external-link.js";
import { M as Mail } from "../../../../../../chunks/mail.js";
import { K as Key_round } from "../../../../../../chunks/key-round.js";
import { R as Refresh_cw } from "../../../../../../chunks/refresh-cw.js";
import { Y as escape_html } from "../../../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const candidateId = store_get($$store_subs ??= {}, "$page", page).params.candidate_id;
    const candidateQuery = useCandidate(candidateId);
    const startMutation = useStartTechnicalInterview();
    const candidate = store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).data;
    let sessionInfo = null;
    const fullInterviewUrl = (() => {
      if (!sessionInfo?.interview_url) return null;
      return /^https?:\/\//i.test(sessionInfo.interview_url) ? sessionInfo.interview_url : `http://localhost:8100${sessionInfo.interview_url}`;
    })();
    const eligible = candidate?.aptitude_test_result === "pass" && !(candidate?.technical_test === true && candidate?.technical_test_result);
    let generating = false;
    async function generateLink() {
      if (!candidate) return;
      if (candidate.aptitude_test_result !== "pass") {
        toast.error("Candidate must pass the aptitude test first.");
        return;
      }
      if (candidate.technical_test && candidate.technical_test_result) {
        toast.error(`Candidate already completed technical interview (result: ${candidate.technical_test_result}). Use "Reset & Regenerate" first.`);
        return;
      }
      generating = true;
      try {
        const res = await store_get($$store_subs ??= {}, "$startMutation", startMutation).mutateAsync({
          candidateId: candidate.candidate_id,
          jobRequirementId: candidate.job_requirement_id
        });
        const data = res?.data ?? {};
        const info = {
          interview_url: data.interview_url,
          session_id: data.interview_session_id,
          technical_interview_id: data.technical_interview_id
        };
        sessionInfo = info;
        localStorage.setItem(`tech_iv_${candidateId}`, JSON.stringify(info));
        toast.success("Interview link generated — share it with the candidate.");
      } catch (err) {
        toast.error("Failed to generate link", { description: err?.message ?? String(err) });
      } finally {
        generating = false;
      }
    }
    let regenerating = false;
    async function resetAndRegenerate() {
      if (!candidate) return;
      const confirmed = window.confirm("This will delete the previous technical interview and create a fresh session. Continue?");
      if (!confirmed) return;
      regenerating = true;
      try {
        const r = await fetchWithAuth(`${API_URLS.main}/technical-interview/reset/${candidate.candidate_id}`, { method: "POST" });
        const rb = await r.json().catch(() => ({}));
        if (!r.ok || rb?.success === false) {
          throw new Error(rb?.detail || rb?.message || `HTTP ${r.status}`);
        }
        sessionInfo = null;
        localStorage.removeItem(`tech_iv_${candidateId}`);
        await store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).refetch?.();
        await generateLink();
      } catch (err) {
        toast.error("Failed to regenerate", { description: err?.message ?? String(err) });
      } finally {
        regenerating = false;
      }
    }
    function copyUrl() {
      if (!fullInterviewUrl) return;
      navigator.clipboard.writeText(fullInterviewUrl);
      toast.success("Interview URL copied to clipboard");
    }
    head("v647dr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Schedule Technical Interview | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6">`);
    Button($$renderer2, {
      variant: "ghost",
      href: `/candidates/${candidateId}`,
      class: "!px-0",
      children: ($$renderer3) => {
        Arrow_left($$renderer3, { class: "w-4 h-4 mr-2" });
        $$renderer3.push(`<!----> Back to Candidate`);
      }
    });
    $$renderer2.push(`<!----> <div class="flex items-start justify-between"><div><div class="flex items-center gap-3 mb-2">`);
    Code($$renderer2, { class: "w-6 h-6 text-amber-500" });
    $$renderer2.push(`<!----> <h1 class="text-2xl font-bold text-gray-900">Schedule Technical Interview</h1></div> <p class="text-gray-500">Generate a unique interview link for <span class="font-medium text-gray-700">${escape_html(candidate ? `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() : "…")}</span> and share it with the candidate.</p></div></div> `);
    if (store_get($$store_subs ??= {}, "$candidateQuery", candidateQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      Skeleton($$renderer2, { class: "h-64" });
    } else {
      $$renderer2.push("<!--[!-->");
      if (!candidate) {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          class: "p-8 text-center text-gray-500",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Candidate not found.`);
          }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (candidate.aptitude_test_result !== "pass") {
          $$renderer2.push("<!--[-->");
          Card($$renderer2, {
            class: "p-8 text-center",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-3">`);
              Code($$renderer3, { class: "w-7 h-7 text-amber-600" });
              $$renderer3.push(`<!----></div> <h3 class="text-lg font-medium text-gray-800 mb-2">Not eligible yet</h3> <p class="text-gray-500 mb-4">Candidate must pass the aptitude test before a technical interview can be scheduled.</p> <p class="text-sm text-gray-400">Current aptitude result: <span class="font-medium">${escape_html(candidate.aptitude_test_result || "not taken")}</span></p>`);
            }
          });
        } else {
          $$renderer2.push("<!--[!-->");
          if (!sessionInfo) {
            $$renderer2.push("<!--[-->");
            Card($$renderer2, {
              class: "p-12 text-center",
              children: ($$renderer3) => {
                Code($$renderer3, { class: "w-16 h-16 mx-auto text-gray-400 mb-4" });
                $$renderer3.push(`<!----> <h3 class="text-lg font-medium text-gray-700 mb-2">No interview link yet</h3> <p class="text-gray-500 mb-6 max-w-md mx-auto">Generate a one-click interview link. The candidate logs in with their email and password,
        and the AI interviewer starts automatically.</p> `);
                Button($$renderer3, {
                  onclick: generateLink,
                  disabled: generating || !eligible,
                  children: ($$renderer4) => {
                    if (generating) {
                      $$renderer4.push("<!--[-->");
                      Loader_circle($$renderer4, { class: "w-4 h-4 mr-2 animate-spin" });
                      $$renderer4.push(`<!----> Generating Link...`);
                    } else {
                      $$renderer4.push("<!--[!-->");
                      Plus($$renderer4, { class: "w-4 h-4 mr-2" });
                      $$renderer4.push(`<!----> Generate Interview Link`);
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
                $$renderer3.push(`<div class="flex items-start gap-4"><div class="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">`);
                Code($$renderer3, { class: "w-7 h-7 text-amber-600" });
                $$renderer3.push(`<!----></div> <div class="flex-1"><div class="flex items-center gap-3 mb-2"><h3 class="text-xl font-semibold text-gray-900">Technical Interview Ready</h3> <span class="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">Active</span></div> <p class="text-sm text-gray-500">Active session for <span class="font-medium text-gray-700">${escape_html(candidate ? `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() : "candidate")}</span></p></div></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h4 class="font-medium text-gray-900 mb-1">Share Interview Link</h4> <p class="text-sm text-gray-500 mb-4">Send this URL to the candidate. They log in with their email and password to start.</p> <div><label class="text-xs text-gray-400 mb-1 block">Candidate Interview URL</label> <div class="flex items-center gap-2"><div class="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 font-mono text-sm text-gray-600 truncate">${escape_html(fullInterviewUrl)}</div> `);
                Button($$renderer3, {
                  variant: "outline",
                  onclick: copyUrl,
                  title: "Copy URL",
                  children: ($$renderer4) => {
                    Copy($$renderer4, { class: "w-4 h-4" });
                  }
                });
                $$renderer3.push(`<!----> <a${attr("href", fullInterviewUrl)} target="_blank" rel="noopener" title="Open in new tab" class="inline-flex items-center justify-center gap-2 font-medium rounded-xl px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all no-underline">`);
                External_link($$renderer3, { class: "w-4 h-4" });
                $$renderer3.push(`<!----> Open</a></div></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h4 class="font-medium text-gray-900 mb-3">Candidate Login Credentials</h4> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">`);
                Mail($$renderer3, { class: "w-5 h-5 text-gray-400" });
                $$renderer3.push(`<!----> <div class="min-w-0"><p class="text-xs text-gray-400">Email</p> <p class="font-mono text-sm text-gray-800 truncate">${escape_html(candidate.email)}</p></div></div> <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">`);
                Key_round($$renderer3, { class: "w-5 h-5 text-gray-400" });
                $$renderer3.push(`<!----> <div class="min-w-0"><p class="text-xs text-gray-400">Password</p> <p class="font-mono text-sm text-gray-800 truncate">${escape_html(candidate.password ?? "—")}</p></div></div></div>`);
              }
            });
            $$renderer2.push(`<!----> `);
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<h4 class="font-medium text-gray-900 mb-4">How It Works</h4> <ol class="space-y-3 text-sm text-gray-500"><li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">1</span> <span>Copy the <strong class="text-gray-700">Candidate Interview URL</strong> and share it with the candidate.</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">2</span> <span>Candidate opens the URL and logs in using their <strong class="text-gray-700">email + password</strong> shown above.</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">3</span> <span>The AI interviewer starts the live audio interview (5–15 minutes).</span></li> <li class="flex items-start gap-3"><span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-medium">4</span> <span>Score and detailed AI feedback appear on the candidate's profile automatically.</span></li></ol>`);
              }
            });
            $$renderer2.push(`<!----> <div class="flex gap-3">`);
            Button($$renderer2, {
              variant: "outline",
              onclick: resetAndRegenerate,
              disabled: regenerating || generating,
              children: ($$renderer3) => {
                if (regenerating) {
                  $$renderer3.push("<!--[-->");
                  Loader_circle($$renderer3, { class: "w-4 h-4 mr-2 animate-spin" });
                  $$renderer3.push(`<!----> Regenerating...`);
                } else {
                  $$renderer3.push("<!--[!-->");
                  Refresh_cw($$renderer3, { class: "w-4 h-4 mr-2" });
                  $$renderer3.push(`<!----> Reset &amp; Regenerate Link`);
                }
                $$renderer3.push(`<!--]-->`);
              }
            });
            $$renderer2.push(`<!----></div></div>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
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
