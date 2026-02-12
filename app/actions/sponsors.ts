'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSponsor(
  id: number,
  data: {
    name: string;
    logo: string;
    url: string | null;
    tier: string;
  }
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Sponsors')
    .update(data)
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/sponsors');
  return { success: true };
}

export async function addSponsor(data: {
  name: string;
  logo: string;
  url: string | null;
  tier: string;
  order: number;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Sponsors')
    .insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/sponsors');
  return { success: true };
}

export async function deleteSponsor(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Sponsors')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/sponsors');
  return { success: true };
}
