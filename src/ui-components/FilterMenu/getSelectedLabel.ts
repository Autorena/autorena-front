export function getSelectedLabel(
  field: {
    type: "radio" | "checkbox" | "custom";
    key: string;
    options?: { value: string; label: string }[];
  },
  value: unknown,
  watch: (name: string) => unknown
): string | undefined {
  if (field.type === "custom" && field.key === "year") {
    const minYear = watch("min_year");
    const maxYear = watch("max_year");
    if (minYear || maxYear) {
      if (minYear && maxYear) {
        return `${minYear} - ${maxYear}`;
      } else if (minYear) {
        return `От ${minYear}`;
      } else if (maxYear) {
        return `До ${maxYear}`;
      }
    }
    return undefined;
  }
  if (field.type === "custom" && field.key === "price") {
    const minPrice = watch("min_price_per_day") || watch("min_price");
    const maxPrice = watch("max_price_per_day") || watch("max_price");
    if (minPrice || maxPrice) {
      if (minPrice && maxPrice) {
        return `От ${minPrice}₽ до ${maxPrice}₽`;
      } else if (minPrice) {
        return `От ${minPrice}₽`;
      } else if (maxPrice) {
        return `До ${maxPrice}₽`;
      }
    }
    return undefined;
  }
  if (field.type === "checkbox") {
    if (Array.isArray(value) && field.options) {
      if (value.length === 0) return undefined;
      return field.options
        .filter((o) => value.includes(o.value))
        .map((o) => o.label)
        .join(", ");
    }
    if (
      value &&
      typeof value === "object" &&
      "periods" in value &&
      Array.isArray((value as { periods: unknown[] }).periods) &&
      field.options
    ) {
      const periods = (value as { periods: (string | number)[] }).periods;
      if (periods.length === 0) return undefined;
      return field.options
        .filter((o) => periods.includes(o.value))
        .map((o) => o.label)
        .join(", ");
    }
    return undefined;
  }
  if (typeof value === "string" || typeof value === "number") {
    return field.options?.find((o) => o.value === value)?.label;
  }
  return undefined;
}
