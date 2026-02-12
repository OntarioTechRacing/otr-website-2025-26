import { createClient } from "@/lib/supabase/server";
import HomePage from "./HomePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createClient();

  try {
    const [result, userResult] = await Promise.all([
      supabase.from("HomePage").select("*"),
      supabase.auth.getUser(),
    ]);
    const { data, error } = result;
    const { data: { user } } = userResult;

    if (error) {
      console.error("Supabase query error object:", error);
      return <div>Failed: {error.message}</div>;
    }
    return <HomePage embedLinks={data ?? []} isAdmin={!!user} />;
  } catch (e) {
    console.error("Supabase fetch threw:", e);
    return <div>Failed: fetch threw</div>;
  }
}