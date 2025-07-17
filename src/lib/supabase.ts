// Remove old supabase.ts - using integrated client
export { supabase } from '@/integrations/supabase/client';

// MVP: Stub authentication with default contributor user
// This will be replaced with real auth in Phase 4
export const getCurrentUserId = () => {
  return '00000000-0000-0000-0000-000000000000';
};