import { createClient } from "@/lib/supabase/server";
import JoinUsClient from "./JoinUsClient";

export interface Department {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string | null;
  order: number;
}

async function getDepartments(): Promise<Department[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Departments")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching departments:", error);
    return [];
  }

  return data || [];
}

async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export default async function JoinUs() {
  const [departments, user] = await Promise.all([getDepartments(), getUser()]);
  const isAdmin = !!user;
  return <JoinUsClient departments={departments} isAdmin={isAdmin} />;
}
