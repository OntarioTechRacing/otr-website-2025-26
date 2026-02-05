import { createClient } from "@/lib/supabase/server";
import TeamPage from "./TeamClient";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("public.TeamMembers")
    .select("*")
    .order("Name", { ascending: true })
    .order("Department", { ascending: true });

  try {
    const { data, error } = await supabase.from("TeamMembers").select("*");
    if (error) {
      console.error("Supabase query error object:", error);
      return <div>Failed: {error.message}</div>;
    }
    return <TeamPage members={data ?? []} />;
  } catch (e) {
    console.error("Supabase fetch threw:", e);
    return <div>Failed: fetch threw</div>;
  }
}