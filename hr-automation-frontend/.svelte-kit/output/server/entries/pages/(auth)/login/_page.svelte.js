import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/auth.svelte.js";
import { a as useLogin } from "../../../../chunks/auth.js";
import { B as Button } from "../../../../chunks/Button.js";
import { I as Input } from "../../../../chunks/Input.js";
import { L as Label } from "../../../../chunks/Label.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { M as Mail } from "../../../../chunks/mail.js";
import { L as Lock } from "../../../../chunks/lock.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let formData = { email: "", password: "" };
    let isSubmitting = false;
    useLogin();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="min-h-screen flex items-center justify-center p-4"><div class="w-full max-w-md"><div class="text-center mb-8"><div class="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-royal-600 to-royal-500 mb-4 shadow-lg shadow-royal-500/20">`);
      Sparkles($$renderer3, { class: "w-8 h-8 text-white" });
      $$renderer3.push(`<!----></div> <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1> <p class="text-slate-400">Sign in to your company account</p></div> <form class="card-executive p-8 space-y-6"><div>`);
      Label($$renderer3, {
        for: "email",
        required: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Email Address`);
        }
      });
      $$renderer3.push(`<!----> <div class="relative">`);
      Mail($$renderer3, {
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "email",
        type: "email",
        placeholder: "hr@company.com",
        required: true,
        class: "pl-10",
        get value() {
          return formData.email;
        },
        set value($$value) {
          formData.email = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> <div>`);
      Label($$renderer3, {
        for: "password",
        required: true,
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->Password`);
        }
      });
      $$renderer3.push(`<!----> <div class="relative">`);
      Lock($$renderer3, {
        class: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
      });
      $$renderer3.push(`<!----> `);
      Input($$renderer3, {
        id: "password",
        type: "password",
        placeholder: "••••••••",
        required: true,
        class: "pl-10",
        get value() {
          return formData.password;
        },
        set value($$value) {
          formData.password = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div> `);
      Button($$renderer3, {
        type: "submit",
        loading: isSubmitting,
        class: "w-full",
        children: ($$renderer4) => {
          {
            $$renderer4.push("<!--[!-->");
            $$renderer4.push(`Sign In`);
          }
          $$renderer4.push(`<!--]-->`);
        }
      });
      $$renderer3.push(`<!----> <p class="text-center text-sm text-slate-400">Don't have an account? <a href="/register" class="text-royal-400 hover:text-royal-300 font-medium">Create one</a></p></form></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
