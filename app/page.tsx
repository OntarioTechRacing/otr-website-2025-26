import { createClient } from "@/lib/supabase/server";
import HomePage from "./HomePage";

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("public.HomePage")
    .select("*");

  try {
    const { data, error } = await supabase.from("HomePage").select("*");
    if (error) {
      console.error("Supabase query error object:", error);
      return <div>Failed: {error.message}</div>;
    }
    return <HomePage embedLinks={data ?? []} />;
  } catch (e) {
    console.error("Supabase fetch threw:", e);
    return <div>Failed: fetch threw (check terminal)</div>;
  }

  // Pass whatever your UI needs. Keep it simple for now.
  return <HomePage embedLinks={data ?? []}/>;
}