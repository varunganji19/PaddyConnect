import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View, ScrollView } from "react-native";

const topBuyers = [
  { initials: "S", color: "bg-primary", name: "Srinivas Traders", qty: "1,200 Qtls", amount: "₹3,60,000" },
  { initials: "B", color: "bg-government", name: "Sri Balaji Traders", qty: "950 Qtls", amount: "₹2,85,000" },
  { initials: "R", color: "bg-danger", name: "Ramaiah & Sons", qty: "600 Qtls", amount: "₹1,80,000" }
];

export default function SalesReportScreen({ embedded }: { embedded?: boolean }) {
  const content = (
    <View className={`gap-5 ${embedded ? "pb-20" : ""}`}>
        {/* Header */}
        <View>
          <Text className="text-3xl font-bold text-primary">Sales Report</Text>
          <Text className="text-sm text-muted">అమ్మకాల నివేదిక</Text>
        </View>

        {/* Period */}
        <View className="flex-row items-center gap-2 self-start rounded-lg border border-outline-soft px-4 py-2.5">
          <Ionicons name="calendar-outline" size={16} color="#41493e" />
          <Text className="font-semibold text-ink">This Month (ఈ నెల)</Text>
        </View>

        {/* Export Actions */}
        <View className="flex-row gap-3">
          <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-outline-soft bg-white py-3">
            <Ionicons name="download-outline" size={16} color="#41493e" />
            <Text className="font-bold text-ink">EXPORT PDF</Text>
          </Pressable>
          <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-lg bg-primary py-3">
            <Ionicons name="share-outline" size={16} color="#ffffff" />
            <Text className="font-bold text-white">SHARE</Text>
          </Pressable>
        </View>

        {/* Total Sales */}
        <View className="gap-2 rounded-xl border border-outline-soft bg-white p-5">
          <Text className="text-sm text-muted">Total Sales / మొత్తం అమ్మకాలు</Text>
          <View className="flex-row items-baseline gap-3">
            <Text className="text-3xl font-bold text-ink">₹12,45,000</Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="trending-up" size={14} color="#388E3C" />
              <Text className="text-sm font-semibold text-success">8.5%</Text>
            </View>
          </View>
        </View>

        {/* Rice Sold + Avg Price */}
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1 rounded-xl border border-outline-soft bg-white p-4">
            <Text className="text-sm text-muted">Rice Sold (Qtls)</Text>
            <Text className="text-2xl font-bold text-ink">4,150</Text>
          </View>
          <View className="flex-1 gap-1 rounded-xl border border-outline-soft bg-white p-4">
            <Text className="text-sm text-muted">Avg Price / Qtl</Text>
            <Text className="text-2xl font-bold text-ink">₹3,000</Text>
          </View>
        </View>

        {/* Sales Trends */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-ink">Sales Trends</Text>
            <Text className="text-xs text-muted">అమ్మకాల పోకడలు</Text>
          </View>
          <View className="flex-row items-end justify-between gap-3" style={{ height: 120 }}>
            {[
              { week: "Wk 1", h: 50 },
              { week: "Wk 2", h: 75 },
              { week: "Wk 3", h: 85 },
              { week: "Wk 4", h: 110 }
            ].map((bar) => (
              <View key={bar.week} className="flex-1 items-center gap-2">
                <View className="w-full rounded-t bg-primary" style={{ height: bar.h }} />
                <Text className="text-xs text-muted">{bar.week}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* By Rice Type */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-ink">By Rice Type</Text>
            <Text className="text-xs text-muted">రకం వారీగా</Text>
          </View>
          <View className="gap-1">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-base font-semibold text-ink">Fine Rice</Text>
                <Text className="text-xs text-muted">సన్న బియ్యం</Text>
              </View>
              <Text className="text-lg font-bold text-primary">65%</Text>
            </View>
            <ProgressBar progress={65} color="bg-primary" height={8} />
          </View>
          <View className="gap-1">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-base font-semibold text-ink">Boiled Rice</Text>
                <Text className="text-xs text-muted">ఉప్పుడు బియ్యం</Text>
              </View>
              <Text className="text-lg font-bold text-danger">35%</Text>
            </View>
            <ProgressBar progress={35} color="bg-danger" height={8} />
          </View>
        </View>

        {/* Top Buyers */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-ink">Top Buyers</Text>
            <Text className="text-xs text-muted">ముఖ్య కొనుగోలుదారులు</Text>
          </View>
          {topBuyers.map((buyer) => (
            <View className="flex-row items-center justify-between" key={buyer.name}>
              <View className="flex-row items-center gap-3">
                <View className={`h-10 w-10 items-center justify-center rounded-full ${buyer.color}`}>
                  <Text className="text-lg font-bold text-white">{buyer.initials}</Text>
                </View>
                <View>
                  <Text className="text-base font-semibold text-ink">{buyer.name}</Text>
                  <Text className="text-xs text-muted">{buyer.qty}</Text>
                </View>
              </View>
              <Text className="text-base font-bold text-ink">{buyer.amount}</Text>
            </View>
          ))}
          <Pressable className="items-center py-2">
            <Text className="font-bold text-primary">VIEW ALL BUYERS</Text>
          </Pressable>
        </View>
      </View>
  );

  if (embedded) {
    return (
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-1">{content}</View>
      </ScrollView>
    );
  }

  return <Screen header compactHeader>{content}</Screen>;
}
