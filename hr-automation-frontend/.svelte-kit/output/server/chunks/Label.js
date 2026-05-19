import { a as attr, f as attr_class, g as clsx } from "./index2.js";
import { c as cn } from "./Icon.js";
function Label($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      for: htmlFor,
      required = false,
      class: className = "",
      children
    } = $$props;
    $$renderer2.push(`<label${attr("for", htmlFor)}${attr_class(clsx(cn("block text-sm font-semibold text-gray-700 mb-1.5", className)))}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----> `);
    if (required) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-purple-500 ml-0.5">*</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></label>`);
  });
}
export {
  Label as L
};
