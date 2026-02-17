'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateMember(
  id: number,
  data: {
    Name: string;
    Department: string;
    Headshot: string | null;
    LinkedIn: string | undefined;
    Role: string | null;
  }
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  // IMPORTANT: don't send undefined to PostgREST
  const payload: any = {
    Name: data.Name,
    Department: data.Department,
    Headshot: data.Headshot,
    Role: data.Role,
    ...(data.LinkedIn !== undefined ? { LinkedIn: data.LinkedIn } : {}),
  };

  const { data: updated, error } = await supabase
    .from("TeamMembers")
    .update(payload)
    .eq("id", id)
    .select()          // <-- forces returned rows
    .maybeSingle();    // <-- gives null if 0 rows updated

  if (error) return { error: error.message };

  if (!updated) {
    // This is the key signal:
    // either id didn't match OR RLS blocked the update.
    return { error: "No rows updated (wrong id/column, or RLS blocked it)." };
  }

  revalidatePath("/team");
  return { success: true, updated };
}


export async function addMember(data: {
    Name: string;
    Department: string;
    Headshot: string | null;
    LinkedIn: string | undefined;
    Role: string | null
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('TeamMembers')
    .insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/team');
  return { success: true };
}

export async function deleteMember(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('TeamMembers')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/team');
  return { success: true };
}
