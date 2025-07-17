-- Temporarily disable RLS policies for MVP testing
-- We'll re-enable proper auth-based RLS in Phase 4

DROP POLICY IF EXISTS "Users can view own documents" ON documents;
DROP POLICY IF EXISTS "Users can insert own documents" ON documents;  
DROP POLICY IF EXISTS "Users can update own documents" ON documents;
DROP POLICY IF EXISTS "Users can delete own documents" ON documents;

-- Create temporary policies that work with stub user ID
CREATE POLICY "Temp MVP - Allow stub user view" ON documents
  FOR SELECT USING (owner_id = '00000000-0000-0000-0000-000000000000'::uuid);

CREATE POLICY "Temp MVP - Allow stub user insert" ON documents
  FOR INSERT WITH CHECK (owner_id = '00000000-0000-0000-0000-000000000000'::uuid);

CREATE POLICY "Temp MVP - Allow stub user update" ON documents
  FOR UPDATE USING (owner_id = '00000000-0000-0000-0000-000000000000'::uuid) 
  WITH CHECK (owner_id = '00000000-0000-0000-0000-000000000000'::uuid);

-- Allow soft delete (is_deleted = true) for stub user
CREATE POLICY "Temp MVP - Allow stub user delete" ON documents
  FOR UPDATE USING (owner_id = '00000000-0000-0000-0000-000000000000'::uuid)
  WITH CHECK (owner_id = '00000000-0000-0000-0000-000000000000'::uuid);