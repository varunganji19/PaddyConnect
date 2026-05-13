import { FormField } from "@/components/FormField";
import { Screen } from "@/components/Screen";
import { SummaryLine } from "@/components/SummaryLine";
import { formatRupees } from "@/lib/gst";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View, ScrollView } from "react-native";

import { purchases } from "@/lib/database";
import { PurchaseCard } from "@/components/PurchaseCard";

type PurchaseForm = {
  farmerName: string;
  variety: "Fine" | "Coarse";
  bags: string;
  weightPerBag: string;
  pricePerQuintal: string;
  hamali: string;
  lorry: string;
  mandi: string;
};

export default function PurchaseHub() {
  const [view, setView] = useState<"list" | "form">("list");

  if (view === "list") {
    return (
      <View className="flex-1 bg-[#f6f7f8] pt-12 pb-8 px-4">
        <View className="mb-4 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => { if (router.canGoBack()) router.back(); }}>
              <Ionicons name="arrow-back" size={24} color="#00450d" />
            </Pressable>
            <Text className="text-3xl font-bold text-ink">Purchase Hub</Text>
          </View>
        </View>
        <View className="mb-6">
          <Pressable onPress={() => setView("form")} className="flex-row items-center justify-center gap-2 rounded-full bg-primary py-3">
            <Ionicons name="add" size={18} color="#ffffff" />
            <Text className="font-bold text-white">New Purchase</Text>
          </Pressable>
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-ink mb-4">Recent Purchases</Text>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="gap-3 pb-20">
              {purchases.map((purchase) => (
                 <PurchaseCard key={purchase.farmer + purchase.time} {...purchase} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  return <PurchaseForm onBack={() => setView("list")} />;
}

function PurchaseForm({ onBack }: { onBack: () => void }) {
  const { control, watch, setValue } = useForm<PurchaseForm>({
    defaultValues: { farmerName: "", variety: "Fine", bags: "0", weightPerBag: "40", pricePerQuintal: "0", hamali: "0", lorry: "0", mandi: "0" }
  });
  const pillInput = "min-h-16 rounded-full border border-outline-soft bg-white px-6 text-lg text-ink";
  const purchaseLabel = "text-sm font-bold text-ink";
  const values = watch();
  const totals = useMemo(() => {
    const bags = Number(values.bags) || 0;
    const weight = Number(values.weightPerBag) || 0;
    const totalWeightQuintals = (bags * weight) / 100;
    const baseAmount = totalWeightQuintals * (Number(values.pricePerQuintal) || 0);
    const totalCharges = (Number(values.hamali) || 0) + (Number(values.lorry) || 0) + (Number(values.mandi) || 0);
    return { totalWeightQuintals, baseAmount, totalCharges, totalCost: baseAmount + totalCharges };
  }, [values]);

  return (
    <Screen header back onBack={onBack}>
      <View className="gap-5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-ink">New Purchase Entry</Text>
            <Text className="mt-1 text-base text-muted">Record details of incoming paddy.</Text>
          </View>
          <Pressable className="min-h-16 flex-row items-center gap-2 rounded-2xl bg-secondary px-5">
            <Ionicons name="sparkles" size={20} color="#ffffff" />
            <Text className="text-lg font-bold text-white">AI{"\n"}Fill</Text>
          </Pressable>
        </View>

        <View className="gap-5 rounded-3xl border border-outline-soft bg-white p-5">
          <Text className="text-2xl font-bold text-ink">Primary Details</Text>
          <View className="h-px bg-outline-soft" />
          <Controller
            control={control}
            name="farmerName"
            render={({ field }) => (
              <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Farmer Name / రైతు పేరు *" value={field.value} onChangeText={field.onChange} placeholder="Enter farmer name" />
            )}
          />
          <View className="gap-3">
            <Text className="text-sm font-bold text-ink">Variety *</Text>
            <View className="flex-row gap-5">
              {(["Fine", "Coarse"] as const).map((variety) => (
                <Pressable className="flex-row items-center gap-2" key={variety} onPress={() => setValue("variety", variety)}>
                  <Ionicons name={values.variety === variety ? "radio-button-on" : "radio-button-off"} size={22} color="#00450d" />
                  <Text className="text-lg text-ink">{variety} {variety === "Fine" ? "(సన్న రకం)" : "(దొడ్డు రకం)"}</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Controller
                control={control}
                name="bags"
                render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Bags *" keyboardType="number-pad" value={field.value} onChangeText={field.onChange} />}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="weightPerBag"
                render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Weight per Bag (kg) *" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="pricePerQuintal"
            render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Price per Quintal (₹) *" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />}
          />
        </View>

        <View className="gap-5 rounded-3xl border border-outline-soft bg-white p-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-ink">Charges Details</Text>
            <Ionicons name="chevron-up" size={22} color="#191d17" />
          </View>
          <View className="h-px bg-outline-soft" />
          <Controller
            control={control}
            name="hamali"
            render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Hamali (₹)" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />}
          />
          <Controller
            control={control}
            name="lorry"
            render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Lorry (₹)" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />}
          />
          <Controller
            control={control}
            name="mandi"
            render={({ field }) => <FormField inputClassName={pillInput} labelClassName={purchaseLabel} label="Mandi (%)" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />}
          />
        </View>

        <View className="gap-4 rounded-3xl border border-outline-soft bg-surface-low p-5">
          <View className="flex-row items-center gap-3">
            <Ionicons name="lock-closed-outline" size={22} color="#91d78a" />
            <Text className="text-2xl font-bold text-ink">Auto Calculated Summary</Text>
          </View>
          <View className="h-px bg-outline-soft" />
          <SummaryLine label="Total Weight (Quintals)" value={totals.totalWeightQuintals.toFixed(2)} />
          <SummaryLine label="Base Amount (₹)" value={totals.baseAmount.toFixed(2)} />
          <SummaryLine label="Total Charges (-)" value={totals.totalCharges.toFixed(2)} danger />
          <View className="h-px bg-outline-soft" />
          <SummaryLine label="Grand Total (₹)" value={formatRupees(totals.totalCost)} total totalValueColor="text-success" />
        </View>

        <Pressable className="min-h-14 items-center justify-center rounded-full bg-primary">
          <Text className="text-xl font-bold text-white">Save Purchase</Text>
        </Pressable>
      </View>
    </Screen>
  );
}


