import { f as attr_class, g as clsx, a as attr } from "./index2.js";
import { c as cn } from "./Icon.js";
import { Y as escape_html } from "./context.js";
function ScoreGauge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { score, size = "md", showLabel = true, class: className = "" } = $$props;
    const normalizedScore = Math.min(100, Math.max(0, score));
    const getColor = (s) => {
      if (s >= 80) return "text-success";
      if (s >= 60) return "text-royal-400";
      if (s >= 40) return "text-warning";
      return "text-danger";
    };
    const getStrokeColor = (s) => {
      if (s >= 80) return "stroke-success";
      if (s >= 60) return "stroke-royal-400";
      if (s >= 40) return "stroke-warning";
      return "stroke-danger";
    };
    const sizes = {
      sm: { width: 48, strokeWidth: 4, fontSize: "text-sm" },
      md: { width: 64, strokeWidth: 5, fontSize: "text-base" },
      lg: { width: 80, strokeWidth: 6, fontSize: "text-lg" }
    };
    const config = sizes[size];
    const radius = (config.width - config.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - normalizedScore / 100 * circumference;
    $$renderer2.push(`<div${attr_class(clsx(cn("relative inline-flex items-center justify-center", className)))}><svg${attr("width", config.width)}${attr("height", config.width)} class="transform -rotate-90"><circle${attr("cx", config.width / 2)}${attr("cy", config.width / 2)}${attr("r", radius)} fill="none"${attr("stroke-width", config.strokeWidth)} class="stroke-slate-700"></circle><circle${attr("cx", config.width / 2)}${attr("cy", config.width / 2)}${attr("r", radius)} fill="none"${attr("stroke-width", config.strokeWidth)} stroke-linecap="round"${attr("stroke-dasharray", circumference)}${attr("stroke-dashoffset", offset)}${attr_class(clsx(cn("transition-all duration-500", getStrokeColor(normalizedScore))))}></circle></svg> `);
    if (showLabel) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(clsx(cn("absolute font-semibold", config.fontSize, getColor(normalizedScore))))}>${escape_html(Math.round(normalizedScore))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  ScoreGauge as S
};
