import { b as bind_props, e as ensure_array_like, f as attr_class, a as attr, d as store_get, u as unsubscribe_stores } from "./index2.js";
import { g as goto } from "./client.js";
import { e as useCreateJobRequirement, f as useUpdateJobRequirement } from "./jobs.js";
import { u as useCompanies } from "./companies.js";
import { a as authStore } from "./auth.svelte.js";
import { B as Button } from "./Button.js";
import { I as Input } from "./Input.js";
import { L as Label } from "./Label.js";
import { T as Textarea } from "./Textarea.js";
import { S as Select } from "./Select.js";
import { P as Plus } from "./plus.js";
import { X } from "./x.js";
import { Y as escape_html } from "./context.js";
import "./Toaster.svelte_svelte_type_style_lang.js";
import "clsx";
function SkillsInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { skills = [], onchange } = $$props;
    let newSkill = "";
    let newLevel = "intermediate";
    const levels = [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
      { value: "expert", label: "Expert" }
    ];
    function addSkill() {
      if (newSkill.trim()) {
        skills = [
          ...skills,
          { skill: newSkill.trim(), level: newLevel, required: true }
        ];
        newSkill = "";
        newLevel = "intermediate";
        onchange?.(skills);
      }
    }
    function handleKeydown(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-4"><div class="flex gap-3"><div class="flex-1">`);
      Input($$renderer3, {
        placeholder: "Add a skill (e.g., Python, React, SQL)",
        onkeydown: handleKeydown,
        get value() {
          return newSkill;
        },
        set value($$value) {
          newSkill = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="w-40">`);
      Select($$renderer3, {
        options: levels,
        get value() {
          return newLevel;
        },
        set value($$value) {
          newLevel = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> `);
      Button($$renderer3, {
        variant: "secondary",
        onclick: addSkill,
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "w-4 h-4" });
        }
      });
      $$renderer3.push(`<!----></div> `);
      if (skills.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        const each_array = ensure_array_like(skills);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let skill = each_array[index];
          $$renderer3.push(`<div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 border border-slate-700"><button type="button"${attr_class(`w-2 h-2 rounded-full ${skill.required ? "bg-success" : "bg-slate-500"}`)}${attr("title", skill.required ? "Required" : "Optional")}></button> <span class="text-sm text-gray-800">${escape_html(skill.skill)}</span> <span class="text-xs text-slate-500 px-1.5 py-0.5 rounded bg-gray-100">${escape_html(skill.level)}</span> <button type="button" class="text-slate-500 hover:text-danger transition-colors">`);
          X($$renderer3, { class: "w-4 h-4" });
          $$renderer3.push(`<!----></button></div>`);
        }
        $$renderer3.push(`<!--]--></div> <p class="text-xs text-slate-500">Click the dot to toggle required/optional status</p>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<p class="text-sm text-slate-500 text-center py-4 bg-gray-100 rounded-lg border border-dashed border-slate-700">No skills added yet. Add skills that candidates should have.</p>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { skills });
  });
}
function JobForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { job, mode = "create" } = $$props;
    const companiesQuery = useCompanies({ limit: 1 });
    authStore.companyId || store_get($$store_subs ??= {}, "$companiesQuery", companiesQuery).data?.data?.[0]?.company_id || null;
    let formData = {
      title: job?.title || "",
      description: job?.description || "",
      department: job?.department || "",
      location: job?.location || "",
      job_type: job?.job_type || "full-time",
      requirements: job?.requirements || [],
      experience: {
        min_years: job?.experience?.min_years || 0,
        max_years: job?.experience?.max_years || 5,
        preferred: job?.experience?.preferred || 2
      },
      salary_range: {
        min: job?.salary_range?.min || 5e4,
        max: job?.salary_range?.max || 1e5
      },
      benefits: job?.benefits || []
    };
    let newBenefit = "";
    let isSubmitting = false;
    useCreateJobRequirement();
    useUpdateJobRequirement();
    function addBenefit() {
      if (newBenefit.trim()) {
        formData.benefits = [...formData.benefits, newBenefit.trim()];
        newBenefit = "";
      }
    }
    const jobTypes = [
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "contract", label: "Contract" },
      { value: "internship", label: "Internship" }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<form class="space-y-8 max-w-4xl"><div class="card-executive p-6 space-y-4"><h3 class="text-lg font-semibold text-gray-900">Basic Information</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="md:col-span-2">`);
      Label($$renderer3, {
        for: "title",
        required: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Job Title`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "title",
        placeholder: "e.g., Senior Software Engineer",
        required: true,
        get value() {
          return formData.title;
        },
        set value($$value) {
          formData.title = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "department",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Department`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "department",
        placeholder: "e.g., Engineering",
        get value() {
          return formData.department;
        },
        set value($$value) {
          formData.department = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "location",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Location`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "location",
        placeholder: "e.g., Remote, New York, NY",
        get value() {
          return formData.location;
        },
        set value($$value) {
          formData.location = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "job_type",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Job Type`);
        }
      });
      $$renderer3.push(`<!----> `);
      Select($$renderer3, {
        id: "job_type",
        options: jobTypes,
        get value() {
          return formData.job_type;
        },
        set value($$value) {
          formData.job_type = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div>`);
      Label($$renderer3, {
        for: "description",
        required: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Job Description`);
        }
      });
      $$renderer3.push(`<!----> `);
      Textarea($$renderer3, {
        id: "description",
        placeholder: "Describe the role, responsibilities, and what makes this opportunity unique...",
        rows: 6,
        required: true,
        get value() {
          return formData.description;
        },
        set value($$value) {
          formData.description = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div class="card-executive p-6 space-y-4"><h3 class="text-lg font-semibold text-gray-900">Skill Requirements</h3> <p class="text-sm text-slate-400">Add the skills and technologies required for this role</p> `);
      SkillsInput($$renderer3, {
        get skills() {
          return formData.requirements;
        },
        set skills($$value) {
          formData.requirements = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div class="card-executive p-6 space-y-4"><h3 class="text-lg font-semibold text-gray-900">Experience Requirements</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div>`);
      Label($$renderer3, {
        for: "min_years",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Minimum Years`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "min_years",
        type: "number",
        get value() {
          return formData.experience.min_years;
        },
        set value($$value) {
          formData.experience.min_years = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "max_years",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Maximum Years`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "max_years",
        type: "number",
        get value() {
          return formData.experience.max_years;
        },
        set value($$value) {
          formData.experience.max_years = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "preferred",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Preferred Years`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "preferred",
        type: "number",
        get value() {
          return formData.experience.preferred;
        },
        set value($$value) {
          formData.experience.preferred = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div></div> <div class="card-executive p-6 space-y-4"><h3 class="text-lg font-semibold text-gray-900">Compensation</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div>`);
      Label($$renderer3, {
        for: "salary_min",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Minimum Salary (USD)`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "salary_min",
        type: "number",
        get value() {
          return formData.salary_range.min;
        },
        set value($$value) {
          formData.salary_range.min = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div> <div>`);
      Label($$renderer3, {
        for: "salary_max",
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Maximum Salary (USD)`);
        }
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "salary_max",
        type: "number",
        get value() {
          return formData.salary_range.max;
        },
        set value($$value) {
          formData.salary_range.max = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div>`);
      Label($$renderer3, {
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Benefits`);
        }
      });
      $$renderer3.push(`<!----> <div class="flex gap-2 mb-3">`);
      Input($$renderer3, {
        placeholder: "Add a benefit (e.g., Health Insurance)",
        onkeydown: (e) => e.key === "Enter" && (e.preventDefault(), addBenefit()),
        get value() {
          return newBenefit;
        },
        set value($$value) {
          newBenefit = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "button",
        variant: "secondary",
        onclick: addBenefit,
        children: ($$renderer4) => {
          Plus($$renderer4, { class: "w-4 h-4" });
        }
      });
      $$renderer3.push(`<!----></div> `);
      if (formData.benefits.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
        const each_array = ensure_array_like(formData.benefits);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let benefit = each_array[index];
          $$renderer3.push(`<span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 border border-slate-700 text-sm text-slate-300">${escape_html(benefit)} <button type="button" class="text-slate-500 hover:text-danger">`);
          X($$renderer3, { class: "w-3.5 h-3.5" });
          $$renderer3.push(`<!----></button></span>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div> <div class="flex justify-end gap-4">`);
      Button($$renderer3, {
        type: "button",
        variant: "ghost",
        onclick: () => goto(),
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Cancel`);
        }
      });
      $$renderer3.push(`<!----> `);
      Button($$renderer3, {
        type: "submit",
        loading: isSubmitting,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->${escape_html(mode === "edit" ? "Update Job" : "Create Job")}`);
        }
      });
      $$renderer3.push(`<!----></div></form>`);
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
  JobForm as J
};
