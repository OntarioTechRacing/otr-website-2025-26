'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateHistoryItem(
  id: number,
  data: {
    year: number;
    name: string;
    nickname: string | null;
    image: string;
    highlight: string | null;
    specs: string[];
  }
) {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('History')
    .update({
      year: data.year,
      name: data.name,
      nickname: data.nickname,
      image: data.image,
      highlight: data.highlight,
      specs: data.specs,
    })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/history');
  return { success: true };
}

export async function addHistoryItem(data: {
  year: number;
  name: string;
  nickname: string | null;
  image: string;
  highlight: string | null;
  specs: string[];
  order: number;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('History')
    .insert(data);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/history');
  return { success: true };
}

export async function deleteHistoryItem(id: number) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('History')
    .delete()
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/history');
  return { success: true };
}
