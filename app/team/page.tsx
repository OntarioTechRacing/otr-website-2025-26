import { createClient } from "@/lib/supabase/server";
import TeamPage from "./TeamClient";


async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

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
    const user = await getUser();
    const isAdmin = !!user;
    return <TeamPage members={data ?? []} isAdmin={isAdmin} />;
  } catch (e) {
    console.error("Supabase fetch threw:", e);
    return <div>Failed: fetch threw</div>;
  }
}