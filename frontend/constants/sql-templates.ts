export const sqlTemplates = {
  createTable: `CREATE TABLE records (
  id,
  name,
  description,
  is_active,
  price,
  created_at,
  tags,
  metadata,
  internal_uuid
);`,
};

export const schemaReference = [
  {
    column: "id",
    type: "A unique identifier that generates automatically for every new record.",
    description: "Auto-incrementing primary key",
    displayed: "Unique record ID",
  },
  {
    column: "name",
    type: "The name of the record (e.g., Product A). Max 100 characters.",
    description: "Name (max 100 characters)",
    displayed: "Card title",
  },
  {
    column: "description",
    type: "A long-form paragraph about the record.",
    description: "Unlimited text description",
    displayed: "Card description (clamped to 3 lines)",
  },
  {
    column: "is_active",
    type: "A simple yes/no check",
    description: "True/false flag",
    displayed: '"Yes" or "No"',
  },
  {
    column: "price",
    type: "A monetary value (e.g., $3.50). Must be exact.",
    description: "Monetary value (no floats!)",
    displayed: "Formatted as $X.XX",
  },
  {
    column: "created_at",
    type: "Only the date the record was created",
    description: "Creation date (YYYY-MM-DD)",
    displayed: 'Formatted as "Jan 1, 2024"',
  },
  {
    column: "tags",
    type: "An array of strings describing the record's attributes.",
    description: "PostgreSQL array of strings",
    displayed: "Comma-separated tags",
  },
  {
    column: "metadata",
    type: "Extra info in nested format (like external API data)",
    description: "Flexible JSON structure (indexed)",
    displayed: "Additional record data",
  },
  {
    column: "internal_uuid",
    type: "A unique string for internal tracking that isn't a simple number",
    description: "Auto-generated globally unique ID",
    displayed: "Monospace UUID value",
  },
];
