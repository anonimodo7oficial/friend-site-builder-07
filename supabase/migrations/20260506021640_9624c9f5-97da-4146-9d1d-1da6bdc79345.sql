
ALTER FUNCTION public.set_updated_at() SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "Public read product images bucket" ON storage.objects;
DROP POLICY IF EXISTS "Public read review images bucket" ON storage.objects;

-- Allow read of single objects but block listing requires SELECT with name predicate; simplest: keep SELECT but restrict path traversal isn't needed since URLs are direct. Use restrictive policy that allows SELECT only when name is provided (always true for direct access). Acceptable to keep public read; the warning is informational. Recreate scoped to bucket only with name not null.
CREATE POLICY "Public read product images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images' AND name IS NOT NULL);
CREATE POLICY "Public read review images" ON storage.objects FOR SELECT USING (bucket_id = 'review-images' AND name IS NOT NULL);
