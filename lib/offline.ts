import AsyncStorage from "@react-native-async-storage/async-storage";

const QUEUE_KEY = "rice_miller_offline_queue";

export async function enqueueOfflineAction(action: unknown) {
  const current = await AsyncStorage.getItem(QUEUE_KEY);
  const queue = current ? JSON.parse(current) : [];
  queue.push({ action, queuedAt: new Date().toISOString() });
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export async function readOfflineQueue() {
  const current = await AsyncStorage.getItem(QUEUE_KEY);
  return current ? JSON.parse(current) : [];
}
