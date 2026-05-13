import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

const parties = [
  { name: "Srinivas Traders", amount: "₹45,000", since: "Since: 12 Oct 2023", overdue: "Overdue by 15 days" },
  { name: "Ravi Fertilizers", amount: "₹33,000", since: "Since: 01 Nov 2023" }
];

export default function KhataScreen() {
  return (
    <Screen header>
      <View className="gap-6">
        <View className="rounded-3xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-center gap-3">
            <Ionicons name="business-outline" size={28} color="#388E3C" />
            <Text className="text-2xl text-muted">Net Balance</Text>
          </View>
          <Text className="mt-3 text-3xl font-bold text-success">₹55,000</Text>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 rounded-3xl border border-outline-soft bg-white p-5">
            <Ionicons name="arrow-down" size={34} color="#388E3C" />
            <Text className="mt-3 text-2xl text-muted">You will{"\n"}Receive</Text>
            <Text className="mt-4 text-3xl font-bold text-success">₹78,000</Text>
          </View>
          <View className="flex-1 rounded-3xl border border-outline-soft bg-white p-5">
            <Ionicons name="arrow-up" size={34} color="#D32F2F" />
            <Text className="mt-3 text-2xl text-muted">You have to{"\n"}Pay</Text>
            <Text className="mt-4 text-3xl font-bold text-danger">₹23,000</Text>
          </View>
        </View>

        <View>
          <View className="flex-row gap-12 border-b border-outline-soft">
            <Text className="border-b-2 border-primary px-4 pb-4 text-2xl text-primary">Receivable</Text>
            <Text className="pb-4 text-2xl text-muted">Payable</Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="min-h-14 flex-1 flex-row items-center gap-3 rounded-full border border-muted bg-white px-5">
            <Ionicons name="search" size={28} color="#334033" />
            <TextInput className="flex-1 outline-none text-xl text-ink" placeholder="Search parties..." placeholderTextColor="#6b7280" />
          </View>
          <View className="min-h-14 flex-row items-center gap-3 rounded-full border border-ink bg-white px-5">
            <Ionicons name="filter" size={24} color="#00450d" />
            <Text className="text-xl text-primary">Filter</Text>
          </View>
        </View>

        <View className="gap-4">
          {parties.map((party) => (
            <View className={party.overdue ? "overflow-hidden rounded-3xl border border-outline-soft border-l-4 border-l-danger bg-white p-5" : "rounded-3xl border border-outline-soft bg-white p-5"} key={party.name}>
              <View className="flex-row justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-3xl font-bold text-ink">{party.name}</Text>
                  <Text className="mt-4 text-lg text-muted">{party.since}</Text>
                  {party.overdue && (
                    <View className="mt-3 self-start rounded-full bg-danger-soft px-4 py-1">
                      <Text className="font-bold text-danger">⚠ {party.overdue}</Text>
                    </View>
                  )}
                </View>
                <View className="items-end">
                  <Text className="text-2xl font-bold text-success">{party.amount}</Text>
                  <Text className="mt-5 text-lg font-semibold text-primary">View Details ›</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}
