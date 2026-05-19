import { c as sanitize_props, j as spread_props, s as slot, d as store_get, u as unsubscribe_stores, m as head, e as ensure_array_like, f as attr_class, n as stringify } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { g as goto } from "../../../../chunks/client.js";
import { d as createJobQuery } from "../../../../chunks/jobs.js";
import { e as createApplyMutation } from "../../../../chunks/candidates.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import { T as Textarea } from "../../../../chunks/Textarea.js";
import { L as Label } from "../../../../chunks/Label.js";
import { C as Card } from "../../../../chunks/Card.js";
import { S as Skeleton } from "../../../../chunks/Skeleton.js";
import "clsx";
import { a as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { Y as escape_html } from "../../../../chunks/context.js";
import { B as Building_2 } from "../../../../chunks/building-2.js";
import { B as Briefcase } from "../../../../chunks/briefcase.js";
import { M as Map_pin } from "../../../../chunks/map-pin.js";
import { C as Clock } from "../../../../chunks/clock.js";
import { D as Dollar_sign } from "../../../../chunks/dollar-sign.js";
import { U as User } from "../../../../chunks/user.js";
import { F as File_text } from "../../../../chunks/file-text.js";
import { C as Circle_check_big } from "../../../../chunks/circle-check-big.js";
import { M as Mail } from "../../../../chunks/mail.js";
import { P as Phone } from "../../../../chunks/phone.js";
import { L as Linkedin } from "../../../../chunks/linkedin.js";
import { G as Globe } from "../../../../chunks/globe.js";
import { A as Arrow_right } from "../../../../chunks/arrow-right.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { U as Upload } from "../../../../chunks/upload.js";
import { A as Arrow_left } from "../../../../chunks/arrow-left.js";
function Calendar_clock($$renderer, $$props) {
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
        "d": "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"
      }
    ],
    ["path", { "d": "M16 2v4" }],
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M3 10h5" }],
    ["path", { "d": "M17.5 17.5 16 16.3V14" }],
    ["circle", { "cx": "16", "cy": "16", "r": "6" }]
  ];
  Icon($$renderer, spread_props([
    { name: "calendar-clock" },
    $$sanitized_props,
    {
      /**
       * @component @name CalendarClock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgNy41VjZhMiAyIDAgMCAwLTItMkg1YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgzLjUiIC8+CiAgPHBhdGggZD0iTTE2IDJ2NCIgLz4KICA8cGF0aCBkPSJNOCAydjQiIC8+CiAgPHBhdGggZD0iTTMgMTBoNSIgLz4KICA8cGF0aCBkPSJNMTcuNSAxNy41IDE2IDE2LjNWMTQiIC8+CiAgPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/calendar-clock
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
function Send($$renderer, $$props) {
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
        "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"
      }
    ],
    ["path", { "d": "m21.854 2.147-10.94 10.939" }]
  ];
  Icon($$renderer, spread_props([
    { name: "send" },
    $$sanitized_props,
    {
      /**
       * @component @name Send
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQuNTM2IDIxLjY4NmEuNS41IDAgMCAwIC45MzctLjAyNGw2LjUtMTlhLjQ5Ni40OTYgMCAwIDAtLjYzNS0uNjM1bC0xOSA2LjVhLjUuNSAwIDAgMC0uMDI0LjkzN2w3LjkzIDMuMThhMiAyIDAgMCAxIDEuMTEyIDEuMTF6IiAvPgogIDxwYXRoIGQ9Im0yMS44NTQgMi4xNDctMTAuOTQgMTAuOTM5IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/send
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
function Wallet($$renderer, $$props) {
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
        "d": "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
      }
    ],
    ["path", { "d": "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "wallet" },
    $$sanitized_props,
    {
      /**
       * @component @name Wallet
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgN1Y0YTEgMSAwIDAgMC0xLTFINWEyIDIgMCAwIDAgMCA0aDE1YTEgMSAwIDAgMSAxIDF2NGgtM2EyIDIgMCAwIDAgMCA0aDNhMSAxIDAgMCAwIDEtMXYtMmExIDEgMCAwIDAtMS0xIiAvPgogIDxwYXRoIGQ9Ik0zIDV2MTRhMiAyIDAgMCAwIDIgMmgxNWExIDEgMCAwIDAgMS0xdi00IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/wallet
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
    const jobQuery = createJobQuery(jobId);
    const applyMutation = createApplyMutation();
    let currentStep = 1;
    let formData = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      current_location: "",
      willing_to_relocate: "false",
      skills: "",
      expected_salary: "",
      notice_period: "",
      linkedin_url: "",
      portfolio_url: ""
    };
    const job = store_get($$store_subs ??= {}, "$jobQuery", jobQuery).data;
    async function handleSubmit() {
      {
        toast.error("Please fill in all required fields", {
          description: "First name, last name, email and resume are required"
        });
        return;
      }
    }
    function nextStep() {
      if (currentStep === 1) {
        if (!formData.first_name || !formData.last_name || !formData.email) {
          toast.error("Please fill in required fields");
          return;
        }
      }
      if (currentStep < 3) currentStep++;
    }
    function prevStep() {
      if (currentStep > 1) currentStep--;
    }
    const steps = [
      { id: 1, label: "Personal Info", icon: User },
      { id: 2, label: "Experience", icon: Briefcase },
      { id: 3, label: "Documents", icon: File_text }
    ];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("19h4m9j", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>${escape_html(job?.title || "Apply")} | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-surface-300"><header class="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-10"><div class="max-w-6xl mx-auto px-4 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm">`);
      Building_2($$renderer3, { class: "w-5 h-5 text-white" });
      $$renderer3.push(`<!----></div> <div><h1 class="font-semibold text-gray-800">HR Automation</h1> <p class="text-xs text-gray-500">Career Opportunities</p></div></div></div></header> <main class="max-w-6xl mx-auto px-4 py-8">`);
      if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).isLoading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-1">`);
        Skeleton($$renderer3, { class: "h-72" });
        $$renderer3.push(`<!----></div> <div class="lg:col-span-2">`);
        Skeleton($$renderer3, { class: "h-96" });
        $$renderer3.push(`<!----></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$jobQuery", jobQuery).error || !job) {
          $$renderer3.push("<!--[-->");
          Card($$renderer3, {
            class: "p-12 text-center max-w-lg mx-auto",
            children: ($$renderer4) => {
              $$renderer4.push(`<div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">`);
              Briefcase($$renderer4, { class: "w-10 h-10 text-gray-400" });
              $$renderer4.push(`<!----></div> <h2 class="text-2xl font-bold text-gray-800 mb-3">Job Not Found</h2> <p class="text-gray-500 mb-8">This job posting may have been removed or is no longer accepting applications.</p> `);
              Button($$renderer4, {
                onclick: () => goto(),
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->Browse Other Jobs`);
                }
              });
              $$renderer4.push(`<!---->`);
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
          {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-1 order-2 lg:order-1"><div class="lg:sticky lg:top-24 space-y-6">`);
            Card($$renderer3, {
              class: "p-6",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="flex items-start gap-4 mb-6"><div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">`);
                Briefcase($$renderer4, { class: "w-6 h-6 text-white" });
                $$renderer4.push(`<!----></div> <div><h2 class="text-xl font-bold text-gray-800">${escape_html(job.title)}</h2> `);
                if (job.department) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<p class="text-sm text-gray-500">${escape_html(job.department)}</p>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div></div> <div class="space-y-3 mb-6">`);
                if (job.location) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3 text-gray-600"><div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">`);
                  Map_pin($$renderer4, { class: "w-4 h-4 text-gray-500" });
                  $$renderer4.push(`<!----></div> <span class="text-sm">${escape_html(job.location)}</span></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (job.job_type) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3 text-gray-600"><div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">`);
                  Clock($$renderer4, { class: "w-4 h-4 text-gray-500" });
                  $$renderer4.push(`<!----></div> <span class="text-sm capitalize">${escape_html(job.job_type)}</span></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (job.salary_min && job.salary_max) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="flex items-center gap-3 text-gray-600"><div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">`);
                  Dollar_sign($$renderer4, { class: "w-4 h-4 text-gray-500" });
                  $$renderer4.push(`<!----></div> <span class="text-sm">$${escape_html(job.salary_min.toLocaleString())} - $${escape_html(job.salary_max.toLocaleString())}</span></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div> `);
                if (job.requirements && job.requirements.length > 0) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="pt-4 border-t border-gray-100"><h3 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Required Skills</h3> <div class="flex flex-wrap gap-2"><!--[-->`);
                  const each_array = ensure_array_like(job.requirements);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let req = each_array[$$index];
                    $$renderer4.push(`<span class="px-2.5 py-1 text-xs bg-purple-50 text-purple-700 rounded-full border border-purple-100">${escape_html(req.skill)}</span>`);
                  }
                  $$renderer4.push(`<!--]--></div></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]-->`);
              }
            });
            $$renderer3.push(`<!----> `);
            if (job.description) {
              $$renderer3.push("<!--[-->");
              Card($$renderer3, {
                class: "p-6",
                children: ($$renderer4) => {
                  $$renderer4.push(`<h3 class="text-sm font-medium text-gray-700 mb-3">About this role</h3> <p class="text-sm text-gray-500 leading-relaxed line-clamp-8">${escape_html(job.description)}</p>`);
                }
              });
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--></div></div> <div class="lg:col-span-2 order-1 lg:order-2">`);
            Card($$renderer3, {
              class: "p-6 lg:p-8",
              children: ($$renderer4) => {
                $$renderer4.push(`<div class="mb-8"><h2 class="text-2xl font-bold text-gray-800 mb-2">Apply for this Position</h2> <p class="text-gray-500">Fill out the form below to submit your application</p></div> <div class="flex items-center justify-between mb-8 px-4"><!--[-->`);
                const each_array_1 = ensure_array_like(steps);
                for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                  let step = each_array_1[i];
                  const StepIcon = step.icon;
                  $$renderer4.push(`<div class="flex items-center"><div class="flex flex-col items-center"><div${attr_class(`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${stringify(currentStep >= step.id ? "bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm" : "bg-gray-100")}`)}>`);
                  if (currentStep > step.id) {
                    $$renderer4.push("<!--[-->");
                    Circle_check_big($$renderer4, { class: "w-6 h-6 text-white" });
                  } else {
                    $$renderer4.push("<!--[!-->");
                    $$renderer4.push("<!---->");
                    StepIcon?.($$renderer4, {
                      class: `w-5 h-5 ${stringify(currentStep >= step.id ? "text-white" : "text-gray-400")}`
                    });
                    $$renderer4.push(`<!---->`);
                  }
                  $$renderer4.push(`<!--]--></div> <span${attr_class(`mt-2 text-xs font-medium ${stringify(currentStep >= step.id ? "text-purple-600" : "text-gray-400")}`)}>${escape_html(step.label)}</span></div> `);
                  if (i < steps.length - 1) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div${attr_class(`w-16 lg:w-24 h-1 mx-2 rounded-full ${stringify(currentStep > step.id ? "bg-purple-500" : "bg-gray-200")}`)}></div>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                  }
                  $$renderer4.push(`<!--]--></div>`);
                }
                $$renderer4.push(`<!--]--></div> `);
                if (currentStep === 1) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="space-y-5 animate-fade-in"><div class="grid sm:grid-cols-2 gap-5"><div>`);
                  Label($$renderer4, {
                    for: "first_name",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->First Name <span class="text-red-500">*</span>`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  User($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "first_name",
                    placeholder: "John",
                    class: "pl-10",
                    required: true,
                    get value() {
                      return formData.first_name;
                    },
                    set value($$value) {
                      formData.first_name = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div> <div>`);
                  Label($$renderer4, {
                    for: "last_name",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Last Name <span class="text-red-500">*</span>`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  User($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "last_name",
                    placeholder: "Doe",
                    class: "pl-10",
                    required: true,
                    get value() {
                      return formData.last_name;
                    },
                    set value($$value) {
                      formData.last_name = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div></div> <div class="grid sm:grid-cols-2 gap-5"><div>`);
                  Label($$renderer4, {
                    for: "email",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Email Address <span class="text-red-500">*</span>`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Mail($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "email",
                    type: "email",
                    placeholder: "john@example.com",
                    class: "pl-10",
                    required: true,
                    get value() {
                      return formData.email;
                    },
                    set value($$value) {
                      formData.email = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div> <div>`);
                  Label($$renderer4, {
                    for: "phone",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Phone Number`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Phone($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "phone",
                    type: "tel",
                    placeholder: "+1 (555) 000-0000",
                    class: "pl-10",
                    get value() {
                      return formData.phone;
                    },
                    set value($$value) {
                      formData.phone = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div></div> <div class="grid sm:grid-cols-2 gap-5"><div>`);
                  Label($$renderer4, {
                    for: "location",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Current Location`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Map_pin($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "location",
                    placeholder: "City, Country",
                    class: "pl-10",
                    get value() {
                      return formData.current_location;
                    },
                    set value($$value) {
                      formData.current_location = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div> <div>`);
                  Label($$renderer4, {
                    for: "relocate",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Willing to Relocate?`);
                    }
                  });
                  $$renderer4.push(`<!----> `);
                  $$renderer4.select(
                    {
                      id: "relocate",
                      value: formData.willing_to_relocate,
                      class: "mt-1.5 w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                    },
                    ($$renderer5) => {
                      $$renderer5.option({ value: "false" }, ($$renderer6) => {
                        $$renderer6.push(`No`);
                      });
                      $$renderer5.option({ value: "true" }, ($$renderer6) => {
                        $$renderer6.push(`Yes`);
                      });
                    }
                  );
                  $$renderer4.push(`</div></div> <div class="grid sm:grid-cols-2 gap-5"><div>`);
                  Label($$renderer4, {
                    for: "linkedin",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->LinkedIn Profile`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Linkedin($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "linkedin",
                    type: "url",
                    placeholder: "https://linkedin.com/in/...",
                    class: "pl-10",
                    get value() {
                      return formData.linkedin_url;
                    },
                    set value($$value) {
                      formData.linkedin_url = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div> <div>`);
                  Label($$renderer4, {
                    for: "portfolio",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Portfolio / Website`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Globe($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "portfolio",
                    type: "url",
                    placeholder: "https://...",
                    class: "pl-10",
                    get value() {
                      return formData.portfolio_url;
                    },
                    set value($$value) {
                      formData.portfolio_url = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div></div></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (currentStep === 2) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="space-y-5 animate-fade-in"><div class="grid sm:grid-cols-2 gap-5"><div>`);
                  Label($$renderer4, {
                    for: "salary",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Expected Salary (Annual)`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Wallet($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "salary",
                    placeholder: "$80,000",
                    class: "pl-10",
                    get value() {
                      return formData.expected_salary;
                    },
                    set value($$value) {
                      formData.expected_salary = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div> <div>`);
                  Label($$renderer4, {
                    for: "notice",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Notice Period`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="relative mt-1.5">`);
                  Calendar_clock($$renderer4, {
                    class: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  });
                  $$renderer4.push(`<!----> `);
                  Input($$renderer4, {
                    id: "notice",
                    placeholder: "2 weeks / Immediate",
                    class: "pl-10",
                    get value() {
                      return formData.notice_period;
                    },
                    set value($$value) {
                      formData.notice_period = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div></div></div> <div>`);
                  Label($$renderer4, {
                    for: "skills",
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Your Skills`);
                    }
                  });
                  $$renderer4.push(`<!----> <p class="text-xs text-gray-500 mt-1 mb-2">List your relevant skills separated by commas</p> `);
                  Textarea($$renderer4, {
                    id: "skills",
                    placeholder: "JavaScript, Python, React, Node.js, SQL, AWS...",
                    rows: 4,
                    get value() {
                      return formData.skills;
                    },
                    set value($$value) {
                      formData.skills = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer4.push(`<!----></div> <div class="p-4 rounded-xl bg-purple-50 border border-purple-100"><div class="flex gap-3">`);
                  Sparkles($$renderer4, { class: "w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" });
                  $$renderer4.push(`<!----> <div><p class="text-sm font-medium text-purple-800">Pro tip</p> <p class="text-xs text-purple-600 mt-1">Include skills that match the job requirements for better chances of selection.</p></div></div></div></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> `);
                if (currentStep === 3) {
                  $$renderer4.push("<!--[-->");
                  $$renderer4.push(`<div class="space-y-6 animate-fade-in"><div>`);
                  Label($$renderer4, {
                    class: "text-gray-700",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Resume / CV <span class="text-red-500">*</span>`);
                    }
                  });
                  $$renderer4.push(`<!----> <div class="mt-2"><label${attr_class(`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${stringify("border-gray-300 hover:border-purple-400 hover:bg-purple-50/50")}`)}>`);
                  {
                    $$renderer4.push("<!--[!-->");
                    $$renderer4.push(`<div class="text-center"><div class="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-3">`);
                    Upload($$renderer4, { class: "w-8 h-8 text-purple-600" });
                    $$renderer4.push(`<!----></div> <p class="text-gray-700 font-medium">${escape_html("Click or drag to upload")}</p> <p class="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (Max 10MB)</p></div>`);
                  }
                  $$renderer4.push(`<!--]--> <input type="file" accept=".pdf,.doc,.docx" class="hidden"/></label></div></div> <div class="rounded-xl border border-gray-200 overflow-hidden"><div class="bg-gray-50 px-5 py-3 border-b border-gray-200"><h3 class="font-semibold text-gray-800">Application Summary</h3></div> <div class="p-5"><dl class="grid sm:grid-cols-2 gap-4 text-sm"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">`);
                  User($$renderer4, { class: "w-4 h-4 text-purple-600" });
                  $$renderer4.push(`<!----></div> <div><dt class="text-xs text-gray-500">Full Name</dt> <dd class="font-medium text-gray-800">${escape_html(formData.first_name)} ${escape_html(formData.last_name || "-")}</dd></div></div> <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">`);
                  Mail($$renderer4, { class: "w-4 h-4 text-purple-600" });
                  $$renderer4.push(`<!----></div> <div><dt class="text-xs text-gray-500">Email</dt> <dd class="font-medium text-gray-800">${escape_html(formData.email || "-")}</dd></div></div> <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">`);
                  Map_pin($$renderer4, { class: "w-4 h-4 text-purple-600" });
                  $$renderer4.push(`<!----></div> <div><dt class="text-xs text-gray-500">Location</dt> <dd class="font-medium text-gray-800">${escape_html(formData.current_location || "-")}</dd></div></div> <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">`);
                  Wallet($$renderer4, { class: "w-4 h-4 text-purple-600" });
                  $$renderer4.push(`<!----></div> <div><dt class="text-xs text-gray-500">Expected Salary</dt> <dd class="font-medium text-gray-800">${escape_html(formData.expected_salary || "-")}</dd></div></div></dl></div></div> `);
                  {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<div class="p-4 rounded-xl bg-amber-50 border border-amber-200"><div class="flex gap-3">`);
                    File_text($$renderer4, { class: "w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" });
                    $$renderer4.push(`<!----> <div><p class="text-sm font-medium text-amber-800">Resume required</p> <p class="text-xs text-amber-600 mt-1">Please upload your resume to complete your application.</p></div></div></div>`);
                  }
                  $$renderer4.push(`<!--]--></div>`);
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--> <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">`);
                if (currentStep > 1) {
                  $$renderer4.push("<!--[-->");
                  Button($$renderer4, {
                    variant: "outline",
                    onclick: prevStep,
                    children: ($$renderer5) => {
                      Arrow_left($$renderer5, { class: "w-4 h-4" });
                      $$renderer5.push(`<!----> Back`);
                    }
                  });
                } else {
                  $$renderer4.push("<!--[!-->");
                  $$renderer4.push(`<div></div>`);
                }
                $$renderer4.push(`<!--]--> `);
                if (currentStep < 3) {
                  $$renderer4.push("<!--[-->");
                  Button($$renderer4, {
                    onclick: nextStep,
                    size: "lg",
                    children: ($$renderer5) => {
                      $$renderer5.push(`<!---->Continue `);
                      Arrow_right($$renderer5, { class: "w-4 h-4" });
                      $$renderer5.push(`<!---->`);
                    }
                  });
                } else {
                  $$renderer4.push("<!--[!-->");
                  Button($$renderer4, {
                    onclick: handleSubmit,
                    disabled: store_get($$store_subs ??= {}, "$applyMutation", applyMutation).isPending || true,
                    size: "lg",
                    children: ($$renderer5) => {
                      if (store_get($$store_subs ??= {}, "$applyMutation", applyMutation).isPending) {
                        $$renderer5.push("<!--[-->");
                        $$renderer5.push(`Submitting...`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                        Send($$renderer5, { class: "w-4 h-4" });
                        $$renderer5.push(`<!----> Submit Application`);
                      }
                      $$renderer5.push(`<!--]-->`);
                    }
                  });
                }
                $$renderer4.push(`<!--]--></div>`);
              }
            });
            $$renderer3.push(`<!----></div></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--></main> <footer class="py-8 text-center"><p class="text-xs text-gray-400">Powered by HR Automation Platform</p></footer></div>`);
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
