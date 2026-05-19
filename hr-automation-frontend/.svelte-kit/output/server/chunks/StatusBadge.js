import { f as attr_class, g as clsx } from "./index2.js";
import { c as cn } from "./Icon.js";
import { Y as escape_html } from "./context.js";
const STATUS_COLORS = {
  // Job statuses
  draft: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" },
  active: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  paused: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  closed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  // Candidate statuses
  applied: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" },
  resume_screened: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  aptitude_eligible: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  aptitude_passed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  aptitude_failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  technical_eligible: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  technical_passed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  technical_failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  hr_eligible: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  hr_passed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  hr_failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  hire_recommended: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  rejected: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  // Interview statuses
  pending: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" },
  in_progress: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  // Pass/Fail
  pass: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  fail: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" }
};
function formatDate(date, options) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options
  });
}
function formatDateTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  if (mins < 60) {
    return remainingSecs > 0 ? `${mins}m ${remainingSecs}s` : `${mins}m`;
  }
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}
function formatSalary(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function formatSalaryRange(min, max, currency = "USD") {
  return `${formatSalary(min, currency)} - ${formatSalary(max, currency)}`;
}
function formatRelativeTime(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1e3);
  if (diffInSeconds < 60) {
    return "just now";
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}w ago`;
  }
  return formatDate(d);
}
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function formatStatus(status) {
  return status.split("_").map((word) => capitalizeFirst(word)).join(" ");
}
function StatusBadge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { status, size = "md", class: className = "" } = $$props;
    const colors = STATUS_COLORS[status] || STATUS_COLORS.draft;
    const sizes = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs" };
    $$renderer2.push(`<span${attr_class(clsx(cn("inline-flex items-center rounded-full font-medium border", colors.bg, colors.text, colors.border, sizes[size], className)))}>${escape_html(formatStatus(status))}</span>`);
  });
}
export {
  StatusBadge as S,
  formatDateTime as a,
  formatDate as b,
  formatRelativeTime as c,
  formatSalaryRange as d,
  formatStatus as e,
  formatDuration as f
};
