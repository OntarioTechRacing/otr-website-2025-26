'use server';

import { createClient } from '@/lib/supabase/server';

// Bucket "Sponsors" in Supabase Dashboard → Storage.
// Add a policy so authenticated users can upload (e.g. "Allow authenticated INSERT").
const SPONSOR_LOGO_BUCKET = 'Sponsors';

export async function listSponsorLogos(): Promise<{ path: string; publicUrl: string }[] | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: files, error } = await supabase.storage
    .from(SPONSOR_LOGO_BUCKET)
    .list('', { sortBy: { column: 'name', order: 'asc' } });

  if (error) {
    return { error: error.message };
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${SPONSOR_LOGO_BUCKET}`;
  const items: { path: string; publicUrl: string }[] = [];

  for (const file of files ?? []) {
    if (file.name && (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.webp') || file.name.endsWith('.svg'))) {
      items.push({
        path: file.name,
        publicUrl: `${baseUrl}/${encodeURIComponent(file.name)}`,
      });
    }
    // If it's a folder, we could recurse; for now keep flat structure
  }

  return items;
}

export async function uploadSponsorLogo(formData: FormData): Promise<{ publicUrl: string } | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const file = formData.get('file') as File | null;
  if (!file || !file.size) return { error: 'No file provided' };

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const path = safeName;

  const { error } = await supabase.storage
    .from(SPONSOR_LOGO_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) return { error: error.message };

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${SPONSOR_LOGO_BUCKET}`;
  const publicUrl = `${baseUrl}/${encodeURIComponent(path)}`;
  return { publicUrl };
}
