'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateHomePageSocialLinks(
  id: number,
  data: { InstagramPost?: string | null; LinkedInPost?: string | null }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: updated, error } = await supabase
    .from('HomePage')
    .update(data)
    .eq('id', id)
    .select('id');

  if (error) return { error: error.message };
  if (!updated?.length) {
    return {
      error:
        'No row updated. Ensure the HomePage table has an "id" column and columns "InstagramPost" and "LinkedInPost". Run the migration supabase/migrations/20250213000000_home_page_table.sql if needed.',
    };
  }
  revalidatePath('/');
  return { success: true };
}
