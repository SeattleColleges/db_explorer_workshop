import { Platform } from "react-native";

/**
 * Get the API URL based on the platform
 * On Android emulator, localhost is mapped to 10.0.2.2
 * On iOS simulator and physical devices, use the configured URL
 */
export function getApiUrl(): string {
  const configuredUrl =
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

  // Android emulator maps localhost to 10.0.2.2
  if (Platform.OS === "android") {
    return configuredUrl.replace("localhost", "10.0.2.2");
  }

  return configuredUrl;
}
