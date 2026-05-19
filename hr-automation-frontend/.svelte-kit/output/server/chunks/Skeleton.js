import { f as attr_class, g as clsx } from "./index2.js";
import { c as cn } from "./Icon.js";
function Skeleton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "" } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(cn("animate-pulse rounded-xl bg-gray-200/60", className)))}></div>`);
  });
}
export {
  Skeleton as S
};
