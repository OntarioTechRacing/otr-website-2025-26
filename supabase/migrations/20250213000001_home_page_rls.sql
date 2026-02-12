-- RLS policies for HomePage: allow public read, authenticated write.
-- Without these, authenticated users get permission denied when updating.

ALTER TABLE "HomePage" ENABLE ROW LEVEL SECURITY;

-- Anyone can read (so the home page can show the embed links)
CREATE POLICY "HomePage is public read"
ON "HomePage" FOR SELECT
TO public
USING (true);

-- Only authenticated users can update (edit social links)
CREATE POLICY "Authenticated can update HomePage"
ON "HomePage" FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated to insert (e.g. first-time seed)
CREATE POLICY "Authenticated can insert HomePage"
ON "HomePage" FOR INSERT
TO authenticated
WITH CHECK (true);
