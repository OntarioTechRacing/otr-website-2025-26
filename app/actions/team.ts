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
    Role: string | null
  }
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('TeamMembers')
    .update(data)
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/team');
  return { success: true };
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
