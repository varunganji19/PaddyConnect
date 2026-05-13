import { ActionButton } from "@/components/ActionButton";
import { Screen } from "@/components/Screen";
import { SummaryLine } from "@/components/SummaryLine";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function InvoiceScreen() {
  return (
    <Screen back>
      <View className="gap-5">
        <View className="flex-row items-center gap-3">
          <Ionicons name="arrow-back" size={24} color="#00450d" />
          <Text className="text-2xl font-bold text-primary">Create Invoice</Text>
        </View>
        <View className="flex-row justify-end gap-3">
          <ActionButton label="Download PDF" icon="download-outline" />
          <ActionButton label="Print" icon="print-outline" />
        </View>
        <View className="gap-4 rounded border border-outline-soft bg-white p-6">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-2xl font-bold text-primary">Telangana{"\n"}Rice Mill</Text>
              <Text className="mt-3 text-base text-muted">Industrial Area,{"\n"}Warangal, 506002{"\n"}GSTIN:{"\n"}36AAAAA0000A1Z5</Text>
            </View>
            <View className="items-end">
              <Text className="text-2xl font-bold text-ink">TAX INVOICE</Text>
              <Text className="mt-3 text-base font-bold text-ink">Inv No: INV-{"\n"}2023-{"\n"}089</Text>
              <Text className="mt-3 text-base font-bold text-ink">Date:{"\n"}24 Oct{"\n"}2023</Text>
            </View>
          </View>
          <View className="h-px bg-outline-soft" />
          <Text className="font-bold text-muted">Billed To:</Text>
          <Text className="text-lg font-bold text-ink">Sri Balaji Traders</Text>
          <Text className="text-base text-muted">Main Market Road, Hyderabad, 500001{"\n"}GSTIN: 36BBBBB1111B2Y6</Text>
          <Text className="font-bold text-muted">Transport Details:</Text>
          <Text className="text-base text-muted">Vehicle: TS 03 AA 1234{"\n"}E-Way Bill: 123456789012</Text>
          <View className="h-px bg-outline-soft" />
          <View className="flex-row bg-surface-low p-3">
            <Text className="w-8 font-bold">#</Text>
            <Text className="flex-1 font-bold">Item{"\n"}Description</Text>
            <Text className="w-20 font-bold">HSN/SAC</Text>
            <Text className="w-20 text-right font-bold">Qty (Qtl)</Text>
          </View>
          {[["1", "Sona Masoori Rice (Premium)", "250.00"], ["2", "Broken Rice (Nookalu)", "50.00"]].map(([i, item, qty]) => (
            <View className="flex-row border-b border-outline-soft py-4" key={i}>
              <Text className="w-8">{i}</Text>
              <Text className="flex-1 font-bold">{item}</Text>
              <Text className="w-20">1006</Text>
              <Text className="w-20 text-right">{qty}</Text>
            </View>
          ))}
          <SummaryLine label="Taxable Amount" value="₹ 12,30,000.00" />
          <SummaryLine label="CGST (2.5%)" value="₹ 30,750.00" />
          <SummaryLine label="SGST (2.5%)" value="₹ 30,750.00" />
          <SummaryLine label="Transport Charges" value="₹ 5,000.00" />
          <View className="h-px bg-outline-soft" />
          <SummaryLine label="Grand Total" value="₹ 12,96,500.00" total />
          <Text className="text-right italic text-muted">Rupees Twelve Lakh Ninety Six Thousand Five Hundred Only</Text>
        </View>
        <View className="min-h-14 items-center justify-center rounded bg-surface-highest">
          <Text className="text-lg font-bold text-primary">✎ Edit Details</Text>
        </View>
        <View className="min-h-14 items-center justify-center rounded bg-primary">
          <Text className="text-lg font-bold text-white">▷ Share via WhatsApp</Text>
        </View>
      </View>
    </Screen>
  );
}


