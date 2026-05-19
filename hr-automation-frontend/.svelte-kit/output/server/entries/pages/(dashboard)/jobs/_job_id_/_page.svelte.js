import { c as sanitize_props, j as spread_props, s as slot, d as store_get, u as unsubscribe_stores, m as head, e as ensure_array_like, f as attr_class, n as stringify, a as attr } from "../../../../../chunks/index2.js";
import { p as page } from "../../../../../chunks/stores.js";
import { g as goto } from "../../../../../chunks/client.js";
import { u as useJobRequirement, b as useDeleteJobRequirement, c as useUpdateJobStatus } from "../../../../../chunks/jobs.js";
import { u as useCandidates, d as useSelectTopResumes } from "../../../../../chunks/candidates.js";
import { a as useCreateAptitudeTest } from "../../../../../chunks/aptitude.js";
import { d as useTechnicalInterviews, b as useStartTechnicalInterview } from "../../../../../chunks/interviews.js";
import { S as StatusBadge, d as formatSalaryRange, b as formatDate, e as formatStatus } from "../../../../../chunks/StatusBadge.js";
import "clsx";
import { B as Button } from "../../../../../chunks/Button.js";
import { I as Input } from "../../../../../chunks/Input.js";
import { S as Skeleton } from "../../../../../chunks/Skeleton.js";
import { C as ConfirmDialog } from "../../../../../chunks/ConfirmDialog.js";
import { a as toast } from "../../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { M as Map_pin } from "../../../../../chunks/map-pin.js";
import { C as Clock } from "../../../../../chunks/clock.js";
import { D as Dollar_sign } from "../../../../../chunks/dollar-sign.js";
import { C as Copy } from "../../../../../chunks/copy.js";
import { P as Play } from "../../../../../chunks/play.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { S as Square_pen } from "../../../../../chunks/square-pen.js";
import { B as Brain } from "../../../../../chunks/brain.js";
import { V as Video } from "../../../../../chunks/video.js";
import { U as User_check } from "../../../../../chunks/user-check.js";
import { U as Users } from "../../../../../chunks/users.js";
import { Y as escape_html } from "../../../../../chunks/context.js";
function Pause($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      { "x": "14", "y": "4", "width": "4", "height": "16", "rx": "1" }
    ],
    [
      "rect",
      { "x": "6", "y": "4", "width": "4", "height": "16", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "pause" },
    $$sanitized_props,
    {
      /**
       * @component @name Pause
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB4PSIxNCIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMTYiIHJ4PSIxIiAvPgogIDxyZWN0IHg9IjYiIHk9IjQiIHdpZHRoPSI0IiBoZWlnaHQ9IjE2IiByeD0iMSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/pause
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
function Trash_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    ["path", { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }],
    ["path", { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }],
    ["line", { "x1": "10", "x2": "10", "y1": "11", "y2": "17" }],
    ["line", { "x1": "14", "x2": "14", "y1": "11", "y2": "17" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Trash2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyA2aDE4IiAvPgogIDxwYXRoIGQ9Ik0xOSA2djE0YzAgMS0xIDItMiAySDdjLTEgMC0yLTEtMi0yVjYiIC8+CiAgPHBhdGggZD0iTTggNlY0YzAtMSAxLTIgMi0yaDRjMSAwIDIgMSAyIDJ2MiIgLz4KICA8bGluZSB4MT0iMTAiIHgyPSIxMCIgeTE9IjExIiB5Mj0iMTciIC8+CiAgPGxpbmUgeDE9IjE0IiB4Mj0iMTQiIHkxPSIxMSIgeTI9IjE3IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/trash-2
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
    const candidatesQuery = useCandidates({ job_requirement_id: jobId });
    useTechnicalInterviews(jobId);
    const deleteJobMutation = useDeleteJobRequirement();
    const updateStatusMutation = useUpdateJobStatus();
    const selectTopResumesMutation = useSelectTopResumes();
    const createAptitudeMutation = useCreateAptitudeTest();
    useStartTechnicalInterview();
    let showDeleteConfirm = false;
    let topN = 5;
    let activeTab = "candidates";
    async function handleDelete() {
      try {
        await store_get($$store_subs ??= {}, "$deleteJobMutation", deleteJobMutation).mutateAsync(jobId);
        toast.success("Job deleted successfully");
        goto("/jobs");
      } catch (error) {
        toast.error("Failed to delete job", { description: error.message });
      }
    }
    async function handleStatusChange(status) {
      try {
        await store_get($$store_subs ??= {}, "$updateStatusMutation", updateStatusMutation).mutateAsync({ jobId, status });
        toast.success(`Job status updated to ${formatStatus(status)}`);
      } catch (error) {
        toast.error("Failed to update status", { description: error.message });
      }
    }
    async function handleSelectTopResumes() {
      try {
        await store_get($$store_subs ??= {}, "$selectTopResumesMutation", selectTopResumesMutation).mutateAsync({ jobId, topN });
        toast.success(`Top ${topN} candidates selected for aptitude test`);
      } catch (error) {
        toast.error("Failed to select candidates", { description: error.message });
      }
    }
    async function handleCreateAptitudeTest() {
      try {
        await store_get($$store_subs ??= {}, "$createAptitudeMutation", createAptitudeMutation).mutateAsync(jobId);
        toast.success("Aptitude test created successfully");
      } catch (error) {
        toast.error("Failed to create aptitude test", { description: error.message });
      }
    }
    function copyApplyLink() {
      const link = `${window.location.origin}/apply/${jobId}`;
      navigator.clipboard.writeText(link);
      toast.success("Application link copied to clipboard");
    }
    const tabs = [
      { id: "candidates", label: "Candidates", icon: Users },
      { id: "aptitude", label: "Aptitude", icon: Brain },
      { id: "technical", label: "Technical", icon: Video },
      { id: "hr", label: "HR", icon: User_check }
    ];
    const pipelineStages = [
      { id: "applied", label: "Applied" },
      { id: "aptitude_eligible", label: "Aptitude Eligible" },
      { id: "technical_eligible", label: "Technical Eligible" },
      { id: "hr_eligible", label: "HR Eligible" },
      { id: "hire_recommended", label: "Hire Recommended" }
    ];
    function getCandidateStageInfo(candidate) {
      let reachedStage = 0;
      let failedAtStage = null;
      const status = candidate.status || "";
      const reachedAptitude = [
        "aptitude_eligible",
        "aptitude_passed",
        "aptitude_failed",
        "technical_eligible",
        "technical_passed",
        "technical_failed",
        "hr_eligible",
        "hr_passed",
        "hr_failed",
        "hire_recommended"
      ].includes(status) || candidate.candidate_resume_score != null && candidate.candidate_resume_score > 0;
      if (!reachedAptitude) return { reachedStage, failedAtStage };
      reachedStage = 1;
      const aptitudeFailed = candidate.aptitude_test_result === "fail" || status === "aptitude_failed";
      const aptitudePassed = candidate.aptitude_test_result === "pass" || [
        "aptitude_passed",
        "technical_eligible",
        "technical_passed",
        "technical_failed",
        "hr_eligible",
        "hr_passed",
        "hr_failed",
        "hire_recommended"
      ].includes(status);
      if (aptitudeFailed) return { reachedStage, failedAtStage: 1 };
      if (!aptitudePassed) return { reachedStage, failedAtStage };
      reachedStage = 2;
      const technicalFailed = candidate.technical_test_result === "fail" || status === "technical_failed";
      const technicalPassed = candidate.technical_test_result === "pass" || [
        "technical_passed",
        "hr_eligible",
        "hr_passed",
        "hr_failed",
        "hire_recommended"
      ].includes(status);
      if (technicalFailed) return { reachedStage, failedAtStage: 2 };
      if (!technicalPassed) return { reachedStage, failedAtStage };
      reachedStage = 3;
      const hrFailed = candidate.hr_interview_result === "fail" || status === "hr_failed";
      const hrPassed = candidate.hr_interview_result === "pass" || ["hr_passed", "hire_recommended"].includes(status);
      if (hrFailed) return { reachedStage, failedAtStage: 3 };
      if (!hrPassed) return { reachedStage, failedAtStage };
      reachedStage = 4;
      return { reachedStage, failedAtStage };
    }
    let candidatesPipeline = (() => {
      const candidates = store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data || [];
      const stages = pipelineStages.map((s) => ({
        ...s,
        candidates: [],
        passedCount: 0,
        failedCount: 0,
        currentCount: 0
      }));
      candidates.forEach((c) => {
        const { reachedStage, failedAtStage } = getCandidateStageInfo(c);
        for (let i = 0; i <= reachedStage; i++) {
          let stageStatus;
          if (i < reachedStage) {
            stageStatus = "passed";
          } else if (failedAtStage === i) {
            stageStatus = "failed";
          } else {
            stageStatus = "current";
          }
          stages[i].candidates.push({ candidate: c, stageStatus });
        }
      });
      stages.forEach((stage) => {
        stage.passedCount = stage.candidates.filter((c) => c.stageStatus === "passed").length;
        stage.failedCount = stage.candidates.filter((c) => c.stageStatus === "failed").length;
        stage.currentCount = stage.candidates.filter((c) => c.stageStatus === "current").length;
      });
      return stages;
    })();
    (() => {
      const candidates = store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data || [];
      return candidates.filter((c) => {
        const { reachedStage, failedAtStage } = getCandidateStageInfo(c);
        return reachedStage === 2 && failedAtStage === null;
      });
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1h7a179", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data?.title || "Job")} | HR Automation</title>`);
        });
      });
      if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-6">`);
        Skeleton($$renderer3, { class: "h-12 w-96" });
        $$renderer3.push(`<!----> `);
        Skeleton($$renderer3, { class: "h-48" });
        $$renderer3.push(`<!----> `);
        Skeleton($$renderer3, { class: "h-96" });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data) {
          $$renderer3.push("<!--[-->");
          const job = store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data;
          $$renderer3.push(`<div class="space-y-6"><div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"><div><div class="flex items-center gap-3 mb-2"><h1 class="text-2xl font-bold text-gray-900">${escape_html(job.title)}</h1> `);
          StatusBadge($$renderer3, { status: job.status });
          $$renderer3.push(`<!----></div> <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">`);
          if (job.department) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span>${escape_html(job.department)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (job.location) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="flex items-center gap-1.5">`);
            Map_pin($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> ${escape_html(job.location)}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <span class="flex items-center gap-1.5">`);
          Clock($$renderer3, { class: "w-4 h-4" });
          $$renderer3.push(`<!----> ${escape_html(job.job_type || "Full-time")}</span> `);
          if (job.salary_range) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="flex items-center gap-1.5">`);
            Dollar_sign($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> ${escape_html(formatSalaryRange(job.salary_range.min, job.salary_range.max))}</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div> <div class="flex flex-wrap gap-2">`);
          Button($$renderer3, {
            variant: "secondary",
            onclick: copyApplyLink,
            children: ($$renderer4) => {
              Copy($$renderer4, { class: "w-4 h-4" });
              $$renderer4.push(`<!----> Copy Apply Link`);
            }
          });
          $$renderer3.push(`<!----> `);
          if (job.status === "draft" || job.status === "paused") {
            $$renderer3.push("<!--[-->");
            Button($$renderer3, {
              variant: "success",
              onclick: () => handleStatusChange("active"),
              children: ($$renderer4) => {
                Play($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> Activate`);
              }
            });
          } else {
            $$renderer3.push("<!--[!-->");
            if (job.status === "active") {
              $$renderer3.push("<!--[-->");
              Button($$renderer3, {
                variant: "secondary",
                onclick: () => handleStatusChange("paused"),
                children: ($$renderer4) => {
                  Pause($$renderer4, { class: "w-4 h-4" });
                  $$renderer4.push(`<!----> Pause`);
                }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]--> `);
          Button($$renderer3, {
            variant: "secondary",
            onclick: () => goto(),
            children: ($$renderer4) => {
              Square_pen($$renderer4, { class: "w-4 h-4" });
              $$renderer4.push(`<!----> Edit`);
            }
          });
          $$renderer3.push(`<!----> `);
          Button($$renderer3, {
            variant: "danger",
            onclick: () => showDeleteConfirm = true,
            children: ($$renderer4) => {
              Trash_2($$renderer4, { class: "w-4 h-4" });
            }
          });
          $$renderer3.push(`<!----></div></div> <div class="card-executive p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Job Description</h3> <p class="text-gray-500 whitespace-pre-wrap">${escape_html(job.description)}</p> `);
          if (job.requirements && job.requirements.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-medium text-gray-700 mb-3">Required Skills</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
            const each_array = ensure_array_like(job.requirements);
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let skill = each_array[$$index];
              $$renderer3.push(`<span class="px-3 py-1.5 rounded-lg bg-gray-50 text-sm text-gray-700">${escape_html(skill.skill)} <span class="text-gray-400 ml-1">(${escape_html(skill.level)})</span></span>`);
            }
            $$renderer3.push(`<!--]--></div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> `);
          if (job.benefits && job.benefits.length > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="mt-6 pt-6 border-t border-gray-200"><h4 class="text-sm font-medium text-gray-700 mb-3">Benefits</h4> <div class="flex flex-wrap gap-2"><!--[-->`);
            const each_array_1 = ensure_array_like(job.benefits);
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let benefit = each_array_1[$$index_1];
              $$renderer3.push(`<span class="px-3 py-1.5 rounded-lg bg-success/10 text-sm text-success border border-success/20">${escape_html(benefit)}</span>`);
            }
            $$renderer3.push(`<!--]--></div></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div> <div class="card-executive p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-4 rounded-lg bg-gray-50 border border-gray-200"><h4 class="font-medium text-gray-800 mb-2">AI Resume Screening</h4> <p class="text-sm text-gray-500 mb-3">Select top candidates based on resume scores</p> <div class="flex gap-2">`);
          Input($$renderer3, {
            type: "number",
            class: "w-20",
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
            variant: "secondary",
            onclick: handleSelectTopResumes,
            loading: store_get($$store_subs ??= {}, "$selectTopResumesMutation", selectTopResumesMutation).isPending,
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Select Top ${escape_html(topN)}`);
            }
          });
          $$renderer3.push(`<!----></div></div> <div class="p-4 rounded-lg bg-gray-50 border border-gray-200"><h4 class="font-medium text-gray-800 mb-2">Aptitude Test</h4> <p class="text-sm text-gray-500 mb-3">Create AI-generated aptitude test</p> `);
          Button($$renderer3, {
            variant: "secondary",
            onclick: handleCreateAptitudeTest,
            loading: store_get($$store_subs ??= {}, "$createAptitudeMutation", createAptitudeMutation).isPending,
            children: ($$renderer4) => {
              Brain($$renderer4, { class: "w-4 h-4" });
              $$renderer4.push(`<!----> Create Test`);
            }
          });
          $$renderer3.push(`<!----></div> <div class="p-4 rounded-lg bg-gray-50 border border-gray-200"><h4 class="font-medium text-gray-800 mb-2">Technical Interviews</h4> <p class="text-sm text-gray-500 mb-3">View technical interview results</p> `);
          Button($$renderer3, {
            variant: "secondary",
            onclick: () => goto(),
            children: ($$renderer4) => {
              Video($$renderer4, { class: "w-4 h-4" });
              $$renderer4.push(`<!----> View Results`);
            }
          });
          $$renderer3.push(`<!----></div> <div class="p-4 rounded-lg bg-gray-50 border border-gray-200"><h4 class="font-medium text-gray-800 mb-2">HR Interviews</h4> <p class="text-sm text-gray-500 mb-3">View HR interview results</p> `);
          Button($$renderer3, {
            variant: "secondary",
            onclick: () => goto(),
            children: ($$renderer4) => {
              User_check($$renderer4, { class: "w-4 h-4" });
              $$renderer4.push(`<!----> View Results`);
            }
          });
          $$renderer3.push(`<!----></div></div></div> <div class="card-executive"><div class="border-b border-gray-200"><nav class="flex gap-1 p-2"><!--[-->`);
          const each_array_2 = ensure_array_like(tabs);
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let tab = each_array_2[$$index_2];
            const Icon2 = tab.icon;
            $$renderer3.push(`<button${attr_class(`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${stringify(activeTab === tab.id ? "bg-purple-50 text-purple-600" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100")}`)}>`);
            $$renderer3.push("<!---->");
            Icon2?.($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> ${escape_html(tab.label)}</button>`);
          }
          $$renderer3.push(`<!--]--></nav></div> <div class="p-6">`);
          {
            $$renderer3.push("<!--[-->");
            if (store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).isLoading) {
              $$renderer3.push("<!--[-->");
              Skeleton($$renderer3, { class: "h-48" });
            } else {
              $$renderer3.push("<!--[!-->");
              if ((store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data?.length || 0) === 0) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<div class="text-center py-12">`);
                Users($$renderer3, { class: "w-12 h-12 text-gray-400 mx-auto mb-4" });
                $$renderer3.push(`<!----> <h4 class="text-lg font-medium text-gray-700 mb-2">No candidates yet</h4> <p class="text-gray-400">Candidates will appear here once they apply</p></div>`);
              } else {
                $$renderer3.push("<!--[!-->");
                $$renderer3.push(`<div class="space-y-8"><div><div class="flex items-center justify-between mb-3"><h4 class="text-base font-semibold text-gray-800">All Candidates (${escape_html(store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data?.length || 0)})</h4> <a${attr("href", `/candidates?job_id=${jobId}`)} class="text-sm text-purple-600 hover:text-purple-500 font-medium">View All</a></div> <div class="overflow-x-auto rounded-lg border border-gray-200"><table class="min-w-full text-sm"><thead class="bg-gray-50 text-gray-600"><tr><th class="text-left font-medium px-4 py-2">Name</th><th class="text-left font-medium px-4 py-2">Email</th><th class="text-left font-medium px-4 py-2">Phone</th><th class="text-left font-medium px-4 py-2">Resume Score</th><th class="text-left font-medium px-4 py-2">Aptitude</th><th class="text-left font-medium px-4 py-2">Status</th><th class="text-right font-medium px-4 py-2">Applied</th></tr></thead><tbody class="divide-y divide-gray-100 bg-white"><!--[-->`);
                const each_array_3 = ensure_array_like(store_get($$store_subs ??= {}, "$candidatesQuery", candidatesQuery).data?.data?.data || []);
                for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
                  let c = each_array_3[$$index_3];
                  $$renderer3.push(`<tr class="hover:bg-purple-50/40 cursor-pointer"><td class="px-4 py-2 font-medium text-gray-900">${escape_html(c.first_name ?? "")} ${escape_html(c.last_name ?? "")}</td><td class="px-4 py-2 text-gray-700 truncate max-w-[14rem]">${escape_html(c.email ?? "-")}</td><td class="px-4 py-2 text-gray-700">${escape_html(c.phone ?? "-")}</td><td class="px-4 py-2 text-gray-700">${escape_html(c.candidate_resume_score != null ? `${Math.round(c.candidate_resume_score)}%` : "-")}</td><td class="px-4 py-2">`);
                  if (c.aptitude_test_result === "pass") {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<span class="text-emerald-600">Passed</span>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                    if (c.aptitude_test_result === "fail") {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="text-red-600">Failed</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                      if (c.aptitude_test) {
                        $$renderer3.push("<!--[-->");
                        $$renderer3.push(`<span class="text-amber-600">In Progress</span>`);
                      } else {
                        $$renderer3.push("<!--[!-->");
                        $$renderer3.push(`<span class="text-gray-400">Not Taken</span>`);
                      }
                      $$renderer3.push(`<!--]-->`);
                    }
                    $$renderer3.push(`<!--]-->`);
                  }
                  $$renderer3.push(`<!--]--></td><td class="px-4 py-2">`);
                  StatusBadge($$renderer3, { status: c.status || "applied", size: "sm" });
                  $$renderer3.push(`<!----></td><td class="px-4 py-2 text-right text-gray-500 text-xs">${escape_html(c.created_at ? formatDate(c.created_at) : "-")}</td></tr>`);
                }
                $$renderer3.push(`<!--]--></tbody></table></div></div> <div><h4 class="text-base font-semibold text-gray-800 mb-3">Pipeline Overview</h4> <div class="grid grid-cols-1 md:grid-cols-5 gap-3"><!--[-->`);
                const each_array_4 = ensure_array_like(candidatesPipeline);
                for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
                  let stage = each_array_4[$$index_5];
                  $$renderer3.push(`<div class="rounded-lg bg-gray-50 border border-gray-200 overflow-hidden"><div class="px-4 py-3 border-b border-gray-100"><div class="flex items-center justify-between"><h5 class="text-sm font-semibold text-gray-800">${escape_html(stage.label)}</h5> <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">${escape_html(stage.candidates.length)}</span></div> `);
                  if (stage.candidates.length > 0) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<div class="flex gap-3 mt-2 text-xs">`);
                    if (stage.passedCount > 0) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="flex items-center gap-1 text-emerald-600"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${escape_html(stage.passedCount)} passed</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--> `);
                    if (stage.failedCount > 0) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="flex items-center gap-1 text-red-600"><span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> ${escape_html(stage.failedCount)} failed</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--> `);
                    if (stage.currentCount > 0) {
                      $$renderer3.push("<!--[-->");
                      $$renderer3.push(`<span class="flex items-center gap-1 text-purple-600"><span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span> ${escape_html(stage.currentCount)} active</span>`);
                    } else {
                      $$renderer3.push("<!--[!-->");
                    }
                    $$renderer3.push(`<!--]--></div>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div> <div class="p-3 space-y-1.5 max-h-72 overflow-y-auto"><!--[-->`);
                  const each_array_5 = ensure_array_like(stage.candidates);
                  for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
                    let { candidate, stageStatus } = each_array_5[$$index_4];
                    $$renderer3.push(`<div${attr_class(`flex items-center gap-2.5 p-2 rounded-md transition-colors ${stringify(stageStatus === "passed" ? "bg-emerald-50/50" : stageStatus === "failed" ? "bg-red-50/50" : "bg-purple-50/50")}`)}><span${attr_class(`flex-shrink-0 w-2 h-2 rounded-full ${stringify(stageStatus === "passed" ? "bg-emerald-500" : stageStatus === "failed" ? "bg-red-500" : "bg-purple-500")}`)}></span> <div class="min-w-0 flex-1"><p class="text-sm text-gray-800 truncate">${escape_html(candidate.first_name)} ${escape_html(candidate.last_name)}</p></div> <span${attr_class(`flex-shrink-0 text-[10px] font-medium uppercase tracking-wide ${stringify(stageStatus === "passed" ? "text-emerald-600" : stageStatus === "failed" ? "text-red-600" : "text-purple-600")}`)}>${escape_html(stageStatus === "passed" ? "✓ Passed" : stageStatus === "failed" ? "✗ Failed" : "● Active")}</span></div>`);
                  }
                  $$renderer3.push(`<!--]--> `);
                  if (stage.candidates.length === 0) {
                    $$renderer3.push("<!--[-->");
                    $$renderer3.push(`<p class="text-xs text-gray-400 text-center py-4">No candidates yet</p>`);
                  } else {
                    $$renderer3.push("<!--[!-->");
                  }
                  $$renderer3.push(`<!--]--></div></div>`);
                }
                $$renderer3.push(`<!--]--></div></div></div>`);
              }
              $$renderer3.push(`<!--]-->`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]--></div></div></div> `);
          ConfirmDialog($$renderer3, {
            title: "Delete Job Requirement",
            description: "Are you sure you want to delete this job? All associated candidates and interview data will be affected.",
            confirmLabel: "Delete",
            onconfirm: handleDelete,
            loading: store_get($$store_subs ??= {}, "$deleteJobMutation", deleteJobMutation).isPending,
            get open() {
              return showDeleteConfirm;
            },
            set open($$value) {
              showDeleteConfirm = $$value;
              $$settled = false;
            }
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="card-executive p-12 text-center"><h2 class="text-xl font-semibold text-gray-800 mb-2">Job not found</h2> <p class="text-gray-500 mb-4">The job requirement you're looking for doesn't exist</p> `);
          Button($$renderer3, {
            onclick: () => goto(),
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->Back to Jobs`);
            }
          });
          $$renderer3.push(`<!----></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
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
