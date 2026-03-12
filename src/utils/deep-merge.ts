function isPlainObject(item: unknown): item is Record<keyof any, unknown> {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(item);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in item) &&
    !(Symbol.iterator in item)
  );
}

export function deepMerge<T extends Record<string, unknown>>(
  ...args: Partial<T>[]
): T {
  return args.reduce(
    (acc, value) => {
      Object.keys(value).forEach((key) => {
        if (
          isPlainObject(value[key]) &&
          !Array.isArray(value[key]) &&
          isPlainObject(acc[key])
        ) {
          acc[key] = deepMerge(
            (acc[key] as Record<string, unknown>) || {},
            value[key] as Record<string, unknown>,
          );
        } else if (Array.isArray(value[key])) {
          acc[key] = Array.isArray(acc[key])
            ? acc[key].concat(value[key])
            : value[key];
        } else {
          acc[key] = acc[key] ?? value[key];
        }
      });
      return acc;
    },
    {} as Record<string, unknown>,
  ) as T;
}
