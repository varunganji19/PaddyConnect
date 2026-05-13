import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

export default function AiAssistantScreen() {
  return (
    <Screen header={false}>
      <View className="-mx-4 -mt-5 min-h-16 flex-row items-center justify-between border-b border-outline-soft bg-surface px-5">
        <View className="flex-row items-center gap-4">
          <Ionicons name="arrow-back" size={28} color="#334033" />
          <View className="h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Ionicons name="hardware-chip" size={24} color="#91d78a" />
          </View>
          <Text className="text-3xl font-bold text-primary">AI Assistant</Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={28} color="#334033" />
      </View>
      <View className="gap-6 pt-6">
        <View className="flex-row gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Ionicons name="hardware-chip" size={20} color="#91d78a" />
          </View>
          <View className="flex-1 rounded-xl border border-outline-soft bg-surface p-5">
            <Text className="text-2xl leading-9 text-ink">నమస్కారం! (Namaskaram!) I am your PaddyConnect AI Assistant. How can I help you with your mill operations today?</Text>
          </View>
        </View>
        <View className="gap-3">
          {[
            ["calendar-outline", "CMR Deadline?"],
            ["trending-up-outline", "This Month Profit?"],
            ["wallet-outline", "Who owes me most?"]
          ].map(([icon, label]) => (
            <View className="self-start flex-row items-center gap-3 rounded-full border border-outline-soft bg-surface px-5 py-3" key={label}>
              <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color="#00450d" />
              <Text className="text-2xl text-primary">{label}</Text>
            </View>
          ))}
        </View>
        <View className="self-end rounded-xl bg-primary p-5">
          <Text className="text-xl font-bold text-[#91d78a]">బాయిల్డ్ రైస్ కి GST ఉంటుందా?</Text>
          <Text className="mt-1 text-base text-[#91d78a]">Is there GST on boiled rice?</Text>
        </View>
        <View className="flex-row gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Ionicons name="hardware-chip" size={20} color="#91d78a" />
          </View>
          <View className="flex-1 rounded-xl border border-outline-soft bg-surface p-5">
            <Text className="text-2xl leading-9 text-ink">అవును, బ్రాండెడ్ బాయిల్డ్ రైస్ పై <Text className="font-bold text-danger">5% GST</Text> వర్తిస్తుంది. అన్-బ్రాండెడ్ బాయిల్డ్ రైస్ కి GST మినహాయింపు ఉంది.</Text>
          </View>
        </View>
        <View className="mt-8 flex-row items-center gap-3 rounded-full border border-outline-soft bg-white px-5 py-3">
          <Ionicons name="attach" size={28} color="#334033" />
          <TextInput className="min-h-12 flex-1 text-xl" placeholder="Ask about Khata, CMR, or Inventory" placeholderTextColor="#8b9388" />
          <View className="h-16 w-16 items-center justify-center rounded-full bg-primary">
            <Ionicons name="mic" size={28} color="#ffffff" />
          </View>
        </View>
      </View>
    </Screen>
  );
}
