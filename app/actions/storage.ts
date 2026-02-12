'use server';

import { createClient } from '@/lib/supabase/server';

// Buckets: create "Sponsors" and "History" in Supabase Dashboard → Storage (public).
// Add policies so authenticated users can SELECT and INSERT (see migration 20250212000000).

export async function listImagesInBucket(
  bucket: string
): Promise<{ path: string; publicUrl: string }[] | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: files, error } = await supabase.storage
    .from(bucket)
    .list('', { sortBy: { column: 'name', order: 'asc' } });

  if (error) return { error: error.message };

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}`;
  const items: { path: string; publicUrl: string }[] = [];

  for (const file of files ?? []) {
    if (file.name && (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.webp') || file.name.endsWith('.svg'))) {
      items.push({
        path: file.name,
        publicUrl: `${baseUrl}/${encodeURIComponent(file.name)}`,
      });
    }
  }

  return items;
}

export async function uploadToBucket(
  bucket: string,
  formData: FormData
): Promise<{ publicUrl: string } | { error: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const file = formData.get('file') as File | null;
  if (!file || !file.size) return { error: 'No file provided' };

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(safeName, file, { upsert: true, contentType: file.type });

  if (error) return { error: error.message };

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}`;
  const publicUrl = `${baseUrl}/${encodeURIComponent(safeName)}`;
  return { publicUrl };
}

export async function listSponsorLogos(): Promise<{ path: string; publicUrl: string }[] | { error: string }> {
  return listImagesInBucket('Sponsors');
}

export async function uploadSponsorLogo(formData: FormData): Promise<{ publicUrl: string } | { error: string }> {
  return uploadToBucket('Sponsors', formData);
}

export async function listHistoryImages(): Promise<{ path: string; publicUrl: string }[] | { error: string }> {
  return listImagesInBucket('History');
}

export async function uploadHistoryImage(formData: FormData): Promise<{ publicUrl: string } | { error: string }> {
  return uploadToBucket('History', formData);
}
