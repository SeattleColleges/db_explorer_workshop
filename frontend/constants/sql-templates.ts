export const sqlTemplates = {
  createTable: `CREATE TABLE plants (
  id,
  common_name,
  description,
  is_edible,
  price,
  date_planted,
  growth_tags,
  metadata,
  internal_uuid 
);`,

  insertSample: `INSERT INTO plants(), VALUES(); ...`,
};

export const schemaReference = [
  {
    column: "id",
    type: "A unique identifier that generates automatically for every new plant entry.",
    description: "Auto-incrementing primary key",
    displayed: "Unique plant ID",
  },
  {
    column: "common_name",
    type: "The name of the plant e.g., Tomato. Max 100 characters.",
    description: "Plant name (max 100 characters)",
    displayed: "Card title",
  },
  {
    column: "description",
    type: "A long-form paragraph about the plant's history and care instructions.",
    description: "Unlimited text description",
    displayed: "Card description (clamped to 3 lines)",
  },
  {
    column: "is_edible",
    type: "A simple yes/no check",
    description: "True/false flag",
    displayed: '"🥗 Edible" or "🚫 Not edible" badge',
  },
  {
    column: "price",
    type: "The cost of a seed packet (e.g., $3.50). Must be exact",
    description: "Monetary value (no floats!)",
    displayed: "Formatted as $X.XX",
  },
  {
    column: "date_planted",
    type: "Only the date the seed was put in the ground",
    description: "Planting date (YYYY-MM-DD)",
    displayed: 'Formatted as "Jan 1, 2024"',
  },
  {
    column: "growth_tags",
    type: "An array of strings describing the plant's growth characteristics.",
    description: "PostgreSQL array of strings",
    displayed: "Comma-separated tags",
  },
  {
    column: "metadata",
    type: "Extra info from an external API in nested format (like weather requirements)",
    description: "Flexible JSON structure (indexed)",
    displayed: "Additional plant data",
  },
  {
    column: "internal_uuid",
    type: "A unique string for internal tracking that isn't a simple number",
    description: "Auto-generated globally unique ID",
    displayed: "Monospace UUID value",
  },
];
