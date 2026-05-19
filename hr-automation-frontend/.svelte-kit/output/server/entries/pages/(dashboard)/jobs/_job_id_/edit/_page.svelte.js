import { d as store_get, m as head, u as unsubscribe_stores } from "../../../../../../chunks/index2.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { u as useJobRequirement } from "../../../../../../chunks/jobs.js";
import { J as JobForm } from "../../../../../../chunks/JobForm.js";
import { S as Skeleton } from "../../../../../../chunks/Skeleton.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const jobId = store_get($$store_subs ??= {}, "$page", page).params.job_id;
    const jobQuery = useJobRequirement(jobId);
    head("1rtk24g", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Edit Job | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Edit Job Requirement</h1> <p class="text-slate-400 mt-1">Update the job details</p></div> `);
    if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).isLoading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6">`);
      Skeleton($$renderer2, { class: "h-64" });
      $$renderer2.push(`<!----> `);
      Skeleton($$renderer2, { class: "h-48" });
      $$renderer2.push(`<!----> `);
      Skeleton($$renderer2, { class: "h-48" });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data) {
        $$renderer2.push("<!--[-->");
        JobForm($$renderer2, {
          job: store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data,
          mode: "edit"
        });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="card-executive p-12 text-center"><p class="text-slate-400">Job not found</p></div>`);
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
