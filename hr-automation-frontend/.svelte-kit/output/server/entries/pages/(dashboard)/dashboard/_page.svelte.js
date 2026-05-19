import { c as sanitize_props, j as spread_props, s as slot, f as attr_class, g as clsx, e as ensure_array_like, a as attr, n as stringify, d as store_get, m as head, u as unsubscribe_stores } from "../../../../chunks/index2.js";
import { a as authStore } from "../../../../chunks/auth.svelte.js";
import { u as useCompanies, a as useCompany } from "../../../../chunks/companies.js";
import { a as useJobRequirements } from "../../../../chunks/jobs.js";
import "../../../../chunks/client2.js";
import { I as Icon, c as cn } from "../../../../chunks/Icon.js";
import { Y as escape_html } from "../../../../chunks/context.js";
import { S as StatusBadge, c as formatRelativeTime } from "../../../../chunks/StatusBadge.js";
import { U as Users } from "../../../../chunks/users.js";
import { S as ScoreGauge } from "../../../../chunks/ScoreGauge.js";
import { S as Skeleton } from "../../../../chunks/Skeleton.js";
import { B as Button } from "../../../../chunks/Button.js";
import { g as goto } from "../../../../chunks/client.js";
import { B as Briefcase } from "../../../../chunks/briefcase.js";
import { P as Plus } from "../../../../chunks/plus.js";
import { V as Video } from "../../../../chunks/video.js";
function Chevron_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtOSAxOCA2LTYtNi02IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/chevron-right
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
function StatCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title, value, change, icon: Icon2, color = "primary" } = $$props;
    const colors = {
      primary: "from-purple-600 to-purple-500",
      success: "from-emerald-500 to-emerald-400",
      warning: "from-amber-500 to-amber-400",
      danger: "from-red-500 to-red-400"
    };
    $$renderer2.push(`<div class="card-executive p-6 animate-fade-in-up group"><div class="flex items-start justify-between"><div><p class="text-sm font-medium text-gray-500 mb-1">${escape_html(title)}</p> <p class="text-3xl font-bold text-gray-900 animate-count-up">${escape_html(value)}</p> `);
    if (change !== void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-1 mt-2"><span${attr_class(clsx(cn("text-sm font-semibold", change >= 0 ? "text-emerald-600" : "text-red-600")))}>${escape_html(change >= 0 ? "+" : "")}${escape_html(change)}%</span> <span class="text-xs text-gray-400">vs last month</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (Icon2) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(clsx(cn("p-3 rounded-2xl bg-gradient-to-br shadow-sm group-hover:scale-110 transition-transform duration-300", colors[color])))}>`);
      $$renderer2.push("<!---->");
      Icon2?.($$renderer2, { class: "w-6 h-6 text-white" });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function JobsOverview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { jobs } = $$props;
    $$renderer2.push(`<div class="space-y-3">`);
    if (jobs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8"><p class="text-slate-400">No job requirements yet</p> <a href="/jobs/new" class="text-royal-400 hover:text-royal-300 text-sm font-medium">Create your first job</a></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(jobs.slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let job = each_array[$$index];
        $$renderer2.push(`<a${attr("href", `/jobs/${stringify(job.job_requirement_id)}`)} class="flex items-center justify-between p-4 rounded-lg bg-gray-100 hover:bg-gray-100 border border-slate-800/50 hover:border-slate-700 transition-all group"><div class="flex-1 min-w-0"><div class="flex items-center gap-3 mb-1"><h4 class="font-medium text-gray-800 truncate">${escape_html(job.title)}</h4> `);
        StatusBadge($$renderer2, { status: job.status, size: "sm" });
        $$renderer2.push(`<!----></div> <div class="flex items-center gap-4 text-sm text-slate-500"><span>${escape_html(job.department || "No department")}</span> <span>•</span> <span>${escape_html(formatRelativeTime(job.created_at))}</span></div></div> <div class="flex items-center gap-4"><div class="flex items-center gap-1.5 text-slate-400">`);
        Users($$renderer2, { class: "w-4 h-4" });
        $$renderer2.push(`<!----> <span class="text-sm">${escape_html(job.candidates_count || 0)}</span></div> `);
        Chevron_right($$renderer2, {
          class: "w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors"
        });
        $$renderer2.push(`<!----></div></a>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (jobs.length > 5) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<a href="/jobs" class="block text-center py-3 text-sm text-royal-400 hover:text-royal-300 font-medium">View all ${escape_html(jobs.length)} jobs →</a>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function RecentCandidates($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { candidates = [], loading = false } = $$props;
    let recentCandidates = (() => {
      return [...candidates].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()).slice(0, 10);
    })();
    $$renderer2.push(`<div class="space-y-3">`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(Array(3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        each_array[$$index];
        $$renderer2.push(`<div class="flex items-center gap-4 p-4 rounded-lg bg-gray-100">`);
        Skeleton($$renderer2, { class: "w-10 h-10 rounded-full" });
        $$renderer2.push(`<!----> <div class="flex-1">`);
        Skeleton($$renderer2, { class: "h-4 w-32 mb-2" });
        $$renderer2.push(`<!----> `);
        Skeleton($$renderer2, { class: "h-3 w-48" });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (recentCandidates.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-8"><p class="text-slate-400">No candidates yet</p> <p class="text-sm text-slate-500 mt-1">Candidates will appear here once they apply to your jobs</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(recentCandidates);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let candidate = each_array_1[$$index_1];
          $$renderer2.push(`<a${attr("href", `/candidates/${candidate.candidate_id}`)} class="flex items-center gap-4 p-4 rounded-lg bg-gray-100 border border-slate-800/50 transition-all hover:bg-gray-200 hover:shadow-sm cursor-pointer no-underline"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-royal-600 to-royal-500 flex items-center justify-center flex-shrink-0"><span class="text-white font-semibold">${escape_html(candidate.first_name?.[0])}${escape_html(candidate.last_name?.[0])}</span></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><h4 class="font-medium text-gray-800 truncate">${escape_html(candidate.first_name)} ${escape_html(candidate.last_name)}</h4> `);
          StatusBadge($$renderer2, { status: candidate.status, size: "sm" });
          $$renderer2.push(`<!----></div> <p class="text-sm text-slate-500 truncate">${escape_html(candidate.email)}</p></div> `);
          if (candidate.candidate_resume_score) {
            $$renderer2.push("<!--[-->");
            ScoreGauge($$renderer2, { score: candidate.candidate_resume_score, size: "sm" });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></a>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (candidates.length > 10) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-center py-2 text-sm text-slate-500">Showing 10 of ${escape_html(candidates.length)} candidates</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const companiesQuery = useCompanies({ limit: 1 });
    const companyId = authStore.companyId || store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).data?.data?.[0]?.company_id || null;
    const companyQuery = useCompany(companyId);
    const jobsQuery = useJobRequirements(companyId);
    (() => {
      const jobs = store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).data?.data || [];
      return jobs.map((j) => j.job_requirement_id || j.id).filter(Boolean);
    })();
    let allCandidates = [];
    let candidatesLoading = false;
    let stats = (() => {
      const jobs = store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).data?.data || [];
      const totalJobs = jobs.length;
      const activeJobs = jobs.filter((j) => j.status === "active").length;
      const totalCandidates = allCandidates.length;
      return {
        totalJobs,
        activeJobs,
        totalCandidates,
        interviewsCompleted: 0
        // Would need separate API call
      };
    })();
    head("1e9wl5n", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard | HR Automation</title>`);
      });
    });
    if (store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center min-h-[60vh]"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent mx-auto mb-4"></div> <p class="text-gray-500">Loading your dashboard...</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (!companyId && !store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).isLoading) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-center min-h-[60vh]"><div class="text-center max-w-md"><div class="w-16 h-16 rounded-2xl bg-royal-900/50 flex items-center justify-center mx-auto mb-6">`);
        Briefcase($$renderer2, { class: "w-8 h-8 text-purple-600" });
        $$renderer2.push(`<!----></div> <h2 class="text-2xl font-bold text-gray-900 mb-2">Welcome to HR Automation!</h2> <p class="text-gray-500 mb-6">To get started, please register your company details first.</p> `);
        Button($$renderer2, {
          onclick: () => goto(),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->Register Company`);
          }
        });
        $$renderer2.push(`<!----></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-8"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900">Welcome back${escape_html(store_get($$store_subs ??= {}, "$companyQuery", companyQuery).data?.company_name ? `, ${store_get($$store_subs ??= {}, "$companyQuery", companyQuery).data.company_name}` : "")}!</h1> <p class="text-gray-500 mt-1">Here's what's happening with your hiring pipeline</p></div> `);
        Button($$renderer2, {
          onclick: () => goto(),
          children: ($$renderer3) => {
            Plus($$renderer3, { class: "w-4 h-4" });
            $$renderer3.push(`<!----> Create Job`);
          }
        });
        $$renderer2.push(`<!----></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`);
        if (store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).isLoading) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<!--[-->`);
          const each_array = ensure_array_like(Array(4));
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            each_array[$$index];
            Skeleton($$renderer2, { class: "h-32" });
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
          StatCard($$renderer2, {
            title: "Total Jobs",
            value: stats.totalJobs,
            icon: Briefcase,
            color: "primary"
          });
          $$renderer2.push(`<!----> `);
          StatCard($$renderer2, {
            title: "Active Jobs",
            value: stats.activeJobs,
            icon: Briefcase,
            color: "success"
          });
          $$renderer2.push(`<!----> `);
          StatCard($$renderer2, {
            title: "Total Candidates",
            value: stats.totalCandidates,
            icon: Users,
            color: "warning"
          });
          $$renderer2.push(`<!----> `);
          StatCard($$renderer2, {
            title: "Interviews Completed",
            value: stats.interviewsCompleted,
            icon: Video,
            color: "danger"
          });
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]--></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="card-executive p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900">Job Requirements</h2> <a href="/jobs" class="text-sm text-purple-600 hover:text-purple-500 font-medium">View all</a></div> `);
        if (store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).isLoading) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="space-y-3"><!--[-->`);
          const each_array_1 = ensure_array_like(Array(3));
          for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
            each_array_1[$$index_1];
            Skeleton($$renderer2, { class: "h-20" });
          }
          $$renderer2.push(`<!--]--></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          JobsOverview($$renderer2, {
            jobs: store_get($$store_subs ??= {}, "$jobsQuery", jobsQuery).data?.data || []
          });
        }
        $$renderer2.push(`<!--]--></div> <div class="card-executive p-6"><div class="flex items-center justify-between mb-6"><h2 class="text-lg font-semibold text-gray-900">Recent Candidates</h2> <a href="/candidates" class="text-sm text-purple-600 hover:text-purple-500 font-medium">View all</a></div> `);
        RecentCandidates($$renderer2, {
          candidates: allCandidates,
          loading: candidatesLoading
        });
        $$renderer2.push(`<!----></div></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
