-- Storage policies for the "History" bucket (car images).
-- Create the bucket "History" in Supabase Dashboard → Storage and set it to Public.

CREATE POLICY "Authenticated can list and read History bucket"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'History');

CREATE POLICY "Authenticated can upload to History bucket"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'History');

CREATE POLICY "Authenticated can update History bucket"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'History');

CREATE POLICY "Authenticated can delete from History bucket"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'History');
