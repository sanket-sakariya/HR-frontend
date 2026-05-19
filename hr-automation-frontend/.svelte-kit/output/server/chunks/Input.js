import { a as attr, f as attr_class, g as clsx, b as bind_props } from "./index2.js";
import { c as cn } from "./Icon.js";
function Input($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      type = "text",
      placeholder = "",
      value = "",
      disabled = false,
      required = false,
      class: className = "",
      id,
      name,
      oninput,
      onchange
    } = $$props;
    $$renderer2.push(`<input${attr("type", type)}${attr("placeholder", placeholder)}${attr("value", value)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("id", id)}${attr("name", name)}${attr_class(clsx(cn("w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400", "focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none", "transition-all duration-200", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50", className)))}/>`);
    bind_props($$props, { value });
  });
}
export {
  Input as I
};
