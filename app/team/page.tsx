import { createClient } from "@/lib/supabase/server";
import TeamPage from "./TeamClient";

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function Page() {
  const supabase = await createClient();

  try {
    const [membersResult, departmentsResult, userResult] = await Promise.all([
      supabase.from("TeamMembers").select("*"),
      supabase
        .from("Departments")
        .select("id, name, image, description")
        .order("order", { ascending: true }),
      supabase.auth.getUser(),
    ]);

    const { data: members, error: membersError } = membersResult;
    const { data: departments, error: departmentsError } = departmentsResult;
    const { data: { user } } = userResult;

    if (membersError) {
      console.error("Supabase TeamMembers error:", membersError);
      return <div>Failed: {membersError.message}</div>;
    }
    if (departmentsError) {
      console.error("Supabase Departments error:", departmentsError);
      return <div>Failed: {departmentsError.message}</div>;
    }

    const isAdmin = !!user;
    return (
      <TeamPage
        members={members ?? []}
        isAdmin={isAdmin}
        departments={departments ?? []}
      />
    );
  } catch (e) {
    console.error("Supabase fetch threw:", e);
    return <div>Failed: fetch threw</div>;
  }
}