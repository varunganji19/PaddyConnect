import "@/global.css";
import "@/lib/i18n";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? "#11140e" : "#f7fbf1";
  const textColor = isDark ? "#e2e3dd" : "#191d17";
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: bgColor },
          headerShadowVisible: false,
          headerTintColor: textColor,
          contentStyle: { backgroundColor: bgColor }
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ title: "Mill Profile", headerStyle: { backgroundColor: "white" }, headerTintColor: "black" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="gst-calculator" options={{ headerShown: false }} />
        <Stack.Screen name="invoice" options={{ headerShown: false }} />
        <Stack.Screen name="godown" options={{ headerShown: false }} />
        <Stack.Screen name="khata-entry" options={{ headerShown: false }} />
        <Stack.Screen name="cmr-tracker" options={{ headerShown: false }} />
        <Stack.Screen name="ai-assistant" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="purchase-report" options={{ headerShown: false }} />
        <Stack.Screen name="sales-report" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </>
  );
}
