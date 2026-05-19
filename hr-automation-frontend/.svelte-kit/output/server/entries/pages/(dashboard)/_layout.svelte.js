import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { a as authStore } from "../../../chunks/auth.svelte.js";
import { c as sanitize_props, j as spread_props, s as slot, f as attr_class, g as clsx, e as ensure_array_like, d as store_get, a as attr, u as unsubscribe_stores } from "../../../chunks/index2.js";
import { I as Icon, c as cn } from "../../../chunks/Icon.js";
import { p as page } from "../../../chunks/stores.js";
import { u as useLogout } from "../../../chunks/auth.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { S as Sparkles } from "../../../chunks/sparkles.js";
import { S as Settings } from "../../../chunks/settings.js";
import { B as Building_2 } from "../../../chunks/building-2.js";
import { C as Chart_column } from "../../../chunks/chart-column.js";
import { B as Briefcase } from "../../../chunks/briefcase.js";
import { Y as escape_html } from "../../../chunks/context.js";
import { S as Search } from "../../../chunks/search.js";
import { B as Bell } from "../../../chunks/bell.js";
class UIStore {
  sidebarOpen = true;
  sidebarCollapsed = false;
  theme = "dark";
  isMobile = false;
  constructor() {
    if (typeof window !== "undefined") {
      this.checkMobile();
      window.addEventListener("resize", () => this.checkMobile());
    }
  }
  checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  toggleSidebarCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  closeSidebar() {
    this.sidebarOpen = false;
  }
  openSidebar() {
    this.sidebarOpen = true;
  }
  toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", this.theme === "dark");
    }
  }
}
const uiStore = new UIStore();
const ROUTES = {
  // Dashboard
  dashboard: "/dashboard",
  company: "/company",
  // Jobs
  jobs: "/jobs",
  // Analytics
  analytics: "/analytics",
  // Settings
  settings: "/settings"
};
const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: "LayoutDashboard"
  },
  {
    label: "Jobs",
    href: ROUTES.jobs,
    icon: "Briefcase"
  },
  {
    label: "Analytics",
    href: ROUTES.analytics,
    icon: "BarChart3"
  },
  {
    label: "Company",
    href: ROUTES.company,
    icon: "Building2"
  },
  {
    label: "Settings",
    href: ROUTES.settings,
    icon: "Settings"
  }
];
function Chevron_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$renderer, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ChevronLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUgMTgtNi02IDYtNiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/chevron-left
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Layout_dashboard($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "rect",
      { "width": "7", "height": "9", "x": "3", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "14", "y": "3", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "9", "x": "14", "y": "12", "rx": "1" }
    ],
    [
      "rect",
      { "width": "7", "height": "5", "x": "3", "y": "16", "rx": "1" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "layout-dashboard" },
    $$sanitized_props,
    {
      /**
       * @component @name LayoutDashboard
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI5IiB4PSIzIiB5PSIzIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIxNCIgeT0iMyIgcng9IjEiIC8+CiAgPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iOSIgeD0iMTQiIHk9IjEyIiByeD0iMSIgLz4KICA8cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB4PSIzIiB5PSIxNiIgcng9IjEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/layout-dashboard
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Log_out($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }],
    ["polyline", { "points": "16 17 21 12 16 7" }],
    ["line", { "x1": "21", "x2": "9", "y1": "12", "y2": "12" }]
  ];
  Icon($$renderer, spread_props([
    { name: "log-out" },
    $$sanitized_props,
    {
      /**
       * @component @name LogOut
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOSAyMUg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDQiIC8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMTYgMTcgMjEgMTIgMTYgNyIgLz4KICA8bGluZSB4MT0iMjEiIHgyPSI5IiB5MT0iMTIiIHkyPSIxMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/log-out
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Menu($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["line", { "x1": "4", "x2": "20", "y1": "12", "y2": "12" }],
    ["line", { "x1": "4", "x2": "20", "y1": "6", "y2": "6" }],
    ["line", { "x1": "4", "x2": "20", "y1": "18", "y2": "18" }]
  ];
  Icon($$renderer, spread_props([
    { name: "menu" },
    $$sanitized_props,
    {
      /**
       * @component @name Menu
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iNCIgeDI9IjIwIiB5MT0iMTIiIHkyPSIxMiIgLz4KICA8bGluZSB4MT0iNCIgeDI9IjIwIiB5MT0iNiIgeTI9IjYiIC8+CiAgPGxpbmUgeDE9IjQiIHgyPSIyMCIgeTE9IjE4IiB5Mj0iMTgiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/menu
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {}, null);
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const iconMap = { LayoutDashboard: Layout_dashboard, Briefcase, BarChart3: Chart_column, Building2: Building_2, Settings };
    useLogout();
    if (uiStore.sidebarOpen && uiStore.isMobile) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in" role="button" tabindex="-1"></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <aside${attr_class(clsx(cn("fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 shadow-soft", uiStore.sidebarCollapsed ? "w-20" : "w-64", uiStore.sidebarOpen ? "translate-x-0" : "-translate-x-full", "lg:translate-x-0")))}><div class="flex flex-col h-full"><div class="flex items-center justify-between px-4 h-16 border-b border-gray-100">`);
    if (!uiStore.sidebarCollapsed) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a href="/" class="flex items-center gap-2.5 group"><div class="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm group-hover:shadow-purple-md transition-all duration-300">`);
      Sparkles($$renderer2, { class: "w-5 h-5 text-white" });
      $$renderer2.push(`<!----></div> <span class="text-lg font-bold text-gradient-bold">HR Auto</span></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<a href="/" class="mx-auto group"><div class="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-sm group-hover:shadow-purple-md transition-all duration-300">`);
      Sparkles($$renderer2, { class: "w-5 h-5 text-white" });
      $$renderer2.push(`<!----></div></a>`);
    }
    $$renderer2.push(`<!--]--> <button class="hidden lg:flex p-1.5 rounded-lg hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200">`);
    Chevron_left($$renderer2, {
      class: cn("w-5 h-5 transition-transform duration-300", uiStore.sidebarCollapsed && "rotate-180")
    });
    $$renderer2.push(`<!----></button></div> <nav class="flex-1 overflow-y-auto py-4 px-3"><ul class="space-y-1"><!--[-->`);
    const each_array = ensure_array_like(NAV_ITEMS);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const Icon2 = iconMap[item.icon];
      const isActive = store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href || item.href !== "/dashboard" && store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(item.href);
      $$renderer2.push(`<li><a${attr("href", item.href)}${attr_class(clsx(cn("flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group", isActive ? "bg-purple-50 text-purple-700 shadow-purple-sm font-semibold" : "text-gray-500 hover:text-purple-700 hover:bg-purple-50/50")))}>`);
      Icon2($$renderer2, {
        class: cn("w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110", isActive && "text-purple-600")
      });
      $$renderer2.push(`<!----> `);
      if (!uiStore.sidebarCollapsed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="font-medium">${escape_html(item.label)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav> <div class="border-t border-gray-100 p-3">`);
    if (!uiStore.sidebarCollapsed) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-3 px-3 py-2 mb-2"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm"><span class="text-white font-semibold">${escape_html(authStore.displayName?.[0]?.toUpperCase() || "U")}</span></div> <div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-800 truncate">${escape_html(authStore.displayName)}</p> <p class="text-xs text-gray-400 truncate">${escape_html(authStore.email || "")}</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class(clsx(cn("flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200", uiStore.sidebarCollapsed && "justify-center")))}>`);
    Log_out($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> `);
    if (!uiStore.sidebarCollapsed) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="font-medium">Logout</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button></div></div></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title = "" } = $$props;
    $$renderer2.push(`<header class="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-soft"><div class="flex items-center justify-between h-16 px-4 lg:px-6"><div class="flex items-center gap-4"><button class="lg:hidden p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200">`);
    Menu($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> `);
    if (title) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h1 class="text-xl font-bold text-gray-800">${escape_html(title)}</h1>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex items-center gap-3"><div class="hidden md:flex items-center"><div class="relative">`);
    Search($$renderer2, {
      class: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
    });
    $$renderer2.push(`<!----> <input type="text" placeholder="Search..." class="w-64 bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 focus:outline-none focus:bg-white transition-all duration-200"/></div></div> <button class="relative p-2 rounded-xl hover:bg-purple-50 text-gray-400 hover:text-purple-600 transition-all duration-200">`);
    Bell($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full ring-2 ring-white"></span></button> <div class="lg:hidden w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-purple-sm"><span class="text-white text-sm font-semibold">${escape_html(authStore.displayName?.[0]?.toUpperCase() || "U")}</span></div></div></div></header>`);
  });
}
function PageShell($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title = "", children } = $$props;
    $$renderer2.push(`<div class="min-h-screen bg-surface-200">`);
    Sidebar($$renderer2);
    $$renderer2.push(`<!----> <div${attr_class(clsx(cn("transition-all duration-300", uiStore.sidebarCollapsed ? "lg:ml-20" : "lg:ml-64")))}>`);
    Header($$renderer2, { title });
    $$renderer2.push(`<!----> <main class="p-4 lg:p-6 animate-fade-in">`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></main></div></div>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { children } = $$props;
    if (authStore.isAuthenticated) {
      $$renderer2.push("<!--[-->");
      PageShell($$renderer2, {
        children: ($$renderer3) => {
          children($$renderer3);
          $$renderer3.push(`<!---->`);
        }
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="min-h-screen bg-gray-900 flex items-center justify-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent"></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _layout as default
};
