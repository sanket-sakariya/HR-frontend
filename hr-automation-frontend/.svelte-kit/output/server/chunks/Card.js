import { f as attr_class, g as clsx } from "./index2.js";
import { c as cn } from "./Icon.js";
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", children } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(cn("card-executive", className)))}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  Card as C
};
