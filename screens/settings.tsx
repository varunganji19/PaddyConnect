import { FormField } from "@/components/FormField";
import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isEditing, setIsEditing] = useState(false);
  const [millName, setMillName] = useState("Telangana Rice Mill");
  const [owner, setOwner] = useState("Rao Venkata");
  const [location, setLocation] = useState("Warangal District");
  const [gstin, setGstin] = useState("36AAAAA0000A1Z5");
  const [cmrAlerts, setCmrAlerts] = useState(true);
  const [khataAlerts, setKhataAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(false);
  
  const profileInput = `min-h-12 rounded-xl px-4 text-base text-ink ${!isEditing ? "bg-[#f5f6f5]" : "bg-white border border-[#e0e0e0]"}`;
  const profileLabel = "text-xs font-bold uppercase tracking-widest text-muted";

  return (
    <Screen header>
      <View className="gap-6">
        <Text className="text-3xl font-bold text-ink">Mill Settings</Text>
        <View className="rounded-xl border border-outline-soft bg-white">
          <View className="flex-row items-center justify-between p-5 pb-3">
            <View className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={22} color="#008080" />
              <Text className="text-xl font-bold text-ink">Mill Profile</Text>
            </View>
            {isEditing ? (
              <View className="flex-row gap-4">
                <Pressable onPress={() => setIsEditing(false)} className="flex-row items-center gap-1">
                  <Text className="font-semibold text-danger">Discard</Text>
                </Pressable>
                <Pressable onPress={() => setIsEditing(false)} className="flex-row items-center gap-1">
                  <Text className="font-semibold text-[#008080]">Save</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={() => setIsEditing(true)} className="flex-row items-center gap-1">
                <Ionicons name="create-outline" size={18} color="#008080" />
                <Text className="text-base font-semibold text-[#008080]">Edit</Text>
              </Pressable>
            )}
          </View>
          <View className="p-5 pt-2 gap-5">
            <View className="flex-row gap-5">
              <View className="flex-1">
                <FormField editable={isEditing} inputClassName={profileInput} labelClassName={profileLabel} label="Mill Name" value={millName} onChangeText={setMillName} />
              </View>
              <View className="flex-1">
                <FormField editable={isEditing} inputClassName={profileInput} labelClassName={profileLabel} label="Owner" value={owner} onChangeText={setOwner} />
              </View>
            </View>
            <View className="flex-row gap-5">
              <View className="flex-1">
                <FormField editable={isEditing} inputClassName={profileInput} labelClassName={profileLabel} label="Location" value={location} onChangeText={setLocation} />
              </View>
              <View className="flex-1">
                <FormField editable={isEditing} inputClassName={profileInput} labelClassName={profileLabel} label="GSTIN" value={gstin} onChangeText={setGstin} />
              </View>
            </View>
          </View>
        </View>
        <View className="gap-4 rounded-3xl border border-outline-soft bg-white p-5">
          <Text className="border-b border-outline-soft pb-3 text-2xl font-bold text-ink">Preferences</Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl text-ink">Language</Text>
              <Text className="text-base text-muted">Select interface language</Text>
            </View>
            <View className="rounded-full border border-outline px-4 py-3">
              <Text className="text-lg text-ink">Telugu (తెలుగు)</Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between border-t border-outline-soft pt-4">
            <View>
              <Text className="text-xl text-ink">Theme</Text>
              <Text className="text-base text-muted">App appearance</Text>
            </View>
            <View className="flex-row rounded-full bg-surface-low p-1">
              <Pressable onPress={() => setColorScheme("light")}>
                <Text className={`rounded-full px-4 py-2 text-lg ${colorScheme !== "dark" ? "bg-white text-ink shadow-sm" : "text-muted"}`}>☼ Light</Text>
              </Pressable>
              <Pressable onPress={() => setColorScheme("dark")}>
                <Text className={`rounded-full px-4 py-2 text-lg ${colorScheme === "dark" ? "bg-white text-ink shadow-sm" : "text-muted"}`}>☾ Dark</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="gap-5 rounded-3xl border border-outline-soft bg-white p-5">
          <Text className="border-b border-outline-soft pb-3 text-2xl font-bold text-ink">Notifications</Text>
          <Toggle label="CMR Deadlines" help="Alerts for government compliance" value={cmrAlerts} onChange={() => setCmrAlerts((value) => !value)} />
          <Toggle label="Khata Updates" help="Ledger entry notifications" value={khataAlerts} onChange={() => setKhataAlerts((value) => !value)} />
          <Toggle label="Low Stock Alerts" help="Inventory threshold warnings" value={stockAlerts} onChange={() => setStockAlerts((value) => !value)} />
        </View>
        <View className="gap-4 rounded-3xl border border-outline-soft bg-white p-5">
          <Text className="border-b border-outline-soft pb-3 text-2xl font-bold text-ink">Subscription</Text>
          <View className="flex-row items-center justify-between rounded-3xl border border-outline-soft bg-surface-muted p-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="ribbon-outline" size={28} color="#FFC107" />
              <View>
                <Text className="text-xl font-bold text-ink">Premium Member</Text>
                <Text className="text-success">Active until Dec 2024</Text>
              </View>
            </View>
            <Text className="font-bold text-primary">Manage</Text>
          </View>
        </View>
        <View className="min-h-14 items-center justify-center rounded-full border border-danger bg-white">
          <Text className="text-xl font-bold text-danger">↪ Logout</Text>
        </View>
      </View>
    </Screen>
  );
}

function Toggle({ label, help, value, onChange }: { label: string; help: string; value: boolean; onChange: () => void }) {
  return (
    <View className="flex-row items-center justify-between border-b border-outline-soft pb-4">
      <View>
        <Text className="text-xl text-ink">{label}</Text>
        <Text className="text-base text-muted">{help}</Text>
      </View>
      <Pressable 
        onPress={onChange}
        className={`h-8 w-14 justify-center rounded-full px-1 ${value ? "bg-primary" : "bg-outline-soft"}`}
      >
        <View className={`h-6 w-6 rounded-full bg-white shadow-sm ${value ? "self-end" : "self-start"}`} />
      </Pressable>
    </View>
  );
}
