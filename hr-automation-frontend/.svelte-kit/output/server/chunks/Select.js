import { e as ensure_array_like, b as bind_props } from "./index2.js";
import { c as cn } from "./Icon.js";
import { Y as escape_html } from "./context.js";
function Select($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      value = "",
      placeholder = "Select an option",
      disabled = false,
      required = false,
      class: className = "",
      id,
      name,
      onchange
    } = $$props;
    $$renderer2.select(
      {
        value,
        disabled,
        required,
        id,
        name,
        onchange,
        class: cn("w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800", "focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none", "transition-all duration-200 appearance-none cursor-pointer", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50", `bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")] bg-[length:1.5rem] bg-[right_0.5rem_center] bg-no-repeat pr-10`, className)
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "", disabled: true, class: "text-gray-400" }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(placeholder)}`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(options);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value, class: "bg-white text-gray-800" }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    bind_props($$props, { value });
  });
}
export {
  Select as S
};
