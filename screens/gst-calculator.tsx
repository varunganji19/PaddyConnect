import { FormField } from "@/components/FormField";
import { Screen } from "@/components/Screen";
import { SegmentedControl } from "@/components/SegmentedControl";
import { calculateGst, formatRupees } from "@/lib/gst";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function GstCalculatorScreen() {
  const [amount, setAmount] = useState("100000");
  const [riceType, setRiceType] = useState<"loose" | "branded">("branded");
  const [saleType, setSaleType] = useState<"intra" | "inter">("intra");
  const result = useMemo(() => calculateGst({ amount: Number(amount) || 0, isBranded: riceType === "branded", isInterState: saleType === "inter" }), [amount, riceType, saleType]);

  return (
    <Screen>
      <View className="gap-5">
        <View>
          <Text className="text-3xl font-bold text-ink">GST Calculator</Text>
          <Text className="mt-1 text-base text-muted">HSN Code: 1006 (Rice)</Text>
        </View>
        <FormField label="Enter Amount (₹)" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
        <View className="gap-2">
          <Text className="text-sm font-semibold text-muted">Rice Type</Text>
          <SegmentedControl options={[{ label: "Loose 0%", value: "loose" }, { label: "Branded 5%", value: "branded" }]} value={riceType} onChange={setRiceType} />
        </View>
        <View className="gap-2">
          <Text className="text-sm font-semibold text-muted">Sale Type</Text>
          <SegmentedControl options={[{ label: "CGST+SGST", value: "intra" }, { label: "IGST", value: "inter" }]} value={saleType} onChange={setSaleType} />
        </View>
        <View className="gap-2 rounded-xl bg-white border border-outline-soft p-4">
          <Text className="text-muted">Base Amount  {formatRupees(Number(amount) || 0)}</Text>
          <Text className="text-muted">GST Rate     {result.gstRate}%</Text>
          <Text className="text-muted">CGST         {formatRupees(result.cgst)}</Text>
          <Text className="text-muted">SGST         {formatRupees(result.sgst)}</Text>
          <Text className="text-muted">IGST         {formatRupees(result.igst)}</Text>
          <Text className="mt-2 text-xl font-bold text-ink">Total        {formatRupees(result.total)}</Text>
        </View>
        <View className="rounded-xl bg-surface-low p-4">
          <Text className="font-semibold text-ink">Ask AI about GST</Text>
          <Text className="mt-2 text-sm leading-5 text-muted">బ్రాండెడ్ రైస్ కి 5% GST. లూస్ రైస్ కి GST లేదు.</Text>
        </View>
      </View>
    </Screen>
  );
}
