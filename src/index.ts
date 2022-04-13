import getValueByKey from "get-value-key";

/**
 * Selects the value at a given key path in an array of objects.
 * @param key
 * @returns Map function
 */
function select<T>(key: string) {
  return function (item: Record<string, any>): T | null {
    return getValueByKey<T>(item, key);
  };
}

/**
 * Picks the values at the given key paths in an array of objects.
 * @param keys
 * @returns Map function
 */
function pick<T>(...keys: Array<string>) {
  return function (item: Record<string, any>): T | null {
    function keysToObject<V>(
      keys: Array<string>,
      value: V
    ): Record<string, any> {
      const key = keys[0];
      if (keys.length === 1) {
        return { [key]: value };
      }
      return {
        [key]: keysToObject(keys.slice(1), value),
      };
    }

    const mappedObject = keys.reduce<Record<string, any> | null>((obj, key) => {
      if (!key) {
        return null;
      }

      const value = getValueByKey(item, key);

      return {
        ...obj,
        ...(value ? keysToObject<typeof value>(key.split("."), value) : null),
      };
    }, {}) as T;

    if (mappedObject && !Object.keys(mappedObject).length) {
      return null;
    }
    return mappedObject;
  };
}

export { select, pick };
