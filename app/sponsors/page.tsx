import { createClient } from "@/lib/supabase/server";
import SponsorsClient from "./SponsorsClient";

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  url: string | null;
  tier: string;
  order: number;
}

async function getSponsors(): Promise<Sponsor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Sponsors")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }

  return data || [];
}

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function Sponsors() {
  const [sponsors, user] = await Promise.all([getSponsors(), getUser()]);
  const isAdmin = !!user;
  return <SponsorsClient sponsors={sponsors} isAdmin={isAdmin} />;
}
