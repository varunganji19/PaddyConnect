import { Screen } from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { createRef, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputKeyPressEventData, View } from "react-native";

type LoginForm = { phone: string; otp: string };

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatIndianPhone10(value: string) {
  const digits = normalizeIndianPhoneDigits(value);
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function buildPhoneWithCountryCode(value: string) {
  return `+91${normalizeIndianPhoneDigits(value)}`;
}

function normalizeIndianPhoneDigits(value: string) {
  const digits = digitsOnly(value);
  const withoutCountryCode = digits.length > 10 && digits.startsWith("91") ? digits.slice(2) : digits;
  return withoutCountryCode.slice(0, 10);
}

export default function LoginScreen() {
  const { control, setValue, watch } = useForm<LoginForm>({ defaultValues: { phone: "", otp: "" } });
  const phone = watch("phone");
  const submittedPhone = useMemo(() => buildPhoneWithCountryCode(phone), [phone]);

  return (
    <Screen>
      <View className="min-h-[86vh] justify-center gap-8 overflow-hidden">
        <View className="overflow-hidden rounded-3xl border border-outline-soft bg-white">
          <View className="items-center gap-4 bg-surface p-8">
            <Ionicons name="leaf" size={58} color="#00450d" />
            <Text className="text-center text-4xl font-bold text-primary">PaddyConnect</Text>
            <Text className="text-center text-xl text-muted">Secure Access • సురక్షిత ప్రవేశం</Text>
          </View>
          <View className="gap-5 p-6">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChangeText={(value) => {
                    const nextValue = normalizeIndianPhoneDigits(value);
                    field.onChange(nextValue);
                    setValue("phone", nextValue);
                  }}
                />
              )}
            />
            <Pressable className="min-h-16 flex-row items-center justify-center gap-3 rounded-2xl bg-primary">
              <Text className="text-2xl font-bold text-white">Send OTP</Text>
              <Ionicons name="send" size={24} color="#ffffff" />
            </Pressable>
            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-outline-soft" />
              <Text className="text-lg text-muted">Enter OTP to verify</Text>
              <View className="h-px flex-1 bg-outline-soft" />
            </View>
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <OtpInputRow
                  value={field.value}
                  onChangeText={(value) => {
                    const nextValue = digitsOnly(value).slice(0, 6);
                    field.onChange(nextValue);
                    setValue("otp", nextValue);
                  }}
                />
              )}
            />
            <View className="flex-row justify-between">
              <Text className="text-lg text-ink">Time remaining: <Text className="font-bold text-danger">01:45</Text></Text>
              <Text className="text-lg font-bold text-primary">Resend OTP</Text>
            </View>
            <Pressable className="min-h-16 flex-row items-center justify-center gap-3 rounded-2xl bg-success" onPress={() => router.replace("/onboarding")}>
              <Text className="text-2xl font-bold text-white">Verify & Enter</Text>
              <Ionicons name="log-in-outline" size={26} color="#ffffff" />
            </Pressable>
          </View>
          <View className="items-center bg-surface p-5">
            <Text className="text-lg text-muted">⌾ End-to-End Encrypted System</Text>
          </View>
        </View>
        <Text className="text-center text-lg text-muted">Need help logging in? <Text className="font-bold text-primary">Contact Support</Text></Text>
        <Text className="hidden">{submittedPhone}</Text>
      </View>
    </Screen>
  );
}

function PhoneInput({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-semibold text-black">Mobile Number / మొబైల్ నంబర్</Text>
      <View className="min-h-16 flex-row items-center rounded-full border border-outline-soft bg-card px-5">
        <Text className="pr-3 text-xl font-bold text-ink">+91</Text>
        <View className="mr-3 h-8 w-px bg-outline-soft" />
        <TextInput
          className="flex-1 outline-none text-xl font-semibold text-ink"
          keyboardType="phone-pad"
          maxLength={11}
          onChangeText={onChangeText}
          placeholder="XXXXX-XXXXX"
          placeholderTextColor="#717a6d"
          value={formatIndianPhone10(value)}
        />
      </View>
    </View>
  );
}

function OtpInputRow({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  const refs = useRef(Array.from({ length: 6 }, () => createRef<TextInput>())).current;
  const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

  function setDigit(index: number, next: string) {
    const nextDigits = [...digits];
    const cleanValue = digitsOnly(next);

    if (cleanValue.length > 1) {
      const pasted = cleanValue.slice(0, 6).split("");
      onChangeText(pasted.join(""));
      refs[Math.min(pasted.length, 6) - 1]?.current?.focus();
      return;
    }

    nextDigits[index] = cleanValue.slice(0, 1);
    onChangeText(nextDigits.join(""));

    if (cleanValue && index < 5) {
      refs[index + 1]?.current?.focus();
    }
  }

  function handleKeyPress(index: number, event: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (event.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      refs[index - 1]?.current?.focus();
    }
  }

  return (
    <View className="gap-3">
      <Text className="text-sm font-semibold text-ink">One Time Password / ఓటీపీ</Text>
      <View className="flex-row flex-wrap gap-2">
        {digits.map((digit, index) => (
          <TextInput
            className="h-11 w-11 outline-none rounded-2xl border border-outline-soft bg-white text-center text-xl font-bold text-ink"
            key={index}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(next) => setDigit(index, next)}
            onKeyPress={(event) => handleKeyPress(index, event)}
            ref={refs[index]}
            selectTextOnFocus
            value={digit}
          />
        ))}
      </View>
    </View>
  );
}
