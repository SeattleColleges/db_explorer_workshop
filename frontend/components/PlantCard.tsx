import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Row } from "../types/plants";
import { theme } from "../constants/theme";

interface PlantCardProps {
  plant: Row;
}

function formatKey(key: string): string {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

export function PlantCard({ plant }: PlantCardProps) {
  const entries = Object.entries(plant);
  if (entries.length === 0) return null;

  const [[, titleValue], ...rest] = entries;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{formatValue(titleValue)}</Text>
      {rest.map(([key, value]) => (
        <View key={key} style={styles.infoRow}>
          <Text style={styles.label}>{formatKey(key)}:</Text>
          <Text style={styles.value}>{formatValue(value)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cream,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.md,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.forest,
    marginBottom: theme.spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: theme.spacing.xs,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.forest,
  },
  value: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.earth,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
});
