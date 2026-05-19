import { f as attr_class, g as clsx, b as bind_props } from "./index2.js";
import { c as cn } from "./Icon.js";
import { B as Button } from "./Button.js";
import { T as Triangle_alert } from "./triangle-alert.js";
import { Y as escape_html } from "./context.js";
function Dialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onclose, class: className = "", children } = $$props;
    if (open) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in" role="button" tabindex="-1"></div> <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"><div${attr_class(clsx(cn("bg-white border border-gray-200 rounded-2xl shadow-elevated p-6 w-full max-w-md animate-scale-in pointer-events-auto", className)))} role="dialog" aria-modal="true">`);
      children?.($$renderer2);
      $$renderer2.push(`<!----></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}
function ConfirmDialog($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      open = false,
      title = "Are you sure?",
      description = "This action cannot be undone.",
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      variant = "danger",
      loading = false,
      onconfirm,
      oncancel
    } = $$props;
    function handleConfirm() {
      onconfirm?.();
    }
    function handleCancel() {
      open = false;
      oncancel?.();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      Dialog($$renderer3, {
        onclose: handleCancel,
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="flex flex-col items-center text-center"><div${attr_class(`p-3 rounded-full mb-4 ${variant === "danger" ? "bg-red-50" : variant === "warning" ? "bg-amber-50" : "bg-purple-50"}`)}>`);
          Triangle_alert($$renderer4, {
            class: `w-8 h-8 ${variant === "danger" ? "text-red-500" : variant === "warning" ? "text-amber-500" : "text-purple-500"}`
          });
          $$renderer4.push(`<!----></div> <h3 class="text-lg font-bold text-gray-900 mb-2">${escape_html(title)}</h3> <p class="text-gray-500 mb-6">${escape_html(description)}</p> <div class="flex gap-3 w-full">`);
          Button($$renderer4, {
            variant: "secondary",
            onclick: handleCancel,
            class: "flex-1",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html(cancelLabel)}`);
            }
          });
          $$renderer4.push(`<!----> `);
          Button($$renderer4, {
            variant: variant === "danger" ? "danger" : "primary",
            onclick: handleConfirm,
            loading,
            class: "flex-1",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->${escape_html(confirmLabel)}`);
            }
          });
          $$renderer4.push(`<!----></div></div>`);
        },
        $$slots: { default: true }
      });
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open });
  });
}
export {
  ConfirmDialog as C
};
