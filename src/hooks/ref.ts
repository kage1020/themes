import type React from "react";
import { useMemo } from "react";

type ReactRef<T> = React.Ref<T> | React.RefObject<T>;

type MergedRef<T> = {
  set: (node: T) => void;
  current: ReactRef<T>[] | null;
};

export function useMergeRefs<T>(
  ...refs: (ReactRef<T> | undefined)[]
): MergedRef<T> {
  return useMemo(() => {
    if (refs.filter(Boolean).length === 0) {
      return {
        set: (_node: T) => {},
        current: null,
      };
    }

    return {
      set: (node: T) => {
        refs.forEach((ref) => {
          if (ref) {
            if (typeof ref === "function") {
              ref(node);
            } else {
              ref.current = node;
            }
          }
        });
      },
      current: refs.filter(Boolean) as ReactRef<T>[],
    };
  }, [refs]);
}
