import { FormField } from "@/components/FormField";
import { FormSection } from "@/components/FormSection";
import { PillToggle } from "@/components/PillToggle";
import { Screen } from "@/components/Screen";
import { SummaryLine } from "@/components/SummaryLine";
import { SwitchRow } from "@/components/SwitchRow";
import { calculateGst, formatRupees } from "@/lib/gst";
import { sales } from "@/lib/database";
import { Ionicons } from "@expo/vector-icons";
import { useState, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import SalesReportScreen from "@/screens/sales-report";

type SaleForm = {
  buyerName: string;
  gstin: string;
  riceGrade: "Fine" | "Coarse";
  processType: "Raw" | "Boiled";
  bags: string;
  weightPerBag: string;
  pricePerKg: string;
  branded: boolean;
  interState: boolean;
};

export default function SalesHub() {
  const [view, setView] = useState<"report" | "form" | "list">("report");

  if (view === "report") {
    return (
      <View className="flex-1 bg-[#f6f7f8] pt-12 pb-8 px-4">
        <View className="mb-4 flex-row justify-between items-center">
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => { if (router.canGoBack()) router.back(); }}>
              <Ionicons name="arrow-back" size={24} color="#00450d" />
            </Pressable>
            <Text className="text-3xl font-bold text-ink">Sales Hub</Text>
          </View>
        </View>
        <View className="mb-6 flex-row gap-3">
          <Pressable onPress={() => setView("form")} className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-primary py-3">
            <Ionicons name="add" size={18} color="#ffffff" />
            <Text className="font-bold text-white">New Sale</Text>
          </Pressable>
          <Pressable onPress={() => setView("list")} className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-primary bg-white py-3">
            <Ionicons name="list" size={18} color="#00450d" />
            <Text className="font-bold text-primary">Previous Sales</Text>
          </Pressable>
        </View>
        <View className="flex-1 rounded-3xl overflow-hidden">
          <SalesReportScreen embedded />
        </View>
      </View>
    );
  }

  if (view === "list") {
    return (
      <Screen header compactHeader back onBack={() => setView("report")}>
        <View className="gap-5">
          <Text className="text-2xl font-bold text-ink">Previous Sales</Text>
          <View className="gap-3">
            {sales.map((sale) => (
              <Pressable 
                key={sale.buyer} 
                className="rounded-3xl bg-white p-5 border border-outline-soft"
                onPress={() => router.push("/invoice?id=" + encodeURIComponent(sale.buyer))}
              >
                <View className="flex-row items-start justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-ink">{sale.buyer}</Text>
                    <Text className="mt-1 text-sm text-muted">{sale.meta}</Text>
                    <Text className="mt-2 text-sm text-muted">{sale.rate}</Text>
                  </View>
                  <View className="items-end">
                    <Ionicons name={sale.paid ? "checkmark-circle" : "time"} size={20} color={sale.paid ? "#388E3C" : "#D32F2F"} />
                    <Text className="mt-2 font-bold text-ink">{sale.total}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </Screen>
    );
  }

  return <SalesForm onBack={() => setView("report")} />;
}

function SalesForm({ onBack }: { onBack: () => void }) {
  const { control, watch, setValue } = useForm<SaleForm>({
    defaultValues: { buyerName: "", gstin: "", riceGrade: "Fine", processType: "Raw", bags: "0", weightPerBag: "25", pricePerKg: "0", branded: true, interState: false }
  });
  const values = watch();
  const totalWeight = (Number(values.bags) || 0) * (Number(values.weightPerBag) || 0);
  const base = totalWeight * (Number(values.pricePerKg) || 0);
  const gst = useMemo(() => calculateGst({ amount: base, isBranded: values.branded, isInterState: values.interState }), [base, values.branded, values.interState]);

  return (
    <Screen header compactHeader back onBack={onBack}>
      <View className="gap-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-ink">New Sale Entry</Text>
        </View>
        <FormSection title="Buyer Details" icon="person-outline">
          <Controller control={control} name="buyerName" render={({ field }) => <FormField label="BUYER NAME" value={field.value} onChangeText={field.onChange} placeholder="Enter buyer name or select..." />} />
          <Controller control={control} name="gstin" render={({ field }) => <FormField label="GSTIN (OPTIONAL)" value={field.value} onChangeText={field.onChange} placeholder="Ex: 36AAAAA0000A1Z5" />} />
        </FormSection>
        <FormSection title="Rice Details" icon="file-tray">
          <PillToggle label="RICE TYPE (GRADE)" values={["Fine", "Coarse"]} value={values.riceGrade} onChange={(v) => setValue("riceGrade", v as "Fine" | "Coarse")} />
          <PillToggle label="PROCESS TYPE" values={["Raw", "Boiled"]} value={values.processType} onChange={(v) => setValue("processType", v as "Raw" | "Boiled")} />
          <Controller control={control} name="bags" render={({ field }) => <FormField label="NUMBER OF BAGS" keyboardType="number-pad" value={field.value} onChangeText={field.onChange} />} />
          <Controller control={control} name="weightPerBag" render={({ field }) => <FormField label="WEIGHT/BAG (KG)" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />} />
          <Controller control={control} name="pricePerKg" render={({ field }) => <FormField label="PRICE PER KG (₹)" keyboardType="decimal-pad" value={field.value} onChangeText={field.onChange} />} />
        </FormSection>
        <FormSection title="Taxation & GST" icon="business-outline">
          <SwitchRow title="Branded / Packaged" help="Applies 5% GST" on={values.branded} toggle={() => setValue("branded", !values.branded)} />
          <SwitchRow title="Inter-state Sale" help="Applies IGST instead of CGST/SGST" on={values.interState} toggle={() => setValue("interState", !values.interState)} />
        </FormSection>
        <FormSection title="Sale Summary" icon="receipt-outline">
          <SummaryLine label="Total Weight" value={`${totalWeight.toFixed(2)} kg`} />
          <SummaryLine label="Base Amount" value={formatRupees(base)} />
          <SummaryLine label={`GST (${gst.gstRate}%)`} value={formatRupees(gst.gstAmount)} />
          <View className="h-px bg-outline-soft" />
          <SummaryLine label="Grand Total" value={formatRupees(gst.total)} total />
        </FormSection>
        <View className="min-h-14 items-center justify-center rounded-full border border-primary bg-white">
          <Text className="font-bold text-primary">Save as Draft</Text>
        </View>
        <View className="min-h-14 flex-row items-center justify-center gap-2 rounded-full bg-primary">
          <Ionicons name="checkmark-circle-outline" size={22} color="#ffffff" />
          <Text className="font-bold text-white">Save & Generate Invoice</Text>
        </View>
      </View>
    </Screen>
  );
}


