import { c as sanitize_props, j as spread_props, s as slot, d as store_get, m as head, e as ensure_array_like, u as unsubscribe_stores, f as attr_class, n as stringify } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { g as goto } from "../../../../../../chunks/client.js";
import { j as useHRInterviewBySession } from "../../../../../../chunks/interviews.js";
import { C as Card } from "../../../../../../chunks/Card.js";
import { B as Button } from "../../../../../../chunks/Button.js";
import { S as ScoreGauge } from "../../../../../../chunks/ScoreGauge.js";
import { S as Skeleton } from "../../../../../../chunks/Skeleton.js";
import { a as toast } from "../../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { Y as escape_html } from "../../../../../../chunks/context.js";
import "clsx";
import { H as Handshake } from "../../../../../../chunks/handshake.js";
import { D as Download } from "../../../../../../chunks/download.js";
import { T as Triangle_alert } from "../../../../../../chunks/triangle-alert.js";
import { C as Circle_check_big } from "../../../../../../chunks/circle-check-big.js";
import { C as Circle_x } from "../../../../../../chunks/circle-x.js";
import { C as Clock } from "../../../../../../chunks/clock.js";
import { M as Message_square } from "../../../../../../chunks/message-square.js";
import { A as Award } from "../../../../../../chunks/award.js";
import { T as Trending_up } from "../../../../../../chunks/trending-up.js";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { T as Target } from "../../../../../../chunks/target.js";
import { B as Brain } from "../../../../../../chunks/brain.js";
import { S as Sparkles } from "../../../../../../chunks/sparkles.js";
import { A as Arrow_left } from "../../../../../../chunks/arrow-left.js";
function Thumbs_up($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M7 10v12" }],
    [
      "path",
      {
        "d": "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "thumbs-up" },
    $$sanitized_props,
    {
      /**
       * @component @name ThumbsUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNyAxMHYxMiIgLz4KICA8cGF0aCBkPSJNMTUgNS44OCAxNCAxMGg1LjgzYTIgMiAwIDAgMSAxLjkyIDIuNTZsLTIuMzMgOEEyIDIgMCAwIDEgMTcuNSAyMkg0YTIgMiAwIDAgMS0yLTJ2LThhMiAyIDAgMCAxIDItMmgyLjc2YTIgMiAwIDAgMCAxLjc5LTEuMTFMMTIgMmEzLjEzIDMuMTMgMCAwIDEgMyAzLjg4WiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/thumbs-up
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
    const sessionId = store_get($$store_subs ??= {}, "$page", page).params.session;
    const interviewQuery = useHRInterviewBySession(sessionId);
    const interview = store_get($$store_subs ??= {}, "$interviewQuery", interviewQuery).data;
    const passed = interview?.result === "pass" || interview?.overall_score && interview.overall_score >= 60;
    const overallScore = interview?.overall_score || 0;
    const duration = interview?.interview_duration_seconds ? Math.round(interview.interview_duration_seconds / 60) : 0;
    const questionsAnswered = interview?.questions_answered || 0;
    const culturalFitScore = interview?.cultural_fit_score || 0;
    const communicationScore = interview?.communication_score || 0;
    const motivationScore = interview?.motivation_score || 0;
    const professionalismScore = interview?.professionalism_score || 0;
    const teamworkScore = interview?.teamwork_score || 0;
    const leadershipScore = interview?.leadership_score || 0;
    const strengths = interview?.candidate_strengths || [];
    const improvements = interview?.candidate_weaknesses || interview?.improvement_areas || [];
    interview?.candidate_info?.name || "Candidate";
    interview?.job_details?.title || "HR Interview";
    function downloadReport() {
      toast.info("Report download feature coming soon");
    }
    head("1nifi7", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>HR Interview Results | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300"><header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10"><div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">`);
    Handshake($$renderer2, { class: "w-5 h-5 text-white" });
    $$renderer2.push(`<!----></div> <div><h1 class="font-semibold text-gray-800">HR Interview</h1> <p class="text-xs text-gray-500">Results &amp; Analysis</p></div></div> `);
    Button($$renderer2, {
      variant: "outline",
      onclick: downloadReport,
      children: ($$renderer3) => {
        Download($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> Download Report`);
      }
    });
    $$renderer2.push(`<!----></div></header> <main class="max-w-5xl mx-auto px-4 py-8">`);
    if (store_get($$store_subs ??= {}, "$interviewQuery", interviewQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6">`);
      Skeleton($$renderer2, { class: "h-64" });
      $$renderer2.push(`<!----> <div class="grid grid-cols-4 gap-4"><!--[-->`);
      const each_array = ensure_array_like(Array(4));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        each_array[$$index];
        Skeleton($$renderer2, { class: "h-32" });
      }
      $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-2 gap-6">`);
      Skeleton($$renderer2, { class: "h-48" });
      $$renderer2.push(`<!----> `);
      Skeleton($$renderer2, { class: "h-48" });
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$interviewQuery", interviewQuery).error) {
        $$renderer2.push("<!--[-->");
        Card($$renderer2, {
          class: "p-8 text-center",
          children: ($$renderer3) => {
            $$renderer3.push(`<div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">`);
            Triangle_alert($$renderer3, { class: "w-8 h-8 text-red-500" });
            $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">Unable to Load Results</h2> <p class="text-gray-500 mb-6">${escape_html(store_get($$store_subs ??= {}, "$interviewQuery", interviewQuery).error.message)}</p> `);
            Button($$renderer3, {
              onclick: () => goto(),
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->Return to Dashboard`);
              }
            });
            $$renderer3.push(`<!---->`);
          }
        });
      } else {
        $$renderer2.push("<!--[!-->");
        if (interview) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="space-y-6">`);
          Card($$renderer2, {
            class: "p-8",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"><div class="flex items-center gap-6"><div${attr_class(`w-24 h-24 rounded-2xl flex items-center justify-center ${stringify(passed ? "bg-gradient-to-br from-emerald-500 to-emerald-600" : "bg-gradient-to-br from-red-500 to-red-600")} shadow-lg`)}>`);
              if (passed) {
                $$renderer3.push("<!--[-->");
                Circle_check_big($$renderer3, { class: "w-12 h-12 text-white" });
              } else {
                $$renderer3.push("<!--[!-->");
                Circle_x($$renderer3, { class: "w-12 h-12 text-white" });
              }
              $$renderer3.push(`<!--]--></div> <div><div class="flex items-center gap-2 mb-1"><span${attr_class(`px-3 py-1 rounded-full text-xs font-medium ${stringify(passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}`)}>${escape_html(passed ? "RECOMMENDED" : "NOT RECOMMENDED")}</span></div> <h1 class="text-2xl font-bold text-gray-800 mb-1">${escape_html(passed ? "Interview Passed!" : "Interview Not Passed")}</h1> <p class="text-gray-500">HR assessment completed and evaluated by AI</p></div></div> <div class="flex items-center gap-8">`);
              ScoreGauge($$renderer3, { score: overallScore, size: "lg" });
              $$renderer3.push(`<!----> <div class="text-center"><p class="text-3xl font-bold text-gray-800">${escape_html(overallScore)}%</p> <p class="text-sm text-gray-500">Overall Score</p></div></div></div> <div class="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-center gap-8"><div class="flex items-center gap-3 text-gray-600"><div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">`);
              Clock($$renderer3, { class: "w-5 h-5 text-purple-600" });
              $$renderer3.push(`<!----></div> <div><p class="text-lg font-semibold text-gray-800">${escape_html(duration)} min</p> <p class="text-xs text-gray-500">Duration</p></div></div> <div class="flex items-center gap-3 text-gray-600"><div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">`);
              Message_square($$renderer3, { class: "w-5 h-5 text-blue-600" });
              $$renderer3.push(`<!----></div> <div><p class="text-lg font-semibold text-gray-800">${escape_html(questionsAnswered)}</p> <p class="text-xs text-gray-500">Questions</p></div></div> `);
              if (interview.ai_recommendation) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<div class="flex items-center gap-3 text-gray-600"><div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">`);
                Award($$renderer3, { class: "w-5 h-5 text-pink-600" });
                $$renderer3.push(`<!----></div> <div><p class="text-lg font-semibold text-gray-800 capitalize">${escape_html(interview.ai_recommendation)}</p> <p class="text-xs text-gray-500">AI Recommendation</p></div></div>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]--></div>`);
            }
          });
          $$renderer2.push(`<!----> `);
          Card($$renderer2, {
            class: "p-6",
            children: ($$renderer3) => {
              $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">`);
              Trending_up($$renderer3, { class: "w-5 h-5 text-purple-600" });
              $$renderer3.push(`<!----> Assessment Breakdown</h2> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"><div class="text-center p-4 rounded-xl bg-gray-50">`);
              ScoreGauge($$renderer3, { score: culturalFitScore });
              $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Cultural Fit</p></div> <div class="text-center p-4 rounded-xl bg-gray-50">`);
              ScoreGauge($$renderer3, { score: communicationScore });
              $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Communication</p></div> <div class="text-center p-4 rounded-xl bg-gray-50">`);
              ScoreGauge($$renderer3, { score: motivationScore });
              $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Motivation</p></div> <div class="text-center p-4 rounded-xl bg-gray-50">`);
              ScoreGauge($$renderer3, { score: professionalismScore });
              $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Professionalism</p></div></div> `);
              if (teamworkScore > 0 || leadershipScore > 0) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<div class="grid sm:grid-cols-2 gap-6 mt-4">`);
                if (teamworkScore > 0) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<div class="text-center p-4 rounded-xl bg-gray-50">`);
                  ScoreGauge($$renderer3, { score: teamworkScore });
                  $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Teamwork</p></div>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--> `);
                if (leadershipScore > 0) {
                  $$renderer3.push("<!--[-->");
                  $$renderer3.push(`<div class="text-center p-4 rounded-xl bg-gray-50">`);
                  ScoreGauge($$renderer3, { score: leadershipScore });
                  $$renderer3.push(`<!----> <p class="mt-3 text-sm font-medium text-gray-700">Leadership</p></div>`);
                } else {
                  $$renderer3.push("<!--[!-->");
                }
                $$renderer3.push(`<!--]--></div>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            }
          });
          $$renderer2.push(`<!----> <div class="grid md:grid-cols-2 gap-6">`);
          Card($$renderer2, {
            class: "p-6",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">`);
              Thumbs_up($$renderer3, { class: "w-4 h-4 text-emerald-600" });
              $$renderer3.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-800">Strengths</h2></div> `);
              if (strengths.length > 0) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<ul class="space-y-3"><!--[-->`);
                const each_array_1 = ensure_array_like(strengths);
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let strength = each_array_1[$$index_1];
                  $$renderer3.push(`<li class="flex items-start gap-3">`);
                  Circle_check_big($$renderer3, { class: "w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" });
                  $$renderer3.push(`<!----> <span class="text-gray-600">${escape_html(strength)}</span></li>`);
                }
                $$renderer3.push(`<!--]--></ul>`);
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push(`<p class="text-gray-400 text-sm">No specific strengths identified</p>`);
              }
              $$renderer3.push(`<!--]-->`);
            }
          });
          $$renderer2.push(`<!----> `);
          Card($$renderer2, {
            class: "p-6",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">`);
              Target($$renderer3, { class: "w-4 h-4 text-amber-600" });
              $$renderer3.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-800">Areas for Improvement</h2></div> `);
              if (improvements.length > 0) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<ul class="space-y-3"><!--[-->`);
                const each_array_2 = ensure_array_like(improvements);
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let improvement = each_array_2[$$index_2];
                  $$renderer3.push(`<li class="flex items-start gap-3"><span class="w-4 h-4 rounded-full border-2 border-amber-400 mt-0.5 flex-shrink-0"></span> <span class="text-gray-600">${escape_html(improvement)}</span></li>`);
                }
                $$renderer3.push(`<!--]--></ul>`);
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push(`<p class="text-gray-400 text-sm">No specific improvements identified</p>`);
              }
              $$renderer3.push(`<!--]-->`);
            }
          });
          $$renderer2.push(`<!----></div> `);
          if (interview.ai_feedback_summary) {
            $$renderer2.push("<!--[-->");
            Card($$renderer2, {
              class: "p-6",
              children: ($$renderer3) => {
                $$renderer3.push(`<div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">`);
                Brain($$renderer3, { class: "w-4 h-4 text-purple-600" });
                $$renderer3.push(`<!----></div> <h2 class="text-lg font-semibold text-gray-800">AI Feedback Summary</h2></div> <p class="text-gray-600 leading-relaxed">${escape_html(interview.ai_feedback_summary)}</p>`);
              }
            });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (passed) {
            $$renderer2.push("<!--[-->");
            Card($$renderer2, {
              class: "p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200",
              children: ($$renderer3) => {
                $$renderer3.push(`<div class="flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">`);
                Sparkles($$renderer3, { class: "w-6 h-6 text-emerald-600" });
                $$renderer3.push(`<!----></div> <div><h3 class="font-semibold text-emerald-800">Ready for Hiring Decision</h3> <p class="text-sm text-emerald-600">This candidate has successfully completed all interview rounds and is recommended for hire.</p></div></div>`);
              }
            });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="flex justify-center gap-4 pt-4">`);
          Button($$renderer2, {
            variant: "outline",
            onclick: () => goto(),
            children: ($$renderer3) => {
              Arrow_left($$renderer3, { class: "w-4 h-4" });
              $$renderer3.push(`<!----> Return to Dashboard`);
            }
          });
          $$renderer2.push(`<!----> `);
          if (interview.interview_transcript && interview.interview_transcript.length > 0) {
            $$renderer2.push("<!--[-->");
            Button($$renderer2, {
              onclick: () => toast.info("Full transcript view coming soon"),
              children: ($$renderer3) => {
                Message_square($$renderer3, { class: "w-4 h-4" });
                $$renderer3.push(`<!----> View Full Transcript`);
              }
            });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          Card($$renderer2, {
            class: "p-8 text-center",
            children: ($$renderer3) => {
              $$renderer3.push(`<div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">`);
              Handshake($$renderer3, { class: "w-8 h-8 text-gray-400" });
              $$renderer3.push(`<!----></div> <h2 class="text-xl font-bold text-gray-800 mb-2">Interview Not Found</h2> <p class="text-gray-500 mb-6">The interview results you're looking for don't exist or have been removed.</p> `);
              Button($$renderer3, {
                onclick: () => goto(),
                children: ($$renderer4) => {
                  $$renderer4.push(`<!---->Return to Dashboard`);
                }
              });
              $$renderer3.push(`<!---->`);
            }
          });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></main> <footer class="py-6 text-center"><p class="text-xs text-gray-400">Powered by HR Automation Platform</p></footer></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
