import { createClient } from "@/lib/supabase/server";
import HistoryClient from "./HistoryClient";

export interface HistoryItem {
  id: number;
  year: number;
  name: string;
  nickname: string | null;
  image: string;
  highlight: string | null;
  specs: string[];
  order: number;
}

async function getHistory(): Promise<HistoryItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("History")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching history:", error);
    return [];
  }

  return data || [];
}

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function History() {
  const [historyData, user] = await Promise.all([getHistory(), getUser()]);
  const isAdmin = !!user;
  return <HistoryClient historyData={historyData} isAdmin={isAdmin} />;
}
