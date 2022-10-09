export function omitValues(values: any, omitItems = [null, undefined, ""]) {
  if (Array.isArray(values)) {
    return values.filter((item) => {
      return !omitItems.includes(item);
    });
  }

  const result = {};
  Object.keys(values || {}).forEach((item) => {
    let value = values[item];
    if (typeof value === "string") {
      value = value.trim();
    }
    if (!omitItems.includes(value)) {
      (result as any)[item] = value;
    }
  });

  return result;
}
