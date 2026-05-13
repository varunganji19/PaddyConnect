import { supabase } from "@/lib/supabase";

export async function sendOtp(phone: string) {
  return supabase.auth.signInWithOtp({ phone });
}

export async function verifyOtp(phone: string, token: string) {
  return supabase.auth.verifyOtp({ phone, token, type: "sms" });
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function logout() {
  return supabase.auth.signOut();
}
