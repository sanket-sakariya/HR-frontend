import { a as attr, n as stringify, e as ensure_array_like, d as store_get, u as unsubscribe_stores, m as head } from "../../../../chunks/index2.js";
import { a as authStore } from "../../../../chunks/auth.svelte.js";
import { a as useJobRequirements } from "../../../../chunks/jobs.js";
import { u as useCompanies } from "../../../../chunks/companies.js";
import { S as StatusBadge, d as formatSalaryRange, b as formatDate } from "../../../../chunks/StatusBadge.js";
import { B as Briefcase } from "../../../../chunks/briefcase.js";
import { M as Map_pin } from "../../../../chunks/map-pin.js";
import { C as Clock } from "../../../../chunks/clock.js";
import { U as Users } from "../../../../chunks/users.js";
import { Y as escape_html } from "../../../../chunks/context.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import { S as Select } from "../../../../chunks/Select.js";
import { S as Skeleton } from "../../../../chunks/Skeleton.js";
import { g as goto } from "../../../../chunks/client.js";
import { P as Plus } from "../../../../chunks/plus.js";
import { S as Search } from "../../../../chunks/search.js";
function JobCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { job } = $$props;
    $$renderer2.push(`<a${attr("href", `/jobs/${stringify(job.job_requirement_id)}`)} class="block card-executive p-6 hover:border-slate-700 transition-all group"><div class="flex items-start justify-between gap-4 mb-4"><div><h3 class="text-lg font-semibold text-gray-900 group-hover:text-royal-400 transition-colors">${escape_html(job.title)}</h3> <div class="flex items-center gap-3 mt-2 text-sm text-slate-400">`);
    if (job.department) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="flex items-center gap-1.5">`);
      Briefcase($$renderer2, { class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(job.department)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (job.location) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="flex items-center gap-1.5">`);
      Map_pin($$renderer2, { class: "w-4 h-4" });
      $$renderer2.push(`<!----> ${escape_html(job.location)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <span class="flex items-center gap-1.5">`);
    Clock($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> ${escape_html(job.job_type || "Full-time")}</span></div></div> `);
    StatusBadge($$renderer2, { status: job.status });
    $$renderer2.push(`<!----></div> <p class="text-sm text-slate-400 line-clamp-2 mb-4">${escape_html(job.description)}</p> <div class="flex items-center justify-between"><div class="flex items-center gap-4 text-sm">`);
    if (job.salary_range) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-slate-300 font-medium">${escape_html(formatSalaryRange(job.salary_range.min, job.salary_range.max))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <span class="flex items-center gap-1.5 text-slate-400">`);
    Users($$renderer2, { class: "w-4 h-4" });
    $$renderer2.push(`<!----> ${escape_html(job.candidates_count || 0)} candidates</span></div> <span class="text-xs text-slate-500">Posted ${escape_html(formatDate(job.created_at))}</span></div> `);
    if (job.requirements && job.requirements.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800"><!--[-->`);
      const each_array = ensure_array_like(job.requirements.slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let skill = each_array[$$index];
        $$renderer2.push(`<span class="px-2 py-1 rounded bg-gray-100 text-xs text-slate-400">${escape_html(skill.skill)}</span>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (job.requirements.length > 5) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="px-2 py-1 rounded bg-gray-100 text-xs text-slate-500">+${escape_html(job.requirements.length - 5)} more</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></a>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let searchQuery = "";
    let statusFilter = "";
    const companiesQuery = useCompanies({ limit: 1 });
    const companyId = authStore.companyId || store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).data?.data?.[0]?.company_id || null;
    const jobsQuery = useJobRequirements(companyId, { status: statusFilter || void 0 });
    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "draft", label: "Draft" },
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
      { value: "closed", label: "Closed" }
    ];
    let filteredJobs = (() => {
      const jobs = store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).data?.data || [];
      if (!searchQuery) return jobs;
      const query = searchQuery.toLowerCase();
      return jobs.filter((job) => job.title.toLowerCase().includes(query) || job.department?.toLowerCase().includes(query) || job.location?.toLowerCase().includes(query));
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1c2b3ix", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Jobs | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Job Requirements</h1> <p class="text-gray-500 mt-1">Manage your job postings and requirements</p></div> `);
      Button($$renderer3, {
        onclick: () => goto(),
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "w-4 h-4" });
          $$renderer4.push(`<!----> Create Job`);
        }
      });
      $$renderer3.push(`<!----></div> <div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1 max-w-md">`);
      Search($$renderer3, {
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        placeholder: "Search jobs...",
        class: "pl-10",
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="w-48">`);
      Select($$renderer3, {
        options: statusOptions,
        get value() {
          return statusFilter;
        },
        set value($$value) {
          statusFilter = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> `);
      if (store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="grid gap-4"><!--[-->`);
        const each_array = ensure_array_like(Array(3));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          Skeleton($$renderer3, { class: "h-48" });
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (filteredJobs.length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="card-executive p-12 text-center"><div class="inline-flex items-center justify-center p-4 rounded-full bg-gray-100 mb-4">`);
          Briefcase($$renderer3, { class: "w-8 h-8 text-gray-400" });
          $$renderer3.push(`<!----></div> <h3 class="text-lg font-medium text-gray-800 mb-2">No jobs found</h3> <p class="text-gray-500 mb-6">${escape_html(searchQuery ? "Try adjusting your search criteria" : "Create your first job requirement to get started")}</p> `);
          if (!searchQuery) {
            $$renderer3.push("<!--[-->");
            Button($$renderer3, {
              onclick: () => goto(),
              children: ($$renderer4) => {
                Plus($$renderer4, { class: "w-4 h-4" });
                $$renderer4.push(`<!----> Create Job`);
              }
            });
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="grid gap-4"><!--[-->`);
          const each_array_1 = ensure_array_like(filteredJobs);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let job = each_array_1[$$index_1];
            JobCard($$renderer3, { job });
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
