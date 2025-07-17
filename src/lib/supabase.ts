import { createClient } from '@supabase/supabase-js';

// For MVP, we'll use environment variables that will be set by Lovable's Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// MVP: Stub authentication with default contributor user
// This will be replaced with real auth in Phase 4
export const getCurrentUserId = () => {
  return 'stub-contributor-user-id';
};