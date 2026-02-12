'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateDepartment(
  id: number,
  data: {
    name: string;
    description: string;
    image: string;
    link: string | null;
  }
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Departments')
    .update(data)
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/join-us');
  return { success: true };
}

export async function addDepartment(data: {
  name: string;
  description: string;
  image: string;
  link: string | null;
  order: number;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Departments')
    .insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/join-us');
  return { success: true };
}

export async function deleteDepartment(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('Departments')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/join-us');
  return { success: true };
}
