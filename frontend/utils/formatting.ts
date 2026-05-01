export function formatPrice(price: string | number): string {
  const numPrice = typeof price === "string" ? Number(price) : price;
  return `$${numPrice.toFixed(2)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function normalizeTags(tags: string | string[] | null): string[] {
  if (!tags) return [];

  // If it's already an array, return it
  if (Array.isArray(tags)) return tags;

  // If it's a string
  if (typeof tags === "string") {
    // Try to parse as JSON array
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Not JSON, continue
    }

    // Try to parse as CSV
    if (tags.includes(",")) {
      return tags.split(",").map((tag) => tag.trim());
    }

    // Try to parse as PostgreSQL array format {tag1,tag2}
    if (tags.startsWith("{") && tags.endsWith("}")) {
      return tags
        .slice(1, -1)
        .split(",")
        .map((tag) => tag.trim());
    }

    // Return as single-item array
    return [tags];
  }

  return [];
}
