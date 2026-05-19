import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import "../../chunks/auth.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="min-h-screen bg-obsidian-950 flex items-center justify-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-royal-500 border-t-transparent"></div></div>`);
  });
}
export {
  _page as default
};
