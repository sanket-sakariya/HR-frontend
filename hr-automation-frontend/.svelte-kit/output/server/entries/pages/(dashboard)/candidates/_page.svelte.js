import { d as store_get, u as unsubscribe_stores, m as head, e as ensure_array_like, a as attr } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { a as authStore } from "../../../../chunks/auth.svelte.js";
import { u as useJobRequirement, a as useJobRequirements } from "../../../../chunks/jobs.js";
import { u as useCompanies } from "../../../../chunks/companies.js";
import { u as useCandidates, a as useAllJobsCandidates } from "../../../../chunks/candidates.js";
import { S as StatusBadge } from "../../../../chunks/StatusBadge.js";
import { S as ScoreGauge } from "../../../../chunks/ScoreGauge.js";
import { I as Input } from "../../../../chunks/Input.js";
import { S as Select } from "../../../../chunks/Select.js";
import { S as Skeleton } from "../../../../chunks/Skeleton.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
import { S as Search } from "../../../../chunks/search.js";
import { U as Users } from "../../../../chunks/users.js";
import { Y as escape_html } from "../../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let searchQuery = "";
    let statusFilter = "";
    const jobIdParam = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("job_id") || "";
    const singleJobQuery = useJobRequirement(jobIdParam || null);
    const jobCandidatesQuery = useCandidates(jobIdParam ? { job_requirement_id: jobIdParam } : void 0);
    const companiesQuery = useCompanies({ limit: 1 });
    const companyId = authStore.companyId || store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).data?.data?.[0]?.company_id || null;
    const jobsQuery = useJobRequirements(jobIdParam ? null : companyId);
    const jobIds = (() => {
      const jobs = store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).data?.data || [];
      return jobs.map((j) => j.job_requirement_id).filter((id) => typeof id === "string");
    })();
    const allCandidatesQuery = useAllJobsCandidates(jobIdParam ? [] : jobIds);
    const loading = jobIdParam ? store_get($$store_subs ??= {}, "$jobCandidatesQuery", jobCandidatesQuery).isLoading : store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).isLoading || store_get($$store_subs ??= {}, "$allCandidatesQuery", allCandidatesQuery).isLoading;
    const rawCandidates = (() => {
      if (jobIdParam) {
        return store_get($$store_subs ??= {}, "$jobCandidatesQuery", jobCandidatesQuery).data?.data?.data || [];
      }
      return store_get($$store_subs ??= {}, "$allCandidatesQuery", allCandidatesQuery).data || [];
    })();
    const job = store_get($$store_subs ??= {}, "$singleJobQuery", singleJobQuery).data;
    const statusOptions = [
      { value: "", label: "All Statuses" },
      { value: "applied", label: "Applied" },
      { value: "resume_screened", label: "Resume Screened" },
      { value: "aptitude_eligible", label: "Aptitude Eligible" },
      { value: "aptitude_passed", label: "Aptitude Passed" },
      { value: "aptitude_failed", label: "Aptitude Failed" },
      { value: "technical_eligible", label: "Technical Eligible" },
      { value: "technical_passed", label: "Technical Passed" },
      { value: "technical_failed", label: "Technical Failed" },
      { value: "hr_eligible", label: "HR Eligible" },
      { value: "hr_passed", label: "HR Passed" },
      { value: "hr_failed", label: "HR Failed" },
      { value: "hire_recommended", label: "Hire Recommended" },
      { value: "rejected", label: "Rejected" }
    ];
    const filteredCandidates = (() => {
      const q = searchQuery.trim().toLowerCase();
      return [...rawCandidates].filter((c) => {
        if (statusFilter && c.status !== statusFilter) return false;
        if (!q) return true;
        const name = `${c.first_name ?? ""} ${c.last_name ?? ""}`.toLowerCase();
        return name.includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.phone ?? "").toLowerCase().includes(q);
      }).sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1ef6rfz", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Candidates | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div>`);
      if (jobIdParam) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mb-2">`);
        Arrow_left($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> Back to job</button> <h1 class="text-2xl font-bold text-gray-900">Candidates ${escape_html(job?.title ? `· ${job.title}` : "")}</h1> <p class="text-gray-500 mt-1">${escape_html(job?.title ? `All candidates who applied for "${job.title}"` : "Candidates for this job")}</p>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<h1 class="text-2xl font-bold text-gray-900">Candidates</h1> <p class="text-gray-500 mt-1">All candidates who have applied across your jobs</p>`);
      }
      $$renderer3.push(`<!--]--></div></div> <div class="flex flex-col sm:flex-row gap-4"><div class="relative flex-1 max-w-md">`);
      Search($$renderer3, {
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        placeholder: "Search by name, email, phone...",
        class: "pl-10",
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="w-full sm:w-64">`);
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
      $$renderer3.push(`<!----></div> `);
      if (jobIdParam) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button" class="text-sm text-gray-500 hover:text-purple-600 underline self-center">Clear job filter</button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      if (loading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="space-y-3"><!--[-->`);
        const each_array = ensure_array_like(Array(5));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          Skeleton($$renderer3, { class: "h-20" });
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (filteredCandidates.length === 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="card-executive p-12 text-center"><div class="inline-flex items-center justify-center p-4 rounded-full bg-gray-100 mb-4">`);
          Users($$renderer3, { class: "w-8 h-8 text-gray-400" });
          $$renderer3.push(`<!----></div> <h3 class="text-lg font-medium text-gray-800 mb-2">No candidates found</h3> <p class="text-gray-500">${escape_html(searchQuery || statusFilter ? "Try adjusting your filters" : jobIdParam ? "No one has applied for this job yet." : "Candidates will appear here once they apply to your jobs")}</p></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="space-y-3"><!--[-->`);
          const each_array_1 = ensure_array_like(filteredCandidates);
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            let candidate = each_array_1[$$index_1];
            $$renderer3.push(`<a${attr("href", `/candidates/${candidate.candidate_id}`)} class="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-sm no-underline"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center flex-shrink-0"><span class="text-white font-semibold">${escape_html(candidate.first_name?.[0] ?? "")}${escape_html(candidate.last_name?.[0] ?? "")}</span></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><h4 class="font-medium text-gray-900 truncate">${escape_html(candidate.first_name ?? "")} ${escape_html(candidate.last_name ?? "")}</h4> `);
            StatusBadge($$renderer3, { status: candidate.status, size: "sm" });
            $$renderer3.push(`<!----></div> <p class="text-sm text-gray-500 truncate">${escape_html(candidate.email ?? "—")}</p></div> `);
            if (candidate.candidate_resume_score) {
              $$renderer3.push("<!--[-->");
              ScoreGauge($$renderer3, { score: candidate.candidate_resume_score, size: "sm" });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></a>`);
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
