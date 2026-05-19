import { c as sanitize_props, j as spread_props, s as slot, f as attr_class, g as clsx, a as attr, e as ensure_array_like, h as attr_style, n as stringify } from "./index2.js";
import { I as Icon, c as cn } from "./Icon.js";
import "clsx";
import { A as API_URLS } from "./client2.js";
import { Y as escape_html } from "./context.js";
import { M as Message_square } from "./message-square.js";
import { U as User } from "./user.js";
import { V as Video } from "./video.js";
import { S as Settings } from "./settings.js";
import { C as Clock } from "./clock.js";
import { C as Card } from "./Card.js";
import { B as Button } from "./Button.js";
import { C as Circle_check_big } from "./circle-check-big.js";
import { C as Circle_alert } from "./circle-alert.js";
import { W as Wifi } from "./wifi.js";
import { R as Refresh_cw } from "./refresh-cw.js";
function Bot($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 8V4H8" }],
    [
      "rect",
      { "width": "16", "height": "12", "x": "4", "y": "8", "rx": "2" }
    ],
    ["path", { "d": "M2 14h2" }],
    ["path", { "d": "M20 14h2" }],
    ["path", { "d": "M15 13v2" }],
    ["path", { "d": "M9 13v2" }]
  ];
  Icon($$renderer, spread_props([
    { name: "bot" },
    $$sanitized_props,
    {
      /**
       * @component @name Bot
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgOFY0SDgiIC8+CiAgPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiB4PSI0IiB5PSI4IiByeD0iMiIgLz4KICA8cGF0aCBkPSJNMiAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0yMCAxNGgyIiAvPgogIDxwYXRoIGQ9Ik0xNSAxM3YyIiAvPgogIDxwYXRoIGQ9Ik05IDEzdjIiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/bot
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
function Camera($$renderer, $$props) {
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
        "d": "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      }
    ],
    ["circle", { "cx": "12", "cy": "13", "r": "3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "camera" },
    $$sanitized_props,
    {
      /**
       * @component @name Camera
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTQuNSA0aC01TDcgN0g0YTIgMiAwIDAgMC0yIDJ2OWEyIDIgMCAwIDAgMiAyaDE2YTIgMiAwIDAgMCAyLTJWOWEyIDIgMCAwIDAtMi0yaC0zbC0yLjUtM3oiIC8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMyIgcj0iMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/camera
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
function Maximize($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M8 3H5a2 2 0 0 0-2 2v3" }],
    ["path", { "d": "M21 8V5a2 2 0 0 0-2-2h-3" }],
    ["path", { "d": "M3 16v3a2 2 0 0 0 2 2h3" }],
    ["path", { "d": "M16 21h3a2 2 0 0 0 2-2v-3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "maximize" },
    $$sanitized_props,
    {
      /**
       * @component @name Maximize
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYzIiAvPgogIDxwYXRoIGQ9Ik0yMSA4VjVhMiAyIDAgMCAwLTItMmgtMyIgLz4KICA8cGF0aCBkPSJNMyAxNnYzYTIgMiAwIDAgMCAyIDJoMyIgLz4KICA8cGF0aCBkPSJNMTYgMjFoM2EyIDIgMCAwIDAgMi0ydi0zIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/maximize
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
function Mic_off($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["line", { "x1": "2", "x2": "22", "y1": "2", "y2": "22" }],
    ["path", { "d": "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" }],
    ["path", { "d": "M5 10v2a7 7 0 0 0 12 5" }],
    ["path", { "d": "M15 9.34V5a3 3 0 0 0-5.68-1.33" }],
    ["path", { "d": "M9 9v3a3 3 0 0 0 5.12 2.12" }],
    ["line", { "x1": "12", "x2": "12", "y1": "19", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "mic-off" },
    $$sanitized_props,
    {
      /**
       * @component @name MicOff
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMiIgeDI9IjIyIiB5MT0iMiIgeTI9IjIyIiAvPgogIDxwYXRoIGQ9Ik0xOC44OSAxMy4yM0E3LjEyIDcuMTIgMCAwIDAgMTkgMTJ2LTIiIC8+CiAgPHBhdGggZD0iTTUgMTB2MmE3IDcgMCAwIDAgMTIgNSIgLz4KICA8cGF0aCBkPSJNMTUgOS4zNFY1YTMgMyAwIDAgMC01LjY4LTEuMzMiIC8+CiAgPHBhdGggZD0iTTkgOXYzYTMgMyAwIDAgMCA1LjEyIDIuMTIiIC8+CiAgPGxpbmUgeDE9IjEyIiB4Mj0iMTIiIHkxPSIxOSIgeTI9IjIyIiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/mic-off
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
function Mic($$renderer, $$props) {
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
      { "d": "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }
    ],
    ["path", { "d": "M19 10v2a7 7 0 0 1-14 0v-2" }],
    ["line", { "x1": "12", "x2": "12", "y1": "19", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "mic" },
    $$sanitized_props,
    {
      /**
       * @component @name Mic
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMmEzIDMgMCAwIDAtMyAzdjdhMyAzIDAgMCAwIDYgMFY1YTMgMyAwIDAgMC0zLTNaIiAvPgogIDxwYXRoIGQ9Ik0xOSAxMHYyYTcgNyAwIDAgMS0xNCAwdi0yIiAvPgogIDxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iMTkiIHkyPSIyMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/mic
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
function Phone_off($$renderer, $$props) {
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
        "d": "M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"
      }
    ],
    ["line", { "x1": "22", "x2": "2", "y1": "2", "y2": "22" }]
  ];
  Icon($$renderer, spread_props([
    { name: "phone-off" },
    $$sanitized_props,
    {
      /**
       * @component @name PhoneOff
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAuNjggMTMuMzFhMTYgMTYgMCAwIDAgMy40MSAyLjZsMS4yNy0xLjI3YTIgMiAwIDAgMSAyLjExLS40NSAxMi44NCAxMi44NCAwIDAgMCAyLjgxLjcgMiAyIDAgMCAxIDEuNzIgMnYzYTIgMiAwIDAgMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwIDEtOC42My0zLjA3IDE5LjQyIDE5LjQyIDAgMCAxLTMuMzMtMi42N20tMi42Ny0zLjM0YTE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42M0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTEiIC8+CiAgPGxpbmUgeDE9IjIyIiB4Mj0iMiIgeTE9IjIiIHkyPSIyMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/phone-off
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
function Video_off($$renderer, $$props) {
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
        "d": "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"
      }
    ],
    [
      "path",
      {
        "d": "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"
      }
    ],
    ["path", { "d": "m2 2 20 20" }]
  ];
  Icon($$renderer, spread_props([
    { name: "video-off" },
    $$sanitized_props,
    {
      /**
       * @component @name VideoOff
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTAuNjYgNkgxNGEyIDIgMCAwIDEgMiAydjIuNWw1LjI0OC0zLjA2MkEuNS41IDAgMCAxIDIyIDcuODd2OC4xOTYiIC8+CiAgPHBhdGggZD0iTTE2IDE2YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmgyIiAvPgogIDxwYXRoIGQ9Im0yIDIgMjAgMjAiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/video-off
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
function Wifi_off($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M12 20h.01" }],
    ["path", { "d": "M8.5 16.429a5 5 0 0 1 7 0" }],
    ["path", { "d": "M5 12.859a10 10 0 0 1 5.17-2.69" }],
    ["path", { "d": "M19 12.859a10 10 0 0 0-2.007-1.523" }],
    ["path", { "d": "M2 8.82a15 15 0 0 1 4.177-2.643" }],
    ["path", { "d": "M22 8.82a15 15 0 0 0-11.288-3.764" }],
    ["path", { "d": "m2 2 20 20" }]
  ];
  Icon($$renderer, spread_props([
    { name: "wifi-off" },
    $$sanitized_props,
    {
      /**
       * @component @name WifiOff
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTIgMjBoLjAxIiAvPgogIDxwYXRoIGQ9Ik04LjUgMTYuNDI5YTUgNSAwIDAgMSA3IDAiIC8+CiAgPHBhdGggZD0iTTUgMTIuODU5YTEwIDEwIDAgMCAxIDUuMTctMi42OSIgLz4KICA8cGF0aCBkPSJNMTkgMTIuODU5YTEwIDEwIDAgMCAwLTIuMDA3LTEuNTIzIiAvPgogIDxwYXRoIGQ9Ik0yIDguODJhMTUgMTUgMCAwIDEgNC4xNzctMi42NDMiIC8+CiAgPHBhdGggZD0iTTIyIDguODJhMTUgMTUgMCAwIDAtMTEuMjg4LTMuNzY0IiAvPgogIDxwYXRoIGQ9Im0yIDIgMjAgMjAiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/wifi-off
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
class InterviewStore {
  status = "idle";
  transcript = [];
  currentStreamText = "";
  elapsedSeconds = 0;
  errorMessage = null;
  sessionId = null;
  interviewType = null;
  ws = null;
  timerInterval = null;
  reconnectAttempts = 0;
  maxReconnectAttempts = 3;
  connect(sessionId, type) {
    this.sessionId = sessionId;
    this.interviewType = type;
    this.status = "connecting";
    this.errorMessage = null;
    const baseUrl = type === "technical" ? API_URLS.techInterview : API_URLS.hrInterview;
    const wsUrl = baseUrl.replace("http", "ws") + `/ws/interview/${sessionId}`;
    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => {
        this.status = "active";
        this.reconnectAttempts = 0;
        this.startTimer();
      };
      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };
      this.ws.onclose = (event) => {
        if (this.status === "active" && !event.wasClean) {
          this.handleReconnect();
        } else if (this.status !== "completed") {
          this.status = "idle";
        }
      };
      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.errorMessage = "Connection error occurred";
        this.status = "error";
      };
    } catch (error) {
      this.status = "error";
      this.errorMessage = "Failed to establish connection";
    }
  }
  handleMessage(msg) {
    switch (msg.type) {
      case "transcript_update": {
        const data = msg.data;
        const entry = {
          id: crypto.randomUUID(),
          role: data.role,
          content: data.content,
          timestamp: /* @__PURE__ */ new Date(),
          isStreaming: false
        };
        this.transcript = [...this.transcript, entry];
        this.currentStreamText = "";
        break;
      }
      case "stream_start": {
        this.currentStreamText = "";
        break;
      }
      case "stream_chunk": {
        const data = msg.data;
        this.currentStreamText += data.text;
        break;
      }
      case "stream_end": {
        if (this.currentStreamText) {
          const entry = {
            id: crypto.randomUUID(),
            role: "interviewer",
            content: this.currentStreamText,
            timestamp: /* @__PURE__ */ new Date(),
            isStreaming: false
          };
          this.transcript = [...this.transcript, entry];
          this.currentStreamText = "";
        }
        break;
      }
      case "interview_complete": {
        this.status = "completed";
        this.stopTimer();
        break;
      }
      case "error": {
        const data = msg.data;
        this.errorMessage = data.message;
        break;
      }
    }
  }
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.status = "connecting";
      setTimeout(
        () => {
          if (this.sessionId && this.interviewType) {
            this.connect(this.sessionId, this.interviewType);
          }
        },
        2e3 * this.reconnectAttempts
      );
    } else {
      this.status = "error";
      this.errorMessage = "Failed to reconnect. Please refresh the page.";
    }
  }
  startTimer() {
    this.elapsedSeconds = 0;
    this.timerInterval = setInterval(
      () => {
        this.elapsedSeconds++;
      },
      1e3
    );
  }
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
  sendMessage(content) {
    if (this.ws && this.status === "active") {
      const entry = {
        id: crypto.randomUUID(),
        role: "candidate",
        content,
        timestamp: /* @__PURE__ */ new Date(),
        isStreaming: false
      };
      this.transcript = [...this.transcript, entry];
      this.ws.send(JSON.stringify({ type: "candidate_response", data: { content } }));
    }
  }
  endInterview() {
    if (this.ws && this.status === "active") {
      this.ws.send(JSON.stringify({ type: "end_interview" }));
      this.status = "completed";
      this.stopTimer();
    }
  }
  cleanup() {
    this.stopTimer();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.transcript = [];
    this.currentStreamText = "";
    this.elapsedSeconds = 0;
    this.status = "idle";
    this.errorMessage = null;
    this.sessionId = null;
    this.interviewType = null;
    this.reconnectAttempts = 0;
  }
}
const interviewStore = new InterviewStore();
class MediaStore {
  stream = null;
  videoEnabled = true;
  audioEnabled = true;
  permissionStatus = "prompt";
  errorMessage = null;
  audioLevel = 0;
  audioContext = null;
  analyser = null;
  animationFrame = null;
  async initialize() {
    try {
      this.permissionStatus = "prompt";
      this.errorMessage = null;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      this.stream = stream;
      this.permissionStatus = "granted";
      this.setupAudioAnalysis(stream);
      return stream;
    } catch (error) {
      if (error instanceof DOMException) {
        if (error.name === "NotAllowedError") {
          this.permissionStatus = "denied";
          this.errorMessage = "Camera and microphone access was denied. Please enable permissions in your browser settings.";
        } else if (error.name === "NotFoundError") {
          this.permissionStatus = "error";
          this.errorMessage = "No camera or microphone found. Please connect a device.";
        } else {
          this.permissionStatus = "error";
          this.errorMessage = `Failed to access media devices: ${error.message}`;
        }
      } else {
        this.permissionStatus = "error";
        this.errorMessage = "An unexpected error occurred while accessing media devices.";
      }
      throw error;
    }
  }
  setupAudioAnalysis(stream) {
    try {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      const source = this.audioContext.createMediaStreamSource(stream);
      source.connect(this.analyser);
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      const updateLevel = () => {
        if (!this.analyser || !this.audioEnabled) {
          this.audioLevel = 0;
          this.animationFrame = requestAnimationFrame(updateLevel);
          return;
        }
        this.analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        this.audioLevel = Math.min(100, average / 128 * 100);
        this.animationFrame = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (error) {
      console.error("Failed to setup audio analysis:", error);
    }
  }
  toggleVideo() {
    if (!this.stream) return;
    const videoTracks = this.stream.getVideoTracks();
    videoTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    this.videoEnabled = videoTracks[0]?.enabled ?? false;
  }
  toggleAudio() {
    if (!this.stream) return;
    const audioTracks = this.stream.getAudioTracks();
    audioTracks.forEach((track) => {
      track.enabled = !track.enabled;
    });
    this.audioEnabled = audioTracks[0]?.enabled ?? false;
  }
  cleanup() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    this.permissionStatus = "prompt";
    this.audioLevel = 0;
    this.errorMessage = null;
  }
}
const mediaStore = new MediaStore();
function VideoPreview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      stream,
      muted = false,
      mirrored = true,
      label,
      class: className
    } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(cn("relative bg-obsidian-900 rounded-lg overflow-hidden", className)))}>`);
    if (stream) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<video autoplay playsinline${attr("muted", muted, true)}${attr_class(clsx(cn("w-full h-full object-cover", mirrored && "scale-x-[-1]")))}><track kind="captions"/></video>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="absolute inset-0 flex flex-col items-center justify-center text-obsidian-500">`);
      Video_off($$renderer2, { class: "w-12 h-12 mb-2" });
      $$renderer2.push(`<!----> <p class="text-sm">Camera not available</p></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (label) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="absolute bottom-3 left-3 px-2 py-1 bg-obsidian-900/80 rounded text-sm text-obsidian-200 backdrop-blur-sm">${escape_html(label)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function TranscriptPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { entries, class: className } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(
      // Auto-scroll to bottom when new entries are added
      cn("flex flex-col h-full", className)
    ))}><div class="flex items-center gap-2 p-4 border-b border-obsidian-700">`);
    Message_square($$renderer2, { class: "w-5 h-5 text-royal-400" });
    $$renderer2.push(`<!----> <h3 class="font-semibold text-obsidian-100">Transcript</h3> <span class="ml-auto text-xs text-obsidian-500">${escape_html(entries.length)} messages</span></div> <div class="flex-1 overflow-y-auto p-4 space-y-4">`);
    if (entries.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8 text-obsidian-500">`);
      Message_square($$renderer2, { class: "w-12 h-12 mx-auto mb-3 opacity-50" });
      $$renderer2.push(`<!----> <p>Transcript will appear here as the interview progresses</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(entries);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let entry = each_array[$$index];
        $$renderer2.push(`<div${attr_class(clsx(cn("flex gap-3", entry.speaker === "user" && "flex-row-reverse")))}><div${attr_class(clsx(cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", entry.speaker === "ai" ? "bg-royal-900 text-royal-400" : "bg-emerald-900 text-emerald-400")))}>`);
        if (entry.speaker === "ai") {
          $$renderer2.push("<!--[-->");
          Bot($$renderer2, { class: "w-4 h-4" });
        } else {
          $$renderer2.push("<!--[!-->");
          User($$renderer2, { class: "w-4 h-4" });
        }
        $$renderer2.push(`<!--]--></div> <div${attr_class(clsx(cn("flex-1 max-w-[80%]", entry.speaker === "user" && "text-right")))}><div${attr_class(clsx(cn("inline-block rounded-lg px-4 py-2", entry.speaker === "ai" ? "bg-obsidian-800 text-obsidian-100" : "bg-royal-600 text-white")))}><p class="text-sm whitespace-pre-wrap">${escape_html(entry.text)}</p></div> <p class="text-xs text-obsidian-500 mt-1">${escape_html(entry.speaker === "ai" ? "AI Interviewer" : "You")} · ${escape_html(new Date(entry.timestamp).toLocaleTimeString())}</p></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function AudioVisualizer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { level, class: className } = $$props;
    const bars = Array(20).fill(0).map((_, i) => {
      const threshold = (i + 1) * 5;
      return level >= threshold;
    });
    $$renderer2.push(`<div${attr_class(clsx(cn("flex items-end gap-0.5 h-6", className)))}><!--[-->`);
    const each_array = ensure_array_like(bars);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let active = each_array[i];
      $$renderer2.push(`<div${attr_class(clsx(cn("w-1 rounded-sm transition-all duration-75", active ? "bg-emerald-500" : "bg-obsidian-700")))}${attr_style(`height: ${stringify(Math.max(15, (i + 1) * 5))}%`)}></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function ControlBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      isMicOn,
      isCameraOn,
      isConnected,
      audioLevel = 0,
      showTranscript = true,
      class: className
    } = $$props;
    $$renderer2.push(`<div${attr_class(clsx(cn("flex items-center justify-center gap-4 p-4 bg-obsidian-900/90 backdrop-blur-sm rounded-full", className)))}>`);
    if (isMicOn) {
      $$renderer2.push("<!--[-->");
      AudioVisualizer($$renderer2, { level: audioLevel, class: "mr-2" });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button${attr_class(clsx(cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", isMicOn ? "bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600" : "bg-red-600 text-white hover:bg-red-700")))}${attr("aria-label", isMicOn ? "Mute microphone" : "Unmute microphone")}>`);
    if (isMicOn) {
      $$renderer2.push("<!--[-->");
      Mic($$renderer2, { class: "w-5 h-5" });
    } else {
      $$renderer2.push("<!--[!-->");
      Mic_off($$renderer2, { class: "w-5 h-5" });
    }
    $$renderer2.push(`<!--]--></button> <button${attr_class(clsx(cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", isCameraOn ? "bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600" : "bg-red-600 text-white hover:bg-red-700")))}${attr("aria-label", isCameraOn ? "Turn off camera" : "Turn on camera")}>`);
    if (isCameraOn) {
      $$renderer2.push("<!--[-->");
      Video($$renderer2, { class: "w-5 h-5" });
    } else {
      $$renderer2.push("<!--[!-->");
      Video_off($$renderer2, { class: "w-5 h-5" });
    }
    $$renderer2.push(`<!--]--></button> <button class="w-14 h-14 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 transition-all" aria-label="End call">`);
    Phone_off($$renderer2, { class: "w-6 h-6" });
    $$renderer2.push(`<!----></button> <button${attr_class(clsx(cn("w-12 h-12 rounded-full flex items-center justify-center transition-all", showTranscript ? "bg-royal-600 text-white hover:bg-royal-700" : "bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600")))}${attr("aria-label", showTranscript ? "Hide transcript" : "Show transcript")}>`);
    Message_square($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button class="w-12 h-12 rounded-full flex items-center justify-center bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600 transition-all" aria-label="Toggle fullscreen">`);
    Maximize($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></button> <button class="w-12 h-12 rounded-full flex items-center justify-center bg-obsidian-700 text-obsidian-100 hover:bg-obsidian-600 transition-all" aria-label="Settings">`);
    Settings($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----></button></div>`);
  });
}
function InterviewTimer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { duration, maxDuration, class: className } = $$props;
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor(seconds % 3600 / 60);
      const secs = seconds % 60;
      if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
      }
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = maxDuration ? duration / maxDuration * 100 : 0;
    const isWarning = maxDuration ? progress >= 80 : false;
    const isDanger = maxDuration ? progress >= 95 : false;
    $$renderer2.push(`<div${attr_class(clsx(cn("flex items-center gap-3", className)))}>`);
    Clock($$renderer2, {
      class: cn("w-5 h-5", isDanger ? "text-red-500 animate-pulse" : isWarning ? "text-amber-500" : "text-obsidian-400")
    });
    $$renderer2.push(`<!----> <div class="flex flex-col"><span${attr_class(clsx(cn("font-mono text-lg font-semibold", isDanger ? "text-red-500" : isWarning ? "text-amber-500" : "text-obsidian-100")))}>${escape_html(formatTime(duration))}</span> `);
    if (maxDuration) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs text-obsidian-500">/ ${escape_html(formatTime(maxDuration))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (maxDuration) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex-1 h-1.5 bg-obsidian-700 rounded-full overflow-hidden max-w-32"><div${attr_class(clsx(cn("h-full rounded-full transition-all duration-300", isDanger ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-royal-500")))}${attr_style(`width: ${stringify(Math.min(progress, 100))}%`)}></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function SystemCheck($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      cameraReady,
      micReady,
      networkReady,
      onStart,
      onRetry,
      class: className
    } = $$props;
    const allReady = cameraReady && micReady && networkReady;
    Card($$renderer2, {
      class: cn("p-8 max-w-lg mx-auto", className),
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="text-xl font-semibold text-obsidian-100 text-center mb-6">System Check</h2> <div class="space-y-4 mb-8"><div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg"><div${attr_class(clsx(cn("w-10 h-10 rounded-full flex items-center justify-center", cameraReady ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400")))}>`);
        Camera($$renderer3, { class: "w-5 h-5" });
        $$renderer3.push(`<!----></div> <div class="flex-1"><p class="font-medium text-obsidian-100">Camera</p> <p class="text-sm text-obsidian-400">${escape_html(cameraReady ? "Camera is working properly" : "Camera access denied or unavailable")}</p></div> `);
        if (cameraReady) {
          $$renderer3.push("<!--[-->");
          Circle_check_big($$renderer3, { class: "w-5 h-5 text-emerald-500" });
        } else {
          $$renderer3.push("<!--[!-->");
          Circle_alert($$renderer3, { class: "w-5 h-5 text-red-500" });
        }
        $$renderer3.push(`<!--]--></div> <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg"><div${attr_class(clsx(cn("w-10 h-10 rounded-full flex items-center justify-center", micReady ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400")))}>`);
        Mic($$renderer3, { class: "w-5 h-5" });
        $$renderer3.push(`<!----></div> <div class="flex-1"><p class="font-medium text-obsidian-100">Microphone</p> <p class="text-sm text-obsidian-400">${escape_html(micReady ? "Microphone is working properly" : "Microphone access denied or unavailable")}</p></div> `);
        if (micReady) {
          $$renderer3.push("<!--[-->");
          Circle_check_big($$renderer3, { class: "w-5 h-5 text-emerald-500" });
        } else {
          $$renderer3.push("<!--[!-->");
          Circle_alert($$renderer3, { class: "w-5 h-5 text-red-500" });
        }
        $$renderer3.push(`<!--]--></div> <div class="flex items-center gap-4 p-4 bg-obsidian-800/50 rounded-lg"><div${attr_class(clsx(cn("w-10 h-10 rounded-full flex items-center justify-center", networkReady ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400")))}>`);
        Wifi($$renderer3, { class: "w-5 h-5" });
        $$renderer3.push(`<!----></div> <div class="flex-1"><p class="font-medium text-obsidian-100">Network</p> <p class="text-sm text-obsidian-400">${escape_html(networkReady ? "Connection is stable" : "Network connection issues detected")}</p></div> `);
        if (networkReady) {
          $$renderer3.push("<!--[-->");
          Circle_check_big($$renderer3, { class: "w-5 h-5 text-emerald-500" });
        } else {
          $$renderer3.push("<!--[!-->");
          Circle_alert($$renderer3, { class: "w-5 h-5 text-red-500" });
        }
        $$renderer3.push(`<!--]--></div></div> <div class="flex gap-3">`);
        Button($$renderer3, {
          variant: "outline",
          class: "flex-1",
          onclick: onRetry,
          children: ($$renderer4) => {
            Refresh_cw($$renderer4, { class: "w-4 h-4 mr-2" });
            $$renderer4.push(`<!----> Retry Check`);
          }
        });
        $$renderer3.push(`<!----> `);
        Button($$renderer3, {
          class: "flex-1",
          onclick: onStart,
          disabled: !allReady,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(allReady ? "Start Interview" : "Fix Issues to Continue")}`);
          }
        });
        $$renderer3.push(`<!----></div> `);
        if (!allReady) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<p class="text-sm text-obsidian-500 text-center mt-4">Please ensure all systems are ready before starting the interview</p>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
    });
  });
}
export {
  ControlBar as C,
  InterviewTimer as I,
  SystemCheck as S,
  TranscriptPanel as T,
  VideoPreview as V,
  Wifi_off as W,
  interviewStore as i,
  mediaStore as m
};
