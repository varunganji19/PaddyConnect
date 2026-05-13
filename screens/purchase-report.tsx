import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const topFarmers = [
  { initials: "RR", color: "bg-primary", name: "Ramu Reddy", telugu: "రాము రెడ్డి", id: "FRM-1024", bags: "850" },
  { initials: "SK", color: "bg-government", name: "Suresh Kumar", telugu: "సురేష్ కుమార్", id: "FRM-2105", bags: "600" },
  { initials: "VR", color: "bg-danger", name: "Venkata Rao", telugu: "వెంకట రావు", id: "FRM-0892", bags: "420" }
];

export default function PurchaseReportScreen() {
  return (
    <Screen header compactHeader>
      <View className="gap-5">
        {/* Header */}
        <View>
          <Text className="text-3xl font-bold text-primary">Purchase Report</Text>
          <Text className="text-sm text-muted">కొనుగోలు నివేదిక</Text>
        </View>

        {/* Period + Actions */}
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-2 rounded-lg border border-outline-soft px-4 py-2.5">
            <Text className="font-semibold text-ink">This Month</Text>
            <Ionicons name="calendar-outline" size={16} color="#41493e" />
          </View>
          <Pressable className="rounded-lg border border-outline-soft p-2.5">
            <Ionicons name="document-text-outline" size={16} color="#41493e" />
          </Pressable>
          <Pressable className="rounded-lg border border-outline-soft p-2.5">
            <Ionicons name="share-outline" size={16} color="#41493e" />
          </Pressable>
        </View>

        {/* Summary Cards */}
        <View className="gap-3 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-sm text-muted">Total Purchase Amount</Text>
              <Text className="text-xs text-muted">మొత్తం కొనుగోలు మొత్తం</Text>
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-fixed">
              <Text className="font-bold text-primary">₹</Text>
            </View>
          </View>
          <Text className="text-3xl font-bold text-ink">₹10,45,000</Text>
          <View className="flex-row items-center gap-1">
            <Ionicons name="trending-up" size={14} color="#388E3C" />
            <Text className="text-sm text-success">+12% vs last month</Text>
          </View>
        </View>

        <View className="gap-3 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-sm text-muted">Total Bags Purchased</Text>
              <Text className="text-xs text-muted">కొనుగోలు చేసిన బస్తాలు</Text>
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-fixed">
              <Ionicons name="cube" size={16} color="#00450d" />
            </View>
          </View>
          <Text className="text-3xl font-bold text-ink">5,200</Text>
          <Text className="text-sm text-muted">Bags</Text>
        </View>

        <View className="gap-3 rounded-xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-sm text-muted">Avg Price / Quintal</Text>
              <Text className="text-xs text-muted">సగటు దర / క్వింటాల్</Text>
            </View>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary-fixed">
              <Ionicons name="wallet" size={16} color="#00450d" />
            </View>
          </View>
          <Text className="text-3xl font-bold text-ink">₹2,150</Text>
          <Text className="text-sm text-muted">— Stable pricing</Text>
        </View>

        {/* Purchase Trends */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View>
            <Text className="text-lg font-bold text-ink">Purchase Trends</Text>
            <Text className="text-xs text-muted">కొనుగోలు ధోరణులు (Weekly Volume)</Text>
          </View>
          {/* Simple bar chart */}
          <View className="flex-row items-end justify-between gap-2" style={{ height: 120 }}>
            {[
              { week: "W1", h: 40 },
              { week: "W2", h: 60 },
              { week: "W3", h: 80 },
              { week: "W4", h: 100 }
            ].map((bar) => (
              <View key={bar.week} className="flex-1 items-center gap-2">
                <View className="w-full rounded-t bg-primary" style={{ height: bar.h }} />
                <Text className="text-xs text-muted">{bar.week}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* By Variety */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View>
            <Text className="text-lg font-bold text-ink">By Variety</Text>
            <Text className="text-xs text-muted">రకాల వారీగా</Text>
          </View>
          <View className="gap-1">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-base font-semibold text-ink">Fine Paddy</Text>
                <Text className="text-xs text-muted">సన్న వరి</Text>
              </View>
              <Text className="text-lg font-bold text-primary">70%</Text>
            </View>
            <ProgressBar progress={70} color="bg-primary" height={8} />
            <Text className="text-right text-xs text-muted">3,640 bags</Text>
          </View>
          <View className="gap-1">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-base font-semibold text-ink">Coarse Paddy</Text>
                <Text className="text-xs text-muted">దొడ్డు వరి</Text>
              </View>
              <Text className="text-lg font-bold text-warning">30%</Text>
            </View>
            <ProgressBar progress={30} color="bg-warning" height={8} />
            <Text className="text-right text-xs text-muted">1,560 bags</Text>
          </View>
        </View>

        {/* Top Farmers */}
        <View className="gap-4 rounded-xl border border-outline-soft bg-white p-5">
          <View>
            <Text className="text-lg font-bold text-ink">Top Farmers (Suppliers)</Text>
            <Text className="text-xs text-muted">టాప్ రైతులు</Text>
          </View>
          {topFarmers.map((farmer) => (
            <View className="flex-row items-center justify-between" key={farmer.id}>
              <View className="flex-row items-center gap-3">
                <View className={`h-10 w-10 items-center justify-center rounded-full ${farmer.color}`}>
                  <Text className="font-bold text-white">{farmer.initials}</Text>
                </View>
                <View>
                  <Text className="text-base font-semibold text-ink">{farmer.name}</Text>
                  <Text className="text-xs text-muted">{farmer.telugu} • ID: {farmer.id}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-lg font-bold text-ink">{farmer.bags}</Text>
                <Text className="text-xs text-muted">Bags</Text>
              </View>
            </View>
          ))}
          <Pressable className="items-center py-2">
            <Text className="font-semibold text-primary">View All Suppliers</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
