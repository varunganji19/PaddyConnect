import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center bg-[#f6f7f8] p-6">
        <Text className="text-2xl font-bold text-ink">Page Not Found</Text>
        <Text className="mt-2 text-base text-muted">This screen doesn't exist.</Text>
        <Link href="/" className="mt-6">
          <Text className="text-base font-bold text-primary">Go to Home</Text>
        </Link>
      </View>
    </>
  );
}
