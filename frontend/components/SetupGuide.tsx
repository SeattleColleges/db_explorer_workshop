import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard,
} from "react-native";
import { theme } from "../constants/theme";
import { sqlTemplates, schemaReference } from "../constants/sql-templates";

interface SetupGuideProps {
  onSetupComplete: () => void;
  errorMessage?: string;
}

export function SetupGuide({ onSetupComplete, errorMessage }: SetupGuideProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await Clipboard.setString(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to copy to clipboard");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Setup Guide</Text>
        <Text style={styles.subtitle}>Follow these steps to get started</Text>
      </View>

      {errorMessage && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <View style={styles.steps}>
        {/* Step 1 */}
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Create Supabase Project</Text>
            <Text style={styles.stepDescription}>
              Visit supabase.com and create a free account. Create a new
              PostgreSQL database project.
            </Text>
          </View>
        </View>

        {/* Step 2 */}
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Create plants Table</Text>
            <Text style={styles.stepDescription}>
              Open the SQL Editor in Supabase and run this command after adding
              the correct <Text style={{ fontWeight: "bold" }}>data type</Text>{" "}
              for each column:
            </Text>
            <TouchableOpacity
              style={[
                styles.sqlBox,
                copiedIndex === 0 ? styles.sqlBoxCopied : null,
              ]}
              onPress={() => copyToClipboard(sqlTemplates.createTable, 0)}
            >
              <Text style={styles.sqlText} selectable>
                {sqlTemplates.createTable}
              </Text>
              <Text style={styles.copyHint}>
                {copiedIndex === 0 ? "✓ Copied!" : "Tap to copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Insert Sample Data</Text>
            <Text style={styles.stepDescription}>
              Add sample plant data into your table:
            </Text>
            <TouchableOpacity
              style={[
                styles.sqlBox,
                copiedIndex === 1 ? styles.sqlBoxCopied : null,
              ]}
              onPress={() => copyToClipboard(sqlTemplates.insertSample, 1)}
            >
              <Text style={styles.sqlText} selectable>
                {sqlTemplates.insertSample}
              </Text>
              <Text style={styles.copyHint}>
                {copiedIndex === 1 ? "✓ Copied!" : "Tap to copy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Step 4 */}
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Configure Backend</Text>
            <Text style={styles.stepDescription}>
              In the backend folder, create a .env file, copy and paste your
              database connection placeholder string, you will edit this file
              later with your actual supabase credentials and necessary strings.{" "}
              <Text style={{ fontWeight: "bold" }}>NOTE</Text>! NEVER COMMIT
              YOUR .env FILE TO GITHUB.
            </Text>
            <View style={styles.sqlBox}>
              <Text style={styles.sqlText}>
                DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
              </Text>
            </View>
            <Text style={styles.hint}>Hints in .env.example file</Text>
          </View>
        </View>

        {/* Step 5 */}
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>5</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Schema Reference</Text>
            <Text style={styles.stepDescription}>
              Here are the columns AND data type descriptions in the plants
              table:
            </Text>
            {schemaReference.map((ref, index) => (
              <View key={index} style={styles.schemaRow}>
                <Text style={styles.schemaColumn}>{ref.column}</Text>
                <Text style={styles.schemaType}>{ref.type}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onSetupComplete}>
        <Text style={styles.buttonText}>✓ Completed Setup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: "center",
  },
  title: {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.forest,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.earth,
  },
  errorBox: {
    backgroundColor: "#ffebee",
    borderLeftWidth: 4,
    borderLeftColor: "#c62828",
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
  },
  errorText: {
    color: "#c62828",
    fontSize: theme.typography.fontSize.sm,
  },
  steps: {
    marginBottom: theme.spacing.xl,
  },
  step: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.leaf,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  stepNumberText: {
    color: theme.colors.cream,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.forest,
    marginBottom: theme.spacing.sm,
  },
  stepDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.ink,
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  sqlBox: {
    backgroundColor: "#263238",
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.leaf,
  },
  sqlText: {
    fontFamily: "monospace",
    fontSize: theme.typography.fontSize.xs,
    color: "#90caf9",
    lineHeight: 18,
  },
  copyHint: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.sage,
    marginTop: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  hint: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.earth,
    marginTop: theme.spacing.sm,
    fontStyle: "italic",
  },
  schemaRow: {
    flexDirection: "row",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.sage,
  },
  schemaColumn: {
    flex: 1,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.forest,
    fontSize: theme.typography.fontSize.sm,
  },
  schemaType: {
    flex: 1,
    color: theme.colors.earth,
    fontSize: theme.typography.fontSize.sm,
    fontFamily: "monospace",
  },
  sqlBoxCopied: {
    backgroundColor: "#1b5e20",
  },
  button: {
    backgroundColor: theme.colors.leaf,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    ...theme.shadows.md,
  },
  buttonText: {
    color: theme.colors.cream,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
