import { c as sanitize_props, j as spread_props, s as slot, m as head, e as ensure_array_like, h as attr_style, n as stringify, a as attr, f as attr_class } from "../../../../chunks/index2.js";
import { C as Card } from "../../../../chunks/Card.js";
import { B as Button } from "../../../../chunks/Button.js";
import { S as Select } from "../../../../chunks/Select.js";
import { U as Users } from "../../../../chunks/users.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { B as Brain } from "../../../../chunks/brain.js";
import { M as Message_square } from "../../../../chunks/message-square.js";
import { A as Award } from "../../../../chunks/award.js";
import { T as Trophy } from "../../../../chunks/trophy.js";
import { S as Sparkles } from "../../../../chunks/sparkles.js";
import { D as Download } from "../../../../chunks/download.js";
import { B as Briefcase } from "../../../../chunks/briefcase.js";
import { C as Clock } from "../../../../chunks/clock.js";
import { T as Target } from "../../../../chunks/target.js";
import { C as Circle_check } from "../../../../chunks/circle-check.js";
import { S as Star } from "../../../../chunks/star.js";
import { C as Chart_column } from "../../../../chunks/chart-column.js";
import { L as Linkedin } from "../../../../chunks/linkedin.js";
import { G as Globe } from "../../../../chunks/globe.js";
import { U as User_check } from "../../../../chunks/user-check.js";
import { M as Mail } from "../../../../chunks/mail.js";
import { B as Building_2 } from "../../../../chunks/building-2.js";
import { C as Circle_alert } from "../../../../chunks/circle-alert.js";
import { Y as escape_html } from "../../../../chunks/context.js";
function Activity($$renderer, $$props) {
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
        "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "activity" },
    $$sanitized_props,
    {
      /**
       * @component @name Activity
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/activity
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
function Arrow_up_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M7 7h10v10" }],
    ["path", { "d": "M7 17 17 7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-up-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowUpRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNyA3aDEwdjEwIiAvPgogIDxwYXRoIGQ9Ik03IDE3IDE3IDciIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/arrow-up-right
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
function File_check($$renderer, $$props) {
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
        "d": "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
      }
    ],
    ["path", { "d": "M14 2v4a2 2 0 0 0 2 2h4" }],
    ["path", { "d": "m9 15 2 2 4-4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "file-check" },
    $$sanitized_props,
    {
      /**
       * @component @name FileCheck
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTUgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjdaIiAvPgogIDxwYXRoIGQ9Ik0xNCAydjRhMiAyIDAgMCAwIDIgMmg0IiAvPgogIDxwYXRoIGQ9Im05IDE1IDIgMiA0LTQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/file-check
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
function Graduation_cap($$renderer, $$props) {
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
        "d": "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      }
    ],
    ["path", { "d": "M22 10v6" }],
    ["path", { "d": "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }]
  ];
  Icon($$renderer, spread_props([
    { name: "graduation-cap" },
    $$sanitized_props,
    {
      /**
       * @component @name GraduationCap
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEuNDIgMTAuOTIyYTEgMSAwIDAgMC0uMDE5LTEuODM4TDEyLjgzIDUuMThhMiAyIDAgMCAwLTEuNjYgMEwyLjYgOS4wOGExIDEgMCAwIDAgMCAxLjgzMmw4LjU3IDMuOTA4YTIgMiAwIDAgMCAxLjY2IDB6IiAvPgogIDxwYXRoIGQ9Ik0yMiAxMHY2IiAvPgogIDxwYXRoIGQ9Ik02IDEyLjVWMTZhNiAzIDAgMCAwIDEyIDB2LTMuNSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/graduation-cap
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
function Share_2($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "18", "cy": "5", "r": "3" }],
    ["circle", { "cx": "6", "cy": "12", "r": "3" }],
    ["circle", { "cx": "18", "cy": "19", "r": "3" }],
    [
      "line",
      { "x1": "8.59", "x2": "15.42", "y1": "13.51", "y2": "17.49" }
    ],
    [
      "line",
      { "x1": "15.41", "x2": "8.59", "y1": "6.51", "y2": "10.49" }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "share-2" },
    $$sanitized_props,
    {
      /**
       * @component @name Share2
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxOCIgY3k9IjUiIHI9IjMiIC8+CiAgPGNpcmNsZSBjeD0iNiIgY3k9IjEyIiByPSIzIiAvPgogIDxjaXJjbGUgY3g9IjE4IiBjeT0iMTkiIHI9IjMiIC8+CiAgPGxpbmUgeDE9IjguNTkiIHgyPSIxNS40MiIgeTE9IjEzLjUxIiB5Mj0iMTcuNDkiIC8+CiAgPGxpbmUgeDE9IjE1LjQxIiB4Mj0iOC41OSIgeTE9IjYuNTEiIHkyPSIxMC40OSIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/share-2
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
function Trending_down($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["polyline", { "points": "22 17 13.5 8.5 8.5 13.5 2 7" }],
    ["polyline", { "points": "16 17 22 17 22 11" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-down" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiAxNyAxMy41IDguNSA4LjUgMTMuNSAyIDciIC8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMTYgMTcgMjIgMTcgMjIgMTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trending-down
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
function User_x($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["line", { "x1": "17", "x2": "22", "y1": "8", "y2": "13" }],
    ["line", { "x1": "22", "x2": "17", "y1": "8", "y2": "13" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user-x" },
    $$sanitized_props,
    {
      /**
       * @component @name UserX
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTYgMjF2LTJhNCA0IDAgMCAwLTQtNEg2YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iNyIgcj0iNCIgLz4KICA8bGluZSB4MT0iMTciIHgyPSIyMiIgeTE9IjgiIHkyPSIxMyIgLz4KICA8bGluZSB4MT0iMjIiIHgyPSIxNyIgeTE9IjgiIHkyPSIxMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/user-x
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
function Zap($$renderer, $$props) {
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
        "d": "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "zap" },
    $$sanitized_props,
    {
      /**
       * @component @name Zap
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNCAxNGExIDEgMCAwIDEtLjc4LTEuNjNsOS45LTEwLjJhLjUuNSAwIDAgMSAuODYuNDZsLTEuOTIgNi4wMkExIDEgMCAwIDAgMTMgMTBoN2ExIDEgMCAwIDEgLjc4IDEuNjNsLTkuOSAxMC4yYS41LjUgMCAwIDEtLjg2LS40NmwxLjkyLTYuMDJBMSAxIDAgMCAwIDExIDE0eiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/zap
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
    let timeRange = "30d";
    const timeRangeOptions = [
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
      { value: "90d", label: "Last 90 days" },
      { value: "365d", label: "Last year" }
    ];
    const stats = {
      totalCandidates: 1284,
      totalCandidatesDelta: 12.4,
      activeJobs: 18,
      activeJobsDelta: 3,
      avgTimeToHire: 22,
      avgTimeToHireDelta: -3,
      conversionRate: 14.6,
      conversionRateDelta: 2.1,
      interviewsCompleted: 412,
      offersAccepted: 87,
      aiHoursSaved: 1840,
      qualityOfHire: 8.7
    };
    const pipeline = [
      { label: "Applied", value: 1284, color: "#94a3b8", icon: Users },
      {
        label: "Resume Screen",
        value: 642,
        color: "#a78bfa",
        icon: File_check
      },
      { label: "Aptitude", value: 384, color: "#60a5fa", icon: Brain },
      {
        label: "Technical",
        value: 218,
        color: "#f59e0b",
        icon: Graduation_cap
      },
      {
        label: "HR Round",
        value: 142,
        color: "#a855f7",
        icon: Message_square
      },
      { label: "Offered", value: 96, color: "#34d399", icon: Award },
      { label: "Hired", value: 87, color: "#10b981", icon: Trophy }
    ];
    const maxPipeline = Math.max(...pipeline.map((p) => p.value));
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const applications = [82, 94, 110, 125, 142, 168, 154, 178, 196, 212, 234, 248];
    const hires = [4, 5, 6, 8, 7, 11, 10, 12, 9, 13, 15, 18];
    const maxTrend = Math.max(...applications);
    const sources = [
      {
        source: "LinkedIn",
        count: 412,
        pct: 32,
        color: "#0ea5e9",
        icon: Linkedin
      },
      {
        source: "Direct Application",
        count: 358,
        pct: 28,
        color: "#8b5cf6",
        icon: Globe
      },
      {
        source: "Employee Referral",
        count: 218,
        pct: 17,
        color: "#10b981",
        icon: User_check
      },
      {
        source: "Job Boards",
        count: 154,
        pct: 12,
        color: "#f59e0b",
        icon: Briefcase
      },
      {
        source: "Email Campaign",
        count: 90,
        pct: 7,
        color: "#ec4899",
        icon: Mail
      },
      {
        source: "Social / Other",
        count: 52,
        pct: 4,
        color: "#64748b",
        icon: Share_2
      }
    ];
    const topRoles = [
      {
        title: "Senior Backend Engineer",
        applied: 218,
        hired: 14,
        conv: 6.4,
        dept: "Engineering"
      },
      {
        title: "Full Stack Developer",
        applied: 184,
        hired: 12,
        conv: 6.5,
        dept: "Engineering"
      },
      {
        title: "Product Manager",
        applied: 96,
        hired: 7,
        conv: 7.3,
        dept: "Product"
      },
      {
        title: "Data Scientist",
        applied: 142,
        hired: 9,
        conv: 6.3,
        dept: "Data"
      },
      {
        title: "UX Designer",
        applied: 87,
        hired: 6,
        conv: 6.9,
        dept: "Design"
      },
      {
        title: "DevOps Engineer",
        applied: 64,
        hired: 5,
        conv: 7.8,
        dept: "Engineering"
      }
    ];
    const skills = [
      { name: "Python", score: 92 },
      { name: "React", score: 88 },
      { name: "PostgreSQL", score: 81 },
      { name: "AWS", score: 76 },
      { name: "TypeScript", score: 74 },
      { name: "Docker", score: 69 },
      { name: "Kubernetes", score: 58 },
      { name: "GraphQL", score: 47 }
    ];
    const scoreBuckets = [
      { range: "0-20", tech: 8, hr: 4 },
      { range: "21-40", tech: 18, hr: 12 },
      { range: "41-60", tech: 42, hr: 38 },
      { range: "61-80", tech: 96, hr: 108 },
      { range: "81-100", tech: 54, hr: 50 }
    ];
    const maxBucket = Math.max(...scoreBuckets.flatMap((b) => [b.tech, b.hr]));
    const recentActivity = [
      {
        type: "hired",
        name: "Ananya Reddy",
        role: "Senior Backend Engineer",
        time: "2 hours ago",
        bg: "bg-emerald-100",
        fg: "text-emerald-600"
      },
      {
        type: "offered",
        name: "Vikram Singh",
        role: "Full Stack Developer",
        time: "5 hours ago",
        bg: "bg-amber-100",
        fg: "text-amber-600"
      },
      {
        type: "rejected",
        name: "Sneha Verma",
        role: "Senior Backend Engineer",
        time: "8 hours ago",
        bg: "bg-rose-100",
        fg: "text-rose-600"
      },
      {
        type: "interview",
        name: "Karan Mehta",
        role: "Senior Backend Engineer",
        time: "12 hours ago",
        bg: "bg-purple-100",
        fg: "text-purple-600"
      },
      {
        type: "applied",
        name: "Rohan Patel",
        role: "Product Manager",
        time: "1 day ago",
        bg: "bg-sky-100",
        fg: "text-sky-600"
      },
      {
        type: "hired",
        name: "Priya Iyer",
        role: "Data Scientist",
        time: "2 days ago",
        bg: "bg-emerald-100",
        fg: "text-emerald-600"
      }
    ];
    const activityIcon = (t) => ({
      hired: Trophy,
      offered: Award,
      rejected: User_x,
      interview: Message_square,
      applied: Users
    })[t] || Activity;
    const activityVerb = (t) => ({
      hired: "was hired for",
      offered: "received an offer for",
      rejected: "was rejected for",
      interview: "completed an interview for",
      applied: "applied for"
    })[t] || "activity for";
    const departments = [
      { name: "Engineering", value: 564, color: "#8b5cf6" },
      { name: "Product", value: 218, color: "#f59e0b" },
      { name: "Design", value: 142, color: "#ec4899" },
      { name: "Data", value: 196, color: "#10b981" },
      { name: "Marketing", value: 96, color: "#0ea5e9" },
      { name: "Operations", value: 68, color: "#64748b" }
    ];
    const deptTotal = departments.reduce((s, d) => s + d.value, 0);
    let cumulative = 0;
    const donutSegments = departments.map((d) => {
      const pct = d.value / deptTotal;
      const dash = pct * 100;
      const seg = { ...d, dash, offset: cumulative, pct: Math.round(pct * 100) };
      cumulative += dash;
      return seg;
    });
    const timeBuckets = ["12a", "3a", "6a", "9a", "12p", "3p", "6p", "9p"];
    const timeHeat = [4, 2, 8, 28, 64, 86, 52, 18];
    const maxHeat = Math.max(...timeHeat);
    const trendStepX = 650 / 11;
    const trendPtX = (i) => 40 + i * trendStepX;
    const trendPtY = (v) => 240 - v / maxTrend * 200;
    const appAreaPath = `M ${trendPtX(0)},${trendPtY(applications[0])} ` + applications.slice(1).map((v, i) => `L ${trendPtX(i + 1)},${trendPtY(v)}`).join(" ") + ` L ${trendPtX(11)},240 L ${trendPtX(0)},240 Z`;
    const appLinePath = `M ${trendPtX(0)},${trendPtY(applications[0])} ` + applications.slice(1).map((v, i) => `L ${trendPtX(i + 1)},${trendPtY(v)}`).join(" ");
    function exportReport() {
      const data = { timeRange, stats, pipeline, sources, topRoles };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-report-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    head("1iwbyuz", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Analytics | HR Automation</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-amber-500 p-8 text-white shadow-xl"><div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 70%, white 1px, transparent 1px); background-size: 32px 32px;"></div> <div class="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3">`);
    Sparkles($$renderer2, { class: "w-3.5 h-3.5" });
    $$renderer2.push(`<!----> AI-POWERED INSIGHTS</div> <h1 class="text-3xl font-bold">Hiring Analytics</h1> <p class="text-white/90 mt-1">Track performance, spot bottlenecks, and optimise your funnel.</p></div> <div class="flex items-center gap-3">`);
    Select($$renderer2, {
      value: timeRange,
      options: timeRangeOptions,
      onchange: (e) => timeRange = e.currentTarget.value,
      class: "w-44 !bg-white/20 !backdrop-blur-sm !text-white !border-white/30"
    });
    $$renderer2.push(`<!----> `);
    Button($$renderer2, {
      variant: "outline",
      class: "!bg-white !text-purple-700 !border-white hover:!bg-white/90",
      onclick: exportReport,
      children: ($$renderer3) => {
        Download($$renderer3, { class: "w-4 h-4 mr-2" });
        $$renderer3.push(`<!----> Export`);
      }
    });
    $$renderer2.push(`<!----></div></div></div> <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">`);
    Card($$renderer2, {
      class: "p-6 relative overflow-hidden group hover:shadow-lg transition-all",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-purple-100 opacity-50 group-hover:scale-110 transition-transform"></div> <div class="relative flex items-start justify-between"><div><p class="text-sm text-gray-500">Total Candidates</p> <p class="text-3xl font-bold text-gray-900 mt-1">${escape_html(stats.totalCandidates.toLocaleString())}</p> <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">`);
        Arrow_up_right($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> <span class="font-medium">+${escape_html(stats.totalCandidatesDelta)}%</span> <span class="text-gray-400">vs last period</span></div></div> <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-purple-sm">`);
        Users($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6 relative overflow-hidden group hover:shadow-lg transition-all",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-amber-100 opacity-50 group-hover:scale-110 transition-transform"></div> <div class="relative flex items-start justify-between"><div><p class="text-sm text-gray-500">Active Jobs</p> <p class="text-3xl font-bold text-gray-900 mt-1">${escape_html(stats.activeJobs)}</p> <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">`);
        Arrow_up_right($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> <span class="font-medium">+${escape_html(stats.activeJobsDelta)}</span> <span class="text-gray-400">new this week</span></div></div> <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">`);
        Briefcase($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6 relative overflow-hidden group hover:shadow-lg transition-all",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-100 opacity-50 group-hover:scale-110 transition-transform"></div> <div class="relative flex items-start justify-between"><div><p class="text-sm text-gray-500">Avg. Time to Hire</p> <p class="text-3xl font-bold text-gray-900 mt-1">${escape_html(stats.avgTimeToHire)}<span class="text-lg text-gray-500 ml-1">days</span></p> <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">`);
        Trending_down($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> <span class="font-medium">${escape_html(stats.avgTimeToHireDelta)} days</span> <span class="text-gray-400">faster</span></div></div> <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">`);
        Clock($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6 relative overflow-hidden group hover:shadow-lg transition-all",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-pink-100 opacity-50 group-hover:scale-110 transition-transform"></div> <div class="relative flex items-start justify-between"><div><p class="text-sm text-gray-500">Conversion Rate</p> <p class="text-3xl font-bold text-gray-900 mt-1">${escape_html(stats.conversionRate)}<span class="text-lg text-gray-500">%</span></p> <div class="flex items-center gap-1 mt-2 text-sm text-emerald-600">`);
        Arrow_up_right($$renderer3, { class: "w-4 h-4" });
        $$renderer3.push(`<!----> <span class="font-medium">+${escape_html(stats.conversionRateDelta)}pp</span> <span class="text-gray-400">above benchmark</span></div></div> <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md">`);
        Target($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div></div>`);
      }
    });
    $$renderer2.push(`<!----></div> `);
    Card($$renderer2, {
      class: "p-6 bg-gradient-to-r from-purple-50 via-white to-amber-50 border-purple-200",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="grid sm:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-purple-200"><div class="flex items-center gap-4 sm:pl-0 pl-0"><div class="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">`);
        Zap($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.aiHoursSaved.toLocaleString())}h</p> <p class="text-sm text-gray-500">Recruiter hours saved by AI</p></div></div> <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0"><div class="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">`);
        Message_square($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.interviewsCompleted)}</p> <p class="text-sm text-gray-500">AI interviews completed</p></div></div> <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0"><div class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">`);
        Circle_check($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.offersAccepted)}</p> <p class="text-sm text-gray-500">Offers accepted</p></div></div> <div class="flex items-center gap-4 sm:pl-6 pt-6 sm:pt-0"><div class="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">`);
        Star($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div><p class="text-2xl font-bold text-gray-900">${escape_html(stats.qualityOfHire)}<span class="text-base text-gray-500">/10</span></p> <p class="text-sm text-gray-500">Avg. quality of hire</p></div></div></div>`);
      }
    });
    $$renderer2.push(`<!----> <div class="grid lg:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      class: "p-6 lg:col-span-2",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-6"><div><h2 class="text-lg font-semibold text-gray-900">Hiring Pipeline Funnel</h2> <p class="text-sm text-gray-500">Conversion from application to hire</p></div> <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">`);
        Chart_column($$renderer3, { class: "w-3.5 h-3.5" });
        $$renderer3.push(`<!----> ${escape_html(stats.conversionRate)}% overall</div></div> <div class="space-y-3"><!--[-->`);
        const each_array = ensure_array_like(pipeline);
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let stage = each_array[i];
          const widthPct = stage.value / maxPipeline * 100;
          const dropoff = i > 0 ? Math.round((1 - stage.value / pipeline[i - 1].value) * 100) : 0;
          $$renderer3.push(`<div class="group"><div class="flex items-center gap-3 mb-1"><div class="w-7 h-7 rounded-lg flex items-center justify-center text-white"${attr_style(`background-color: ${stringify(stage.color)};`)}>`);
          $$renderer3.push("<!---->");
          stage.icon?.($$renderer3, { class: "w-4 h-4" });
          $$renderer3.push(`<!----></div> <span class="text-sm font-medium text-gray-700 flex-1">${escape_html(stage.label)}</span> <span class="text-sm font-semibold text-gray-900">${escape_html(stage.value.toLocaleString())}</span> `);
          if (i > 0) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<span class="text-xs text-rose-500 font-medium w-12 text-right">-${escape_html(dropoff)}%</span>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<span class="text-xs text-gray-400 w-12 text-right">—</span>`);
          }
          $$renderer3.push(`<!--]--></div> <div class="h-3 bg-gray-100 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-110"${attr_style(`width: ${stringify(widthPct)}%; background: linear-gradient(90deg, ${stringify(stage.color)}, ${stringify(stage.color)}dd);`)}></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-6"><div><h2 class="text-lg font-semibold text-gray-900">Candidate Sources</h2> <p class="text-sm text-gray-500">Where applicants come from</p></div></div> <div class="space-y-4"><!--[-->`);
        const each_array_1 = ensure_array_like(sources);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let src = each_array_1[$$index_1];
          $$renderer3.push(`<div><div class="flex items-center gap-2 mb-1.5"><div class="w-7 h-7 rounded-lg flex items-center justify-center"${attr_style(`background-color: ${stringify(src.color)}20; color: ${stringify(src.color)};`)}>`);
          $$renderer3.push("<!---->");
          src.icon?.($$renderer3, { class: "w-4 h-4" });
          $$renderer3.push(`<!----></div> <span class="text-sm font-medium text-gray-700 flex-1">${escape_html(src.source)}</span> <span class="text-xs text-gray-500">${escape_html(src.count)} · <span class="font-semibold text-gray-700">${escape_html(src.pct)}%</span></span></div> <div class="h-2 bg-gray-100 rounded-full overflow-hidden ml-9"><div class="h-full rounded-full transition-all duration-700"${attr_style(`width: ${stringify(src.pct * 2.5)}%; background-color: ${stringify(src.color)};`)}></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----></div> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-6"><div><h2 class="text-lg font-semibold text-gray-900">Hiring Trends</h2> <p class="text-sm text-gray-500">12-month applications vs hires</p></div> <div class="flex items-center gap-4 text-sm"><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-purple-500"></div> <span class="text-gray-600">Applications</span></div> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full bg-amber-500"></div> <span class="text-gray-600">Hires</span></div></div></div> <div class="relative h-72"><svg viewBox="0 0 700 280" class="w-full h-full" preserveAspectRatio="none"><!--[-->`);
        const each_array_2 = ensure_array_like([0, 1, 2, 3, 4]);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let g = each_array_2[$$index_2];
          $$renderer3.push(`<line x1="40" x2="690"${attr("y1", 40 + g * 50)}${attr("y2", 40 + g * 50)} stroke="#e5e7eb" stroke-dasharray="4 4"></line>`);
        }
        $$renderer3.push(`<!--]--><!--[-->`);
        const each_array_3 = ensure_array_like([0, 1, 2, 3, 4]);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let g = each_array_3[$$index_3];
          $$renderer3.push(`<text x="32"${attr("y", 45 + g * 50)} text-anchor="end" fill="#9ca3af" font-size="10">${escape_html(Math.round(maxTrend - g * maxTrend / 4))}</text>`);
        }
        $$renderer3.push(`<!--]--><defs><linearGradient id="appGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#a855f7" stop-opacity="0.4"></stop><stop offset="100%" stop-color="#a855f7" stop-opacity="0"></stop></linearGradient></defs><path${attr("d", appAreaPath)} fill="url(#appGrad)"></path><path${attr("d", appLinePath)} fill="none" stroke="#a855f7" stroke-width="2.5"></path><!--[-->`);
        const each_array_4 = ensure_array_like(hires);
        for (let i = 0, $$length = each_array_4.length; i < $$length; i++) {
          let h = each_array_4[i];
          $$renderer3.push(`<rect${attr("x", trendPtX(i) - 8)}${attr("y", 240 - h / maxTrend * 200)} width="16"${attr("height", h / maxTrend * 200)} fill="#f59e0b" rx="3" opacity="0.85"></rect>`);
        }
        $$renderer3.push(`<!--]--><!--[-->`);
        const each_array_5 = ensure_array_like(applications);
        for (let i = 0, $$length = each_array_5.length; i < $$length; i++) {
          let v = each_array_5[i];
          $$renderer3.push(`<circle${attr("cx", trendPtX(i))}${attr("cy", trendPtY(v))} r="4" fill="#a855f7" stroke="white" stroke-width="2"></circle>`);
        }
        $$renderer3.push(`<!--]--><!--[-->`);
        const each_array_6 = ensure_array_like(months);
        for (let i = 0, $$length = each_array_6.length; i < $$length; i++) {
          let m = each_array_6[i];
          $$renderer3.push(`<text${attr("x", trendPtX(i))} y="265" text-anchor="middle" fill="#6b7280" font-size="11">${escape_html(m)}</text>`);
        }
        $$renderer3.push(`<!--]--></svg></div>`);
      }
    });
    $$renderer2.push(`<!----> <div class="grid lg:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-1">Candidates by Department</h2> <p class="text-sm text-gray-500 mb-4">Distribution across teams</p> <div class="flex items-center gap-6"><div class="relative w-40 h-40 flex-shrink-0"><svg viewBox="0 0 42 42" class="w-full h-full -rotate-90"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="6"></circle><!--[-->`);
        const each_array_7 = ensure_array_like(donutSegments);
        for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
          let seg = each_array_7[$$index_7];
          $$renderer3.push(`<circle cx="21" cy="21" r="15.9" fill="none"${attr("stroke", seg.color)} stroke-width="6"${attr("stroke-dasharray", `${stringify(seg.dash)} ${stringify(100 - seg.dash)}`)}${attr("stroke-dashoffset", -seg.offset)}></circle>`);
        }
        $$renderer3.push(`<!--]--></svg> <div class="absolute inset-0 flex flex-col items-center justify-center"><span class="text-2xl font-bold text-gray-900">${escape_html(deptTotal.toLocaleString())}</span> <span class="text-xs text-gray-500">total</span></div></div> <div class="flex-1 space-y-2"><!--[-->`);
        const each_array_8 = ensure_array_like(donutSegments);
        for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
          let d = each_array_8[$$index_8];
          $$renderer3.push(`<div class="flex items-center gap-2 text-sm"><span class="w-2.5 h-2.5 rounded-full"${attr_style(`background-color: ${stringify(d.color)};`)}></span> <span class="text-gray-700 flex-1">${escape_html(d.name)}</span> <span class="font-semibold text-gray-900">${escape_html(d.pct)}%</span></div>`);
        }
        $$renderer3.push(`<!--]--></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-1">AI Interview Scores</h2> <p class="text-sm text-gray-500 mb-4">Score distribution (Technical vs HR)</p> <div class="flex items-end justify-between gap-3 h-44"><!--[-->`);
        const each_array_9 = ensure_array_like(scoreBuckets);
        for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
          let b = each_array_9[$$index_9];
          $$renderer3.push(`<div class="flex-1 flex flex-col items-center gap-1 group"><div class="w-full flex gap-1 items-end h-full"><div class="flex-1 rounded-t-md bg-amber-500 transition-all duration-500 group-hover:bg-amber-600"${attr_style(`height: ${stringify(b.tech / maxBucket * 100)}%`)}${attr("title", `Technical: ${stringify(b.tech)}`)}></div> <div class="flex-1 rounded-t-md bg-purple-500 transition-all duration-500 group-hover:bg-purple-600"${attr_style(`height: ${stringify(b.hr / maxBucket * 100)}%`)}${attr("title", `HR: ${stringify(b.hr)}`)}></div></div> <span class="text-xs text-gray-500">${escape_html(b.range)}</span></div>`);
        }
        $$renderer3.push(`<!--]--></div> <div class="flex items-center gap-4 text-xs mt-3 justify-center"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span class="text-gray-600">Technical</span></div> <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span class="text-gray-600">HR</span></div></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<h2 class="text-lg font-semibold text-gray-900 mb-1">When Candidates Apply</h2> <p class="text-sm text-gray-500 mb-4">Application volume by hour</p> <div class="flex items-end justify-between gap-1.5 h-44"><!--[-->`);
        const each_array_10 = ensure_array_like(timeHeat);
        for (let i = 0, $$length = each_array_10.length; i < $$length; i++) {
          let v = each_array_10[i];
          const intensity = v / maxHeat;
          $$renderer3.push(`<div class="flex-1 flex flex-col items-center gap-1 group"><div class="w-full rounded-t-md transition-all duration-500 group-hover:scale-110"${attr_style(`height: ${stringify(intensity * 100)}%; background: linear-gradient(180deg, #8b5cf6, #6366f1);`)}${attr("title", `${stringify(v)} applications`)}></div> <span class="text-[10px] text-gray-500">${escape_html(timeBuckets[i])}</span></div>`);
        }
        $$renderer3.push(`<!--]--></div> <p class="text-xs text-center text-gray-500 mt-3">Peak: <span class="font-semibold text-purple-600">3 PM (86 apps)</span></p>`);
      }
    });
    $$renderer2.push(`<!----></div> <div class="grid lg:grid-cols-3 gap-6">`);
    Card($$renderer2, {
      class: "p-6 lg:col-span-2",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-4"><div><h2 class="text-lg font-semibold text-gray-900">Top Performing Roles</h2> <p class="text-sm text-gray-500">By conversion rate this period</p></div> `);
        Trophy($$renderer3, { class: "w-5 h-5 text-amber-500" });
        $$renderer3.push(`<!----></div> <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="text-left text-xs text-gray-500 uppercase border-b border-gray-100"><th class="py-3 font-medium">Role</th><th class="py-3 font-medium">Department</th><th class="py-3 font-medium text-right">Applied</th><th class="py-3 font-medium text-right">Hired</th><th class="py-3 font-medium text-right">Conversion</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
        const each_array_11 = ensure_array_like(topRoles);
        for (let $$index_11 = 0, $$length = each_array_11.length; $$index_11 < $$length; $$index_11++) {
          let r = each_array_11[$$index_11];
          $$renderer3.push(`<tr class="hover:bg-purple-50/40 transition-colors"><td class="py-3 font-medium text-gray-800">${escape_html(r.title)}</td><td class="py-3"><span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">`);
          Building_2($$renderer3, { class: "w-3 h-3" });
          $$renderer3.push(`<!----> ${escape_html(r.dept)}</span></td><td class="py-3 text-right text-gray-600">${escape_html(r.applied)}</td><td class="py-3 text-right font-semibold text-gray-900">${escape_html(r.hired)}</td><td class="py-3 text-right"><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">`);
          Arrow_up_right($$renderer3, { class: "w-3 h-3" });
          $$renderer3.push(`<!----> ${escape_html(r.conv)}%</span></td></tr>`);
        }
        $$renderer3.push(`<!--]--></tbody></table></div>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-4"><div><h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2> <p class="text-sm text-gray-500">Live pipeline events</p></div> <span class="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span></div> <div class="space-y-3"><!--[-->`);
        const each_array_12 = ensure_array_like(recentActivity);
        for (let $$index_12 = 0, $$length = each_array_12.length; $$index_12 < $$length; $$index_12++) {
          let a = each_array_12[$$index_12];
          const Icon2 = activityIcon(a.type);
          $$renderer3.push(`<div class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"><div${attr_class(`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${stringify(a.bg)} ${stringify(a.fg)}`)}>`);
          $$renderer3.push("<!---->");
          Icon2?.($$renderer3, { class: "w-4 h-4" });
          $$renderer3.push(`<!----></div> <div class="flex-1 min-w-0"><p class="text-sm text-gray-800"><span class="font-semibold">${escape_html(a.name)}</span> <span class="text-gray-500">${escape_html(activityVerb(a.type))}</span> <span class="font-medium">${escape_html(a.role)}</span></p> <p class="text-xs text-gray-400 mt-0.5">${escape_html(a.time)}</p></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----></div> `);
    Card($$renderer2, {
      class: "p-6",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex items-center justify-between mb-6"><div><h2 class="text-lg font-semibold text-gray-900">In-Demand Skills</h2> <p class="text-sm text-gray-500">Most frequently required across active jobs</p></div> `);
        Sparkles($$renderer3, { class: "w-5 h-5 text-purple-500" });
        $$renderer3.push(`<!----></div> <div class="grid sm:grid-cols-2 gap-x-8 gap-y-3"><!--[-->`);
        const each_array_13 = ensure_array_like(skills);
        for (let $$index_13 = 0, $$length = each_array_13.length; $$index_13 < $$length; $$index_13++) {
          let s = each_array_13[$$index_13];
          $$renderer3.push(`<div><div class="flex items-center justify-between mb-1"><span class="text-sm font-medium text-gray-700">${escape_html(s.name)}</span> <span class="text-xs text-gray-500 font-semibold">${escape_html(s.score)}%</span></div> <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-500 transition-all duration-700"${attr_style(`width: ${stringify(s.score)}%;`)}></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      }
    });
    $$renderer2.push(`<!----> <div class="grid sm:grid-cols-3 gap-4">`);
    Card($$renderer2, {
      class: "p-6 text-center bg-gradient-to-br from-emerald-50 to-emerald-100/40 border-emerald-200",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-12 h-12 mx-auto rounded-xl bg-emerald-500 flex items-center justify-center mb-3 shadow-md">`);
        Trophy($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div class="text-4xl font-bold text-gray-900 mb-1">87</div> <p class="text-gray-600 font-medium">Total Hires</p> <p class="text-sm text-emerald-600 mt-2 inline-flex items-center gap-1">`);
        Arrow_up_right($$renderer3, { class: "w-3.5 h-3.5" });
        $$renderer3.push(`<!----> +18 this month</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6 text-center bg-gradient-to-br from-amber-50 to-orange-100/40 border-amber-200",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-12 h-12 mx-auto rounded-xl bg-amber-500 flex items-center justify-center mb-3 shadow-md">`);
        Award($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div class="text-4xl font-bold text-gray-900 mb-1">9</div> <p class="text-gray-600 font-medium">Pending Offers</p> <p class="text-sm text-amber-600 mt-2 inline-flex items-center gap-1">`);
        Circle_alert($$renderer3, { class: "w-3.5 h-3.5" });
        $$renderer3.push(`<!----> Awaiting response</p>`);
      }
    });
    $$renderer2.push(`<!----> `);
    Card($$renderer2, {
      class: "p-6 text-center bg-gradient-to-br from-purple-50 to-pink-100/40 border-purple-200",
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="w-12 h-12 mx-auto rounded-xl bg-purple-500 flex items-center justify-center mb-3 shadow-md">`);
        Activity($$renderer3, { class: "w-6 h-6 text-white" });
        $$renderer3.push(`<!----></div> <div class="text-4xl font-bold text-gray-900 mb-1">744</div> <p class="text-gray-600 font-medium">In Interview Stage</p> <p class="text-sm text-purple-600 mt-2 inline-flex items-center gap-1">`);
        Zap($$renderer3, { class: "w-3.5 h-3.5" });
        $$renderer3.push(`<!----> Across all rounds</p>`);
      }
    });
    $$renderer2.push(`<!----></div></div>`);
  });
}
export {
  _page as default
};
