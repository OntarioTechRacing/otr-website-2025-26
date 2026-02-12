-- Storage policies for the "Sponsors" bucket:
-- - SELECT: so authenticated users can list objects (needed for the "Choose" image picker)
-- - INSERT: so authenticated users can upload new logos
--
-- Ensure the bucket "Sponsors" exists in Dashboard → Storage and is set to Public if you want logo URLs to work without signed URLs.

CREATE POLICY "Authenticated can list and read Sponsors bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'Sponsors');

CREATE POLICY "Authenticated can upload to Sponsors bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'Sponsors');

-- Optional: allow authenticated users to update/delete their uploads (e.g. replace a logo)
CREATE POLICY "Authenticated can update Sponsors bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'Sponsors');

CREATE POLICY "Authenticated can delete from Sponsors bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'Sponsors');
