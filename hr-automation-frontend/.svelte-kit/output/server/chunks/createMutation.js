import { r as readable, g as get, d as derived } from "./index.js";
import { MutationObserver, notifyManager, noop } from "@tanstack/query-core";
import { g as getQueryClientContext } from "./context2.js";
function useQueryClient(queryClient) {
  return getQueryClientContext();
}
function isSvelteStore(obj) {
  return "subscribe" in obj && typeof obj.subscribe === "function";
}
function createMutation(options, queryClient) {
  const client = useQueryClient();
  const optionsStore = isSvelteStore(options) ? options : readable(options);
  const observer = new MutationObserver(client, get(optionsStore));
  let mutate;
  optionsStore.subscribe(($options) => {
    mutate = (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    };
    observer.setOptions($options);
  });
  const result = readable(observer.getCurrentResult(), (set) => {
    return observer.subscribe(notifyManager.batchCalls((val) => set(val)));
  });
  const { subscribe } = derived(result, ($result) => ({
    ...$result,
    mutate,
    mutateAsync: $result.mutate
  }));
  return { subscribe };
}
export {
  createMutation as c,
  isSvelteStore as i,
  useQueryClient as u
};
