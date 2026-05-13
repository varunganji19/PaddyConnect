import { AlertBanner } from "@/components/AlertBanner";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const stats = [
  { title: "Today's Purchase", value: "150", suffix: "bags", icon: "cart", color: "#00450d", tint: "bg-green-50", route: "/purchase" },
  { title: "Pending Payments", value: "₹45,000", suffix: "", icon: "wallet", color: "#D32F2F", tint: "bg-red-50", route: "/khata" },
  { title: "Stock in Godown", value: "320", suffix: "bags", icon: "home", color: "#8f4e00", tint: "bg-amber-50", route: "/godown" },
  { title: "Month Profit", value: "₹18,500", suffix: "", icon: "trending-up", color: "#388E3C", tint: "bg-green-50", route: "/khata" },
  { title: "Generate Invoice", value: "New", suffix: "Sale", icon: "document-text", color: "#1976D2", tint: "bg-blue-50", route: "/invoice" },
  { title: "CMR Tracker", value: "200", suffix: "bags due", icon: "shield-checkmark", color: "#00450d", tint: "bg-green-50", route: "/cmr-tracker" }
] as const;

const activity = [
  { icon: "bus", tint: "bg-green-50", title: "Paddy Received: Farmer Subbarao", meta: "10:30 AM • Lorry AP16XX1234", value: "+50\nbags", color: "#00450d" },
  { icon: "card", tint: "bg-red-50", title: "Payment Dispatched", meta: "Yesterday • Bank Transfer", value: "-₹15,000", color: "#D32F2F" },
  { icon: "business", tint: "bg-amber-50", title: "Milling Batch Completed", meta: "Yesterday • Batch #402", value: "120qtl", color: "#8f4e00" }
] as const;

export default function DashboardScreen() {
  return (
    <Screen header hideHeaderLeftIcon>
      <View className="gap-6">
        <View>
          <Text className="text-lg text-muted">October 24, 2023</Text>
          <Text className="mt-2 text-4xl font-bold text-ink">Namaskaram, Ravi Garu</Text>
        </View>

        <AlertBanner title="CMR Alert: Delivery Due" message="200 bags of custom milled rice are due for government dispatch by Friday." variant="danger" />

        <View className="gap-4">
          <View className="flex-row gap-4">
            {stats.slice(0, 2).map((item) => <StatCard key={item.title} {...item} />)}
          </View>
          <View className="flex-row gap-4">
            {stats.slice(2, 4).map((item) => <StatCard key={item.title} {...item} />)}
          </View>
          <View className="flex-row gap-4">
            {stats.slice(4, 6).map((item) => <StatCard key={item.title} {...item} />)}
          </View>
        </View>

        <View className="gap-4">
          <Text className="text-3xl font-bold text-ink">Recent Activity</Text>
          <View className="overflow-hidden rounded-3xl border border-outline-soft bg-white">
            {activity.map((item, index) => (
              <View className={index === activity.length - 1 ? "flex-row items-center gap-4 p-4" : "flex-row items-center gap-4 border-b border-outline-soft p-4"} key={item.title}>
                <View className={`h-12 w-12 items-center justify-center rounded-full ${item.tint}`}>
                  <Ionicons name={item.icon} size={24} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-ink">{item.title}</Text>
                  <Text className="mt-1 text-base text-muted">{item.meta}</Text>
                </View>
                <Text className="text-right text-xl font-bold text-ink">{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}

function StatCard({ title, value, suffix, icon, color, tint, route }: (typeof stats)[number]) {
  return (
    <Pressable className="min-h-44 flex-1 justify-between rounded-3xl border border-outline-soft bg-white p-5" onPress={() => router.push(route as any)}>
      <View className="flex-row items-start justify-between">
        <Text className="max-w-32 text-xl leading-7 text-muted">{title}</Text>
        <View className={`h-12 w-12 items-center justify-center rounded-full ${tint}`}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
      </View>
      <Text className="text-4xl font-bold text-ink">
        {value} <Text className="text-xl font-normal">{suffix}</Text>
      </Text>
      {title === "Stock in Godown" && (
        <View className="h-3 overflow-hidden rounded-full bg-surface-highest">
          <View className="h-3 w-[70%] rounded-full bg-secondary" />
        </View>
      )}
    </Pressable>
  );
}
