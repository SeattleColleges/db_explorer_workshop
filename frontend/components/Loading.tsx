import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import { theme } from "../constants/theme";

export function Loading() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      >
        <View style={styles.spinnerInner} />
      </Animated.View>
      <Text style={styles.text}>Loading plants...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.cream,
  },
  spinner: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing.lg,
  },
  spinnerInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: theme.colors.sage,
    borderTopColor: theme.colors.leaf,
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.forest,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
