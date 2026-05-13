import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const icons = {
  index: "home",
  purchase: "leaf",
  sales: "cash",
  khata: "book",
  reports: "person"
} as const;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#f7fbf1" },
        headerTintColor: "#191d17",
        headerShadowVisible: false,
        tabBarActiveTintColor: "#00450d",
        tabBarInactiveTintColor: "#334033",
        tabBarStyle: { backgroundColor: "#eef2e8", borderTopColor: "#e0e4db", height: 76, paddingBottom: 10, paddingTop: 8 },
        tabBarLabelStyle: { fontWeight: "700", fontSize: 12 },
        tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name as keyof typeof icons] ?? "ellipse"} size={size} color={color} />
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="purchase" options={{ title: "Purchase" }} />
      <Tabs.Screen name="sales" options={{ title: "Sales" }} />
      <Tabs.Screen name="khata" options={{ title: "Khata" }} />
      <Tabs.Screen name="reports" options={{ title: "Profile" }} />
    </Tabs>
  );
}
