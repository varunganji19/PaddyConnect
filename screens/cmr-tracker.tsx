import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function CmrTrackerScreen() {
  return (
    <Screen header compactHeader>
      <View className="gap-5">
        <Text className="text-3xl font-bold text-ink">CMR Tracker (Government Obligation)</Text>
        <View className="self-start rounded-full bg-surface-highest px-4 py-1">
          <Text className="font-bold text-ink">Season: Kharif 2025</Text>
        </View>
        <View className="flex-row items-center gap-2 self-start rounded-full border border-red-200 bg-danger-soft px-5 py-3">
          <Ionicons name="warning" size={20} color="#ba1a1a" />
          <Text className="text-lg font-bold text-danger">20 days remaining</Text>
        </View>
        <View className="gap-4 rounded-3xl border border-outline-soft bg-white p-6">
          <View className="flex-row justify-between">
            <Text className="text-2xl font-bold text-ink">FCI Delivery Progress</Text>
            <Text className="text-xl font-bold text-government">64%</Text>
          </View>
          <View className="h-4 overflow-hidden rounded-full bg-surface-highest">
            <View className="h-4 w-[64%] rounded-full bg-government" />
          </View>
          <Text className="text-base text-muted">ⓘ Target delivery completion by end of season.</Text>
        </View>
        <View className="min-h-14 items-center justify-center rounded-full bg-primary">
          <Text className="text-xl font-bold text-white">+ Add Delivery</Text>
        </View>
        <View className="min-h-14 items-center justify-center rounded-full bg-secondary">
          <Text className="text-xl font-bold text-white">✧ CMR Yield Calculator</Text>
        </View>
        <View className="flex-row gap-3">
          <Metric label="Allocated" value="5,000 bags" meta="▣ Total Target" />
          <Metric label="Delivered" value="3,200 bags" meta="▱ Accepted by FCI" green />
        </View>
        <Metric label="Remaining" value="1,800 bags" meta="▣ Pending Dispatch" danger />
        <View className="overflow-hidden rounded-3xl border border-outline-soft bg-white">
          <View className="flex-row justify-between p-5">
            <Text className="text-2xl font-bold text-ink">Delivery Log (FCI)</Text>
            <Text className="text-primary">View All</Text>
          </View>
          {[
            ["Truck AP16 TX 4590", "Oct 24, 2024 • Receipt: #RC-9021", "+400\nBags", "ACCEPTED"],
            ["Truck TS08 AB 1234", "Oct 20, 2024 • Receipt: #RC-8842", "+600\nBags", "ACCEPTED"],
            ["Truck TS09 CD 5678", "Oct 26, 2024 • Dispatched", "+350 Bags", "IN TRANSIT"]
          ].map(([title, meta, bags, status]) => (
            <View className="flex-row items-center gap-4 border-t border-outline-soft p-4" key={title}>
              <Ionicons name={status === "IN TRANSIT" ? "time-outline" : "checkmark-circle-outline"} size={34} color={status === "IN TRANSIT" ? "#F57C00" : "#388E3C"} />
              <View className="flex-1">
                <Text className="text-lg font-bold text-ink">{title}</Text>
                <Text className="text-muted">{meta}</Text>
              </View>
              <View className="items-end">
                <Text className="text-lg font-bold text-ink">{bags}</Text>
                <Text className={status === "IN TRANSIT" ? "font-bold text-warning" : "font-bold text-success"}>{status}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

function Metric({ label, value, meta, green, danger }: { label: string; value: string; meta: string; green?: boolean; danger?: boolean }) {
  return (
    <View className={danger ? "flex-1 rounded-3xl border border-red-200 bg-white p-5" : "flex-1 rounded-3xl border border-outline-soft bg-white p-5"}>
      <Text className={danger ? "font-bold text-danger" : green ? "font-bold text-success" : "font-bold text-muted"}>{label}</Text>
      <Text className={danger ? "mt-2 text-xl text-danger" : green ? "mt-2 text-xl text-success" : "mt-2 text-xl text-ink"}>{value}</Text>
      <Text className={danger ? "mt-1 text-danger" : green ? "mt-1 text-success" : "mt-1 text-muted"}>{meta}</Text>
    </View>
  );
}
