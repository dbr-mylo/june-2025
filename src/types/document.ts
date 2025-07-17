export interface DocumentMetadata {
  id: string;
  title: string;
  template_id: string;
  content: any; // Tiptap JSON
  owner_id: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface LocalDocument {
  id: string;
  title: string;
  template_id: string;
  content: any;
  last_saved: string;
  needs_sync: boolean;
}