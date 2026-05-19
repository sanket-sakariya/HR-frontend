import { c as sanitize_props, j as spread_props, s as slot, d as store_get, u as unsubscribe_stores, m as head, e as ensure_array_like, f as attr_class, n as stringify } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { u as useJobRequirement } from "../../../../../../chunks/jobs.js";
import { e as useHRInterviews, f as useHRInterviewStatistics, g as useSelectTopHRCandidates } from "../../../../../../chunks/interviews.js";
import { u as useCandidates } from "../../../../../../chunks/candidates.js";
import { C as Card } from "../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { I as Input } from "../../../../../../chunks/Input.js";
import { S as StatusBadge, b as formatDate } from "../../../../../../chunks/StatusBadge.js";
import { S as Skeleton } from "../../../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { Y as escape_html } from "../../../../../../chunks/context.js";
import "clsx";
import { A as Arrow_left } from "../../../../../../chunks/arrow-left.js";
import { H as Handshake } from "../../../../../../chunks/handshake.js";
import { S as Star } from "../../../../../../chunks/star.js";
import { U as Users } from "../../../../../../chunks/users.js";
import { P as Play } from "../../../../../../chunks/play.js";
import { C as Circle_check_big } from "../../../../../../chunks/circle-check-big.js";
import { T as Trophy } from "../../../../../../chunks/trophy.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { U as User_check } from "../../../../../../chunks/user-check.js";
import { C as Circle_x } from "../../../../../../chunks/circle-x.js";
import { C as Calendar } from "../../../../../../chunks/calendar.js";
import { C as Clock } from "../../../../../../chunks/clock.js";
import { E as Eye } from "../../../../../../chunks/eye.js";
function Heart($$renderer, $$props) {
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
        "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "heart" },
    $$sanitized_props,
    {
      /**
       * @component @name Heart
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMTRjMS40OS0xLjQ2IDMtMy4yMSAzLTUuNUE1LjUgNS41IDAgMCAwIDE2LjUgM2MtMS43NiAwLTMgLjUtNC41IDItMS41LTEuNS0yLjc0LTItNC41LTJBNS41IDUuNSAwIDAgMCAyIDguNWMwIDIuMyAxLjUgNC4wNSAzIDUuNWw3IDdaIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/heart
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
    const jobQuery = useJobRequirement(jobId);
    const interviewsQuery = useHRInterviews(jobId);
    const statisticsQuery = useHRInterviewStatistics(jobId);
    const candidatesQuery = useCandidates({ job_requirement_id: jobId });
    const selectTopMutation = useSelectTopHRCandidates();
    const job = store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data;
    const interviews = store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).data || [];
    store_get($$store_subs ??= {}, "$statisticsQuery", statisticsQuery).data;
    let topN = 5;
    const eligibleCandidates = (() => {
      const candidates = store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data || [];
      return candidates.filter((c) => c.technical_test_result === "pass" || c.status === "technical_passed" || c.status === "hr_eligible");
    })();
    const statusConfig = {
      pending: { label: "Pending", variant: "default" },
      scheduled: { label: "Scheduled", variant: "info" },
      in_progress: { label: "In Progress", variant: "warning" },
      completed: { label: "Completed", variant: "success" },
      passed: { label: "Passed", variant: "success" },
      failed: { label: "Failed", variant: "error" },
      cancelled: { label: "Cancelled", variant: "error" }
    };
    const stats = (() => {
      const total = interviews.length;
      const completed = interviews.filter((i) => i.interview_status === "completed" || i.status === "completed").length;
      const passed = interviews.filter((i) => i.interview_status === "passed" || i.hr_interview_result === "pass").length;
      const inProgress = interviews.filter((i) => i.interview_status === "in_progress" || i.status === "in_progress").length;
      const completedWithScore = interviews.filter((i) => (i.interview_status === "completed" || i.status === "completed") && (i.overall_score !== void 0 || i.score !== void 0 || i.cultural_fit !== void 0));
      const avgCulturalFit = completedWithScore.length > 0 ? Math.round(completedWithScore.reduce((acc, i) => acc + (i.cultural_fit || i.overall_score || i.score || 0), 0) / completedWithScore.length) : 0;
      return { total, completed, passed, inProgress, avgCulturalFit };
    })();
    async function handleSelectTop() {
      try {
        await store_get($$store_subs ??= {}, "$selectTopMutation", selectTopMutation).mutateAsync({ jobId, topN });
        toast.success(`Top ${topN} candidates recommended for hire`);
        store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).refetch();
      } catch (error) {
        toast.error("Failed to select candidates", { description: error.message });
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("gpdeqi", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>HR Interviews - ${escape_html(job?.title || "Job")} | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6">`);
      Button($$renderer3, {
        variant: "ghost",
        onclick: () => goto(),
        class: "!px-0",
        children: ($$renderer4) => {
          Arrow_left($$renderer4, { class: "w-4 h-4 mr-2" });
          $$renderer4.push(`<!----> Back to Job`);
        }
      });
      $$renderer3.push(`<!----> <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"><div><div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">`);
      Handshake($$renderer3, { class: "w-5 h-5 text-white" });
      $$renderer3.push(`<!----></div> <div><h1 class="text-2xl font-bold text-gray-900">HR Interviews</h1> <p class="text-gray-500 text-sm">${escape_html(job?.title || "Loading...")}</p></div></div></div> `);
      if (stats.completed > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex items-center gap-2 p-3 rounded-xl bg-purple-50 border border-purple-200">`);
        Star($$renderer3, { class: "w-5 h-5 text-purple-600" });
        $$renderer3.push(`<!----> <span class="text-sm text-purple-700">Recommend for hire:</span> `);
        Input($$renderer3, {
          type: "number",
          class: "w-16 h-8",
          get value() {
            return topN;
          },
          set value($$value) {
            topN = $$value;
            $$settled = false;
          }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          size: "sm",
          onclick: handleSelectTop,
          loading: store_get($$store_subs ??= {}, "$selectTopMutation", selectTopMutation).isPending,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->Recommend Top ${escape_html(topN)}`);
          }
        });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">`);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">`);
          Users($$renderer4, { class: "w-5 h-5 text-purple-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.total)}</p> <p class="text-xs text-gray-500">Total</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">`);
          Play($$renderer4, { class: "w-5 h-5 text-amber-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.inProgress)}</p> <p class="text-xs text-gray-500">In Progress</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">`);
          Circle_check_big($$renderer4, { class: "w-5 h-5 text-blue-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.completed)}</p> <p class="text-xs text-gray-500">Completed</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">`);
          Trophy($$renderer4, { class: "w-5 h-5 text-emerald-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.passed)}</p> <p class="text-xs text-gray-500">Recommended</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">`);
          Heart($$renderer4, { class: "w-5 h-5 text-pink-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.avgCulturalFit)}%</p> <p class="text-xs text-gray-500">Avg Cultural Fit</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----></div> `);
      if (store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-4"><!--[-->`);
        const each_array = ensure_array_like(Array(3));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          Skeleton($$renderer3, { class: "h-32" });
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (interviews.length === 0) {
          $$renderer3.push("<!--[-->");
          Card($$renderer3, {
            class: "p-12 text-center",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">`);
              User_check($$renderer4, { class: "w-8 h-8 text-gray-400" });
              $$renderer4.push(`<!----></div> <h3 class="text-lg font-medium text-gray-700 mb-2">No HR interviews yet</h3> <p class="text-gray-500 mb-6 max-w-md mx-auto">HR interviews will appear here when candidates who passed the technical interview complete their HR round.</p> `);
              if (eligibleCandidates.length > 0) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-sm text-purple-600">${escape_html(eligibleCandidates.length)} candidate(s) eligible for HR interview</p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="space-y-4"><!--[-->`);
          const each_array_1 = ensure_array_like(interviews);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let interview = each_array_1[$$index_1];
            const interviewStatus = interview.interview_status || interview.status || "pending";
            const status = statusConfig[interviewStatus] || statusConfig.pending;
            const score = interview.overall_score ?? interview.score;
            const culturalFit = interview.cultural_fit;
            const communication = interview.communication;
            const result = interview.hr_interview_result || (score !== void 0 && score >= 60 ? "pass" : score !== void 0 ? "fail" : null);
            Card($$renderer3, {
              class: "p-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"><div class="flex items-start gap-4"><div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0"><span class="text-lg font-semibold text-white">${escape_html(interview.candidate_name?.charAt(0).toUpperCase() || "C")}</span></div> <div class="flex-1"><div class="flex flex-wrap items-center gap-3 mb-1"><h3 class="font-semibold text-gray-900">${escape_html(interview.candidate_name || "Unknown")}</h3> `);
                StatusBadge($$renderer4, { status: status.label, variant: status.variant });
                $$renderer4.push(`<!----> `);
                if (result === "pass") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">`);
                  Star($$renderer4, { class: "w-3 h-3" });
                  $$renderer4.push(`<!----> Recommended</span>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (result === "fail") {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">`);
                    Circle_x($$renderer4, { class: "w-3 h-3" });
                    $$renderer4.push(`<!----> Not Recommended</span>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]--></div> <p class="text-sm text-gray-500 mb-3">${escape_html(interview.candidate_email || "")}</p> <div class="flex flex-wrap gap-4 text-sm text-gray-500"><span class="flex items-center gap-1">`);
                Calendar($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> ${escape_html(interview.scheduled_at || interview.created_at ? formatDate(interview.scheduled_at || interview.created_at) : "-")}</span> `);
                if (interview.duration || interview.time_taken_seconds) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<span class="flex items-center gap-1">`);
                  Clock($$renderer4, { class: "w-4 h-4" });
                  $$renderer4.push(`<!----> ${escape_html(interview.duration || Math.round((interview.time_taken_seconds || 0) / 60))} min</span>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div> `);
                if (interviewStatus === "completed" || score !== void 0) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="mt-4 flex flex-wrap gap-6"><div><p class="text-xs text-gray-400 mb-1">Overall Score</p> <p${attr_class(`text-lg font-bold ${stringify((score || 0) >= 70 ? "text-emerald-600" : (score || 0) >= 50 ? "text-amber-600" : "text-red-600")}`)}>${escape_html(score !== void 0 ? `${Math.round(score)}%` : "-")}</p></div> `);
                  if (culturalFit !== void 0) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div><p class="text-xs text-gray-400 mb-1">Cultural Fit</p> <p class="text-lg font-bold text-purple-600">${escape_html(Math.round(culturalFit))}%</p></div>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--> `);
                  if (communication !== void 0) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div><p class="text-xs text-gray-400 mb-1">Communication</p> <p class="text-lg font-bold text-blue-600">${escape_html(Math.round(communication))}%</p></div>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div></div> <div class="flex items-center gap-2 flex-shrink-0">`);
                if (interviewStatus === "completed" || score !== void 0) {
                  $$renderer4.push("<!--[-->");
                  Button($$renderer4, {
                    variant: "outline",
                    size: "sm",
                    onclick: () => goto(`/interview/hr/${interview.session_id || interview.hr_interview_id}/results`),
                    children: ($$renderer5) => {
                      Eye($$renderer5, { class: "w-4 h-4 mr-1" });
                      $$renderer5.push(`<!----> View Report`);
                    }
                  });
                } else {
                  $$renderer4.push("<!--[!-->");
                  Button($$renderer4, {
                    variant: "ghost",
                    size: "sm",
                    disabled: true,
                    children: ($$renderer5) => {
                      Clock($$renderer5, { class: "w-4 h-4 mr-1" });
                      $$renderer5.push(`<!----> Pending`);
                    }
                  });
                }
                $$renderer4.push(`<!--]--></div></div>`);
              }
            });
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--></div>`);
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
