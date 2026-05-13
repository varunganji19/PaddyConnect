import { FormField } from "@/components/FormField";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function KhataEntryScreen() {
  const [partyName, setPartyName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"receivable" | "payable">("receivable");
  const [description, setDescription] = useState("");

  return (
    <Screen>
      <View className="gap-5">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()} className="rounded-full bg-surface-low p-2">
            <Ionicons name="arrow-back" size={20} color="#191d17" />
          </Pressable>
          <View>
            <Text className="text-3xl font-bold text-ink">Manual Entry</Text>
            <Text className="mt-1 text-base text-muted">Add a new record to Khata</Text>
          </View>
        </View>

        <View className="gap-4">
          <FormField label="Party Name" value={partyName} onChangeText={setPartyName} placeholder="Enter party name" />
          
          <View className="gap-2">
            <Text className="text-sm font-semibold text-muted">Entry Type</Text>
            <View className="flex-row overflow-hidden rounded-lg border border-outline-soft">
              <Pressable 
                onPress={() => setType("receivable")} 
                className={`flex-1 flex-row items-center justify-center gap-1 py-3 ${type === "receivable" ? "bg-success/10" : "bg-white"}`}
              >
                <Ionicons name="arrow-down" size={16} color={type === "receivable" ? "#388E3C" : "#717a6d"} />
                <Text className={`font-semibold ${type === "receivable" ? "text-success" : "text-muted"}`}>Receivable</Text>
              </Pressable>
              <Pressable 
                onPress={() => setType("payable")} 
                className={`flex-1 flex-row items-center justify-center gap-1 border-l border-outline-soft py-3 ${type === "payable" ? "bg-danger-soft" : "bg-white"}`}
              >
                <Ionicons name="arrow-up" size={16} color={type === "payable" ? "#ba1a1a" : "#717a6d"} />
                <Text className={`font-semibold ${type === "payable" ? "text-danger" : "text-muted"}`}>Payable</Text>
              </Pressable>
            </View>
          </View>

          <FormField label="Amount (₹)" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="0.00" />
          
          <FormField label="Description / Notes" value={description} onChangeText={setDescription} placeholder="Optional details" />
        </View>

        <Pressable 
          className="mt-4 min-h-14 items-center justify-center rounded-xl bg-primary"
          onPress={() => router.back()}
        >
          <Text className="text-lg font-bold text-white">Save Entry</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
