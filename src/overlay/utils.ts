import { useEffect } from "react";

export function useListener<K extends keyof WindowEventMap>(
  node: EventTarget,
  eventName: K,
  callback: (e: WindowEventMap[K]) => void,
  enabled: boolean
) {
  useEffect(() => {
    if (enabled) {
      node.addEventListener(eventName, callback as (e: Event) => void, false);
      return () => {
        node.removeEventListener(eventName, callback as (e: Event) => void, false);
      };
    }
  }, [enabled, eventName, callback]);
}
