import { Platform } from "react-native";
import Constants from "expo-constants";

export function getApiUrl(): string {
  // In Expo Go (dev), derive the host from the dev server so no IP needs to be
  // hardcoded — works automatically on any network for both iOS and Android.
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      const host = hostUri.split(":")[0];
      return `http://${host}:3001`;
    }
  }

  const configuredUrl =
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

  if (Platform.OS === "android") {
    return configuredUrl.replace("localhost", "10.0.2.2");
  }

  return configuredUrl;
}
