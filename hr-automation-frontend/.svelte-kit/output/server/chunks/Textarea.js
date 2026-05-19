import { a as attr, f as attr_class, g as clsx, b as bind_props } from "./index2.js";
import { c as cn } from "./Icon.js";
import { Y as escape_html } from "./context.js";
function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      placeholder = "",
      value = "",
      disabled = false,
      required = false,
      class: className = "",
      id,
      name,
      rows = 4,
      oninput
    } = $$props;
    $$renderer2.push(`<textarea${attr("placeholder", placeholder)}${attr("disabled", disabled, true)}${attr("required", required, true)}${attr("id", id)}${attr("name", name)}${attr("rows", rows)}${attr_class(clsx(cn("w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400", "focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none", "transition-colors duration-200 resize-none", "disabled:opacity-50 disabled:cursor-not-allowed", className)))}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea>`);
    bind_props($$props, { value });
  });
}
export {
  Textarea as T
};
