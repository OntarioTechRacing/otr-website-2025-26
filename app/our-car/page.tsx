import { createClient } from "@/lib/supabase/server";
import OurCarClient from "./OurCarClient";

export interface CarSubsystem {
  id: number;
  title: string;
  description: string;
  specs: string[];
  order: number;
}

async function getCarSubsystems(): Promise<CarSubsystem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("CarSubsystems")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching car subsystems:", error);
    return [];
  }

  return data || [];
}

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function OurCar() {
  const [subsystems, user] = await Promise.all([getCarSubsystems(), getUser()]);
  const isAdmin = !!user;
  return <OurCarClient subsystems={subsystems} isAdmin={isAdmin} />;
}
