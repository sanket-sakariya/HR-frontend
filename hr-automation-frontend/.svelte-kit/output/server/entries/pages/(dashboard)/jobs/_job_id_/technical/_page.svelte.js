import { d as store_get, u as unsubscribe_stores, m as head, e as ensure_array_like, f as attr_class, n as stringify } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { u as useJobRequirement } from "../../../../../../chunks/jobs.js";
import { d as useTechnicalInterviews, h as useTechnicalInterviewStatistics, i as useSelectTopTechnicalCandidates } from "../../../../../../chunks/interviews.js";
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
import { C as Code } from "../../../../../../chunks/code.js";
import { T as Trophy } from "../../../../../../chunks/trophy.js";
import { U as Users } from "../../../../../../chunks/users.js";
import { P as Play } from "../../../../../../chunks/play.js";
import { C as Circle_check_big } from "../../../../../../chunks/circle-check-big.js";
import { T as Trending_up } from "../../../../../../chunks/trending-up.js";
import { V as Video } from "../../../../../../chunks/video.js";
import { C as Circle_x } from "../../../../../../chunks/circle-x.js";
import { E as Eye } from "../../../../../../chunks/eye.js";
import { C as Clock } from "../../../../../../chunks/clock.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const jobId = store_get($$store_subs ??= {}, "$page", page).params.job_id;
    const jobQuery = useJobRequirement(jobId);
    const interviewsQuery = useTechnicalInterviews(jobId);
    const statisticsQuery = useTechnicalInterviewStatistics(jobId);
    const candidatesQuery = useCandidates({ job_requirement_id: jobId });
    const selectTopMutation = useSelectTopTechnicalCandidates();
    const job = store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data;
    const interviews = store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).data || [];
    store_get($$store_subs ??= {}, "$statisticsQuery", statisticsQuery).data;
    let topN = 5;
    const eligibleCandidates = (() => {
      const candidates = store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data || [];
      return candidates.filter((c) => c.aptitude_test_result === "pass" || c.status === "aptitude_passed" || c.status === "technical_eligible");
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
      const passed = interviews.filter((i) => i.interview_status === "passed" || i.technical_test_result === "pass").length;
      const inProgress = interviews.filter((i) => i.interview_status === "in_progress" || i.status === "in_progress").length;
      const completedWithScore = interviews.filter((i) => (i.interview_status === "completed" || i.status === "completed") && (i.overall_score !== void 0 || i.score !== void 0));
      const avgScore = completedWithScore.length > 0 ? Math.round(completedWithScore.reduce((acc, i) => acc + (i.overall_score || i.score || 0), 0) / completedWithScore.length) : 0;
      return { total, completed, passed, inProgress, avgScore };
    })();
    async function handleSelectTop() {
      try {
        await store_get($$store_subs ??= {}, "$selectTopMutation", selectTopMutation).mutateAsync({ jobId, topN });
        toast.success(`Top ${topN} candidates selected for HR interview`);
        store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).refetch();
      } catch (error) {
        toast.error("Failed to select candidates", { description: error.message });
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1slut3l", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Technical Interviews - ${escape_html(job?.title || "Job")} | HR Automation</title>`);
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
      $$renderer3.push(`<!----> <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"><div><div class="flex items-center gap-3 mb-2"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">`);
      Code($$renderer3, { class: "w-5 h-5 text-white" });
      $$renderer3.push(`<!----></div> <div><h1 class="text-2xl font-bold text-gray-900">Technical Interviews</h1> <p class="text-gray-500 text-sm">${escape_html(job?.title || "Loading...")}</p></div></div></div> `);
      if (stats.completed > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200">`);
        Trophy($$renderer3, { class: "w-5 h-5 text-amber-600" });
        $$renderer3.push(`<!----> <span class="text-sm text-amber-700">Select top performers:</span> `);
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
            $$renderer4.push(`<!---->Select Top ${escape_html(topN)}`);
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
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.passed)}</p> <p class="text-xs text-gray-500">Passed</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----> `);
      Card($$renderer3, {
        class: "p-4",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">`);
          Trending_up($$renderer4, { class: "w-5 h-5 text-purple-600" });
          $$renderer4.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.avgScore)}%</p> <p class="text-xs text-gray-500">Avg Score</p></div></div>`);
        }
      });
      $$renderer3.push(`<!----></div> `);
      if (store_get($$store_subs ??= {}, "$interviewsQuery", interviewsQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-4"><!--[-->`);
        const each_array = ensure_array_like(Array(3));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          Skeleton($$renderer3, { class: "h-24" });
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
              Video($$renderer4, { class: "w-8 h-8 text-gray-400" });
              $$renderer4.push(`<!----></div> <h3 class="text-lg font-medium text-gray-700 mb-2">No technical interviews yet</h3> <p class="text-gray-500 mb-6 max-w-md mx-auto">Technical interviews will appear here when candidates who passed the aptitude test complete their interviews.</p> `);
              if (eligibleCandidates.length > 0) {
                $$renderer4.push("<!--[-->");
                $$renderer4.push(`<p class="text-sm text-purple-600">${escape_html(eligibleCandidates.length)} candidate(s) eligible for technical interview</p>`);
              } else {
                $$renderer4.push("<!--[!-->");
              }
              $$renderer4.push(`<!--]-->`);
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
          Card($$renderer3, {
            class: "overflow-hidden",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="overflow-x-auto"><table class="w-full"><thead><tr class="border-b border-gray-200 bg-gray-50"><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th><th class="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th><th class="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody class="divide-y divide-gray-200"><!--[-->`);
              const each_array_1 = ensure_array_like(interviews);
              for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                let interview = each_array_1[$$index_1];
                const interviewStatus = interview.interview_status || interview.status || "pending";
                const status = statusConfig[interviewStatus] || statusConfig.pending;
                const score = interview.overall_score ?? interview.score;
                const result = interview.technical_test_result || (score !== void 0 && score >= 60 ? "pass" : score !== void 0 ? "fail" : null);
                $$renderer4.push(`<tr class="hover:bg-gray-50 transition-colors"><td class="py-4 px-4"><div><p class="font-medium text-gray-900">${escape_html(interview.candidate_name || "Unknown")}</p> <p class="text-sm text-gray-500">${escape_html(interview.candidate_email || "")}</p></div></td><td class="py-4 px-4">`);
                StatusBadge($$renderer4, { status: status.label, variant: status.variant });
                $$renderer4.push(`<!----></td><td class="py-4 px-4 text-gray-600 text-sm">${escape_html(interview.scheduled_at || interview.created_at ? formatDate(interview.scheduled_at || interview.created_at) : "-")}</td><td class="py-4 px-4 text-gray-600 text-sm">`);
                if (interview.duration || interview.time_taken_seconds) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`${escape_html(interview.duration || Math.round((interview.time_taken_seconds || 0) / 60))} min`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push(`-`);
                }
                $$renderer4.push(`<!--]--></td><td class="py-4 px-4">`);
                if (score !== void 0) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<span${attr_class(`font-semibold ${stringify(score >= 70 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-600")}`)}>${escape_html(Math.round(score))}%</span>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push(`<span class="text-gray-400">-</span>`);
                }
                $$renderer4.push(`<!--]--></td><td class="py-4 px-4">`);
                if (result === "pass") {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium">`);
                  Circle_check_big($$renderer4, { class: "w-3 h-3" });
                  $$renderer4.push(`<!----> Passed</span>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                  if (result === "fail") {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">`);
                    Circle_x($$renderer4, { class: "w-3 h-3" });
                    $$renderer4.push(`<!----> Failed</span>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                    $$renderer4.push(`<span class="text-gray-400">-</span>`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]--></td><td class="py-4 px-4 text-right">`);
                if (interviewStatus === "completed" || score !== void 0) {
                  $$renderer4.push("<!--[-->");
                  Button($$renderer4, {
                    variant: "ghost",
                    size: "sm",
                    onclick: () => goto(`/interview/technical/${interview.session_id || interview.technical_interview_id}/results`),
                    children: ($$renderer5) => {
                      Eye($$renderer5, { class: "w-4 h-4 mr-1" });
                      $$renderer5.push(`<!----> View`);
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
                $$renderer4.push(`<!--]--></td></tr>`);
              }
              $$renderer4.push(`<!--]--></tbody></table></div>`);
            }
          });
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
