import { m as head } from "../../../../../chunks/index2.js";
import { J as JobForm } from "../../../../../chunks/JobForm.js";
function _page($$renderer) {
  head("12f2anm", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Create Job | HR Automation</title>`);
    });
  });
  $$renderer.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Create Job Requirement</h1> <p class="text-slate-400 mt-1">Fill in the details to create a new job posting</p></div> `);
  JobForm($$renderer, { mode: "create" });
  $$renderer.push(`<!----></div>`);
}
export {
  _page as default
};
