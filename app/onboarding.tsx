import { FormField } from "@/components/FormField";
import { Screen } from "@/components/Screen";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type ProfileForm = {
  millName: string;
  ownerName: string;
  village: string;
  district: string;
  gstin: string;
};

export default function OnboardingScreen() {
  const { control } = useForm<ProfileForm>({
    defaultValues: { millName: "Sai Lakshmi Rice Mill", ownerName: "Ravi Kumar", village: "Nalgonda", district: "Nalgonda", gstin: "" }
  });
  const softInputClass = "min-h-16 rounded-full border border-outline-soft bg-white px-6 text-lg text-ink";
  const labelClass = "text-sm font-bold text-ink";

  return (
    <Screen>
      <View className="gap-6">
        <View>
          <Text className="text-3xl font-bold text-black">Setup Your Mill</Text>
          <Text className="mt-1 text-base text-black">మీ మిల్ వివరాలు ఒకసారి సేవ్ చేయండి</Text>
        </View>
        <Controller control={control} name="millName" render={({ field }) => <FormField inputClassName={softInputClass} labelClassName={labelClass} label="Mill Name" value={field.value} onChangeText={field.onChange} />} />
        <Controller control={control} name="ownerName" render={({ field }) => <FormField inputClassName={softInputClass} labelClassName={labelClass} label="Owner Name" value={field.value} onChangeText={field.onChange} />} />
        <Controller control={control} name="village" render={({ field }) => <FormField inputClassName={softInputClass} labelClassName={labelClass} label="Village" value={field.value} onChangeText={field.onChange} />} />
        <Controller control={control} name="district" render={({ field }) => <FormField inputClassName={softInputClass} labelClassName={labelClass} label="District" value={field.value} onChangeText={field.onChange} />} />
        <Controller control={control} name="gstin" render={({ field }) => <FormField inputClassName={softInputClass} labelClassName={labelClass} label="GSTIN (optional)" value={field.value} onChangeText={field.onChange} />} />
        <Pressable className="mt-2 min-h-14 items-center justify-center rounded-full bg-primary" onPress={() => router.replace("/(tabs)")}>
          <Text className="font-bold text-white">Save & Continue</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
