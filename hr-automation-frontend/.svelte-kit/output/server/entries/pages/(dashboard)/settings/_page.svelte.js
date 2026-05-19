import { c as sanitize_props, j as spread_props, s as slot, m as head, e as ensure_array_like, f as attr_class, n as stringify } from "../../../../chunks/index2.js";
import "../../../../chunks/auth.svelte.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import "clsx";
import { L as Label } from "../../../../chunks/Label.js";
import { S as Select } from "../../../../chunks/Select.js";
import { a as toast } from "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { Y as escape_html } from "../../../../chunks/context.js";
import { S as Settings } from "../../../../chunks/settings.js";
import { B as Bell } from "../../../../chunks/bell.js";
import { L as Lock } from "../../../../chunks/lock.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { S as Save } from "../../../../chunks/save.js";
function Key($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"
      }
    ],
    ["path", { "d": "m21 2-9.6 9.6" }],
    ["circle", { "cx": "7.5", "cy": "15.5", "r": "5.5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "key" },
    $$sanitized_props,
    {
      /**
       * @component @name Key
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJtMTUuNSA3LjUgMi4zIDIuM2ExIDEgMCAwIDAgMS40IDBsMi4xLTIuMWExIDEgMCAwIDAgMC0xLjRMMTkgNCIgLz4KICA8cGF0aCBkPSJtMjEgMi05LjYgOS42IiAvPgogIDxjaXJjbGUgY3g9IjcuNSIgY3k9IjE1LjUiIHI9IjUuNSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/key
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let activeTab = "general";
    let language = "en";
    let timezone = "UTC";
    let dateFormat = "MM/DD/YYYY";
    const languageOptions = [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
      { value: "de", label: "German" }
    ];
    const timezoneOptions = [
      { value: "UTC", label: "UTC" },
      { value: "America/New_York", label: "Eastern Time (US)" },
      { value: "America/Los_Angeles", label: "Pacific Time (US)" },
      { value: "Europe/London", label: "London" },
      { value: "Europe/Paris", label: "Paris" },
      { value: "Asia/Tokyo", label: "Tokyo" }
    ];
    const dateFormatOptions = [
      { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
      { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
      { value: "YYYY-MM-DD", label: "YYYY-MM-DD" }
    ];
    const tabs = [
      { id: "general", label: "General", icon: Settings },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "security", label: "Security", icon: Lock },
      { id: "api", label: "API Keys", icon: Key }
    ];
    function saveGeneralSettings() {
      toast.success("General settings saved");
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1lxsqhe", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Settings | HR Automation</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Settings</h1> <p class="text-gray-500 mt-1">Manage your account and application preferences</p></div> <div class="flex flex-col lg:flex-row gap-6"><nav class="lg:w-56 flex-shrink-0">`);
      Card($$renderer3, {
        class: "p-2",
        children: ($$renderer4) => {
          $$renderer4.push(`<div class="space-y-1"><!--[-->`);
          const each_array = ensure_array_like(tabs);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let tab = each_array[$$index];
            $$renderer4.push(`<button${attr_class(`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${stringify(activeTab === tab.id ? "bg-royal-600 text-white" : "text-gray-600 hover:bg-gray-100")}`)}>`);
            $$renderer4.push("<!---->");
            tab.icon?.($$renderer4, { class: "w-5 h-5" });
            $$renderer4.push(`<!----> ${escape_html(tab.label)}</button>`);
          }
          $$renderer4.push(`<!--]--></div>`);
        }
      });
      $$renderer3.push(`<!----></nav> <div class="flex-1">`);
      {
        $$renderer3.push("<!--[-->");
        Card($$renderer3, {
          class: "p-6",
          children: ($$renderer4) => {
            $$renderer4.push(`<h2 class="text-lg font-semibold text-gray-900 mb-6">General Settings</h2> <div class="space-y-6 max-w-md"><div>`);
            Label($$renderer4, {
              for: "language",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Language`);
              }
            });
            $$renderer4.push(`<!----> `);
            Select($$renderer4, {
              id: "language",
              options: languageOptions,
              get value() {
                return language;
              },
              set value($$value) {
                language = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div>`);
            Label($$renderer4, {
              for: "timezone",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Timezone`);
              }
            });
            $$renderer4.push(`<!----> `);
            Select($$renderer4, {
              id: "timezone",
              options: timezoneOptions,
              get value() {
                return timezone;
              },
              set value($$value) {
                timezone = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> <div>`);
            Label($$renderer4, {
              for: "dateFormat",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Date Format`);
              }
            });
            $$renderer4.push(`<!----> `);
            Select($$renderer4, {
              id: "dateFormat",
              options: dateFormatOptions,
              get value() {
                return dateFormat;
              },
              set value($$value) {
                dateFormat = $$value;
                $$settled = false;
              }
            });
            $$renderer4.push(`<!----></div> `);
            Button($$renderer4, {
              onclick: saveGeneralSettings,
              children: ($$renderer5) => {
                Save($$renderer5, { class: "w-4 h-4 mr-2" });
                $$renderer5.push(`<!----> Save Changes`);
              }
            });
            $$renderer4.push(`<!----></div>`);
          }
        });
      }
      $$renderer3.push(`<!--]--></div></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};
