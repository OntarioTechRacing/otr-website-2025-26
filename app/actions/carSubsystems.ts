'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateCarSubsystem(
  id: number,
  data: {
    title: string;
    description: string;
    specs: string[];
  }
) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('CarSubsystems')
    .update(data)
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/our-car');
  return { success: true };
}

export async function addCarSubsystem(data: {
  title: string;
  description: string;
  specs: string[];
  order: number;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('CarSubsystems')
    .insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/our-car');
  return { success: true };
}

export async function deleteCarSubsystem(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('CarSubsystems')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/our-car');
  return { success: true };
}
