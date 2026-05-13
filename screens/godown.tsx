import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const groups = [
  { title: "Paddy (Raw)", icon: "apps", color: "#FFC107", rows: [["Fine", "12,450 Qtl", "Sufficient"], ["Coarse", "8,200 Qtl", "Reorder Soon"]] },
  { title: "Milled Rice", icon: "file-tray", color: "#1976D2", rows: [["Fine", "4,500 Qtl", ""], ["Boiled", "2,100 Qtl", ""], ["Coarse ⚠", "150 Qtl", "Low Stock"]] },
  { title: "By-Products", icon: "sync", color: "#8f4e00", rows: [["Bran", "1,850 Qtl", ""], ["Husk", "3,200 Qtl", ""], ["Broken", "450 Qtl", ""]] },
  { title: "Inputs", icon: "bag-handle", color: "#717a6d", rows: [["Gunny Bags", "15,000 Pcs", "Adequate"]] }
] as const;

export default function GodownScreen() {
  return (
    <Screen header>
      <View className="gap-5">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-3xl font-bold text-ink">Godown Stock</Text>
            <Text className="mt-2 text-lg text-muted">↻ Last updated: Today,{"\n"}08:30 AM</Text>
          </View>
          <View className="min-h-14 min-w-44 items-center justify-center rounded-full bg-primary px-5">
            <Text className="text-center text-lg font-bold text-white">+ Manual{"\n"}Adjustment</Text>
          </View>
        </View>
        {groups.map((group) => (
          <View className="gap-4 rounded border border-outline-soft bg-white p-5" key={group.title}>
            <View className="flex-row items-center gap-3 border-b border-outline-soft pb-3">
              <Ionicons name={group.icon} size={28} color={group.color} />
              <Text className="text-2xl font-bold text-ink">{group.title}</Text>
            </View>
            {group.rows.map(([name, value, badge]) => (
              <View className={badge === "Low Stock" ? "rounded border border-red-200 bg-surface-muted p-4" : "rounded bg-surface-muted p-4"} key={name}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl text-ink">{name}</Text>
                  <Text className={badge === "Low Stock" ? "text-xl text-danger" : "text-xl text-ink"}>{value}</Text>
                </View>
                {!!badge && <Text className={badge === "Low Stock" ? "mt-2 self-end font-bold text-danger" : badge === "Reorder Soon" ? "mt-2 self-end rounded bg-orange-50 px-3 py-1 font-bold text-warning" : "mt-2 self-end rounded bg-green-50 px-3 py-1 font-bold text-success"}>{badge}</Text>}
              </View>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
}
