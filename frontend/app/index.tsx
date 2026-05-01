import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTable } from "../hooks/useTable";
import { RowCard } from "../components/RowCard";
import { Loading } from "../components/Loading";
import { ErrorState } from "../components/ErrorState";
import { SetupGuide } from "../components/SetupGuide";
import { theme } from "../constants/theme";

export default function HomeScreen() {
  const {
    appState,
    rows,
    tableName,
    errorMsg,
    handleViewRows,
    handleRetry,
    handleSetupComplete,
  } = useTable();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {appState === "idle" && (
          <View style={styles.idleContainer}>
            <Text style={styles.leafEmoji}>🗄️</Text>
            <Text style={styles.title}>Supabase Workshop</Text>
            <Text style={styles.subtitle}>Database Explorer</Text>
            <TouchableOpacity style={styles.button} onPress={handleViewRows}>
              <Text style={styles.buttonText}>Load Data</Text>
            </TouchableOpacity>
          </View>
        )}

        {appState === "loading" && <Loading />}

        {appState === "setup" && (
          <SetupGuide
            onSetupComplete={handleSetupComplete}
            errorMessage={errorMsg}
          />
        )}

        {appState === "loaded" && (
          <View style={styles.loadedContainer}>
            <View style={styles.loadedHeader}>
              <Text style={styles.loadedTitle}>🗄️ {tableName}</Text>
              <Text style={styles.rowCount}>{rows.length} found</Text>
            </View>
            <FlatList
              data={rows}
              renderItem={({ item }) => <RowCard row={item} />}
              keyExtractor={(item, index) => {
                const first = Object.values(item)[0];
                return first != null ? String(first) : String(index);
              }}
              contentContainerStyle={styles.listContent}
              scrollEnabled={true}
            />
            <TouchableOpacity
              style={[styles.button, styles.refreshButton]}
              onPress={handleRetry}
            >
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  container: {
    flex: 1,
  },
  idleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.cream,
    padding: theme.spacing.lg,
  },
  leafEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.fontSize["3xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.forest,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.earth,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.leaf,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.cream,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  },
  loadedContainer: {
    flex: 1,
    backgroundColor: theme.colors.cream,
  },
  loadedHeader: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.cream,
  },
  loadedTitle: {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.forest,
    marginBottom: theme.spacing.sm,
  },
  rowCount: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.earth,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
    flexGrow: 1,
  },
  refreshButton: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
});
