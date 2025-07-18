import { supabase, getCurrentUserId } from './supabase';
import { DocumentMetadata, LocalDocument } from '../types/document';

export type TemplateName = 'letter' | 'fax' | 'memo' | 'invoice' | 'Modern Report' | 'Corporate Letterhead' | 'Academic Paper';

const LOCAL_STORAGE_KEY = 'mylo_documents';
const LOCAL_PENDING_KEY = 'mylo_pending_saves';

export class DocumentService {
  // List documents with pagination support
  static async listDocuments(limit = 25, offset = 0): Promise<DocumentMetadata[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('owner_id', getCurrentUserId())
        .eq('is_deleted', false)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to load documents from Supabase:', error);
      // Fallback to localStorage
      return this.getLocalDocuments();
    }
  }

  // Save document with localStorage fallback and timestamp validation
  static async saveDocument(
    id: string | null,
    title: string,
    templateId: TemplateName,
    content: any
  ): Promise<{ success: boolean; document?: DocumentMetadata; error?: string }> {
    const now = new Date().toISOString();
    const userId = getCurrentUserId();

    const documentData = {
      title,
      template_id: templateId,
      content,
      owner_id: userId,
      updated_at: now,
    };

    try {
      let result;
      if (id) {
        // Update existing document
        console.log('Updating document in Supabase:', id);
        const { data, error } = await supabase
          .from('documents')
          .update(documentData)
          .eq('id', id)
          .eq('owner_id', userId)
          .select()
          .single();
        
        if (error) {
          console.error('Supabase update error:', error);
          throw error;
        }
        result = data;
      } else {
        // Create new document - FORCE Supabase insert
        console.log('Creating new document in Supabase with data:', documentData);
        const { data, error } = await supabase
          .from('documents')
          .insert({
            ...documentData,
            created_at: now,
            is_deleted: false,
          })
          .select()
          .single();
        
        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }
        result = data;
      }

      console.log('Supabase operation successful:', result);
      // Clear any pending saves for this document
      this.clearPendingSave(result.id);
      
      return { success: true, document: result };
    } catch (error) {
      console.error('CRITICAL: Supabase operation failed, falling back to localStorage:', error);
      
      // Only fall back to localStorage for network errors, not RLS or other DB errors
      if (error instanceof Error && (
        error.message.includes('network') || 
        error.message.includes('Failed to fetch') ||
        error.message.includes('fetch')
      )) {
        console.log('Network error detected, using localStorage fallback');
        
        // Store in localStorage as fallback
        const localDoc: LocalDocument = {
          id: id || `local_${Date.now()}`,
          title,
          template_id: templateId,
          content,
          last_saved: now,
          needs_sync: true,
        };
        
        // Store both as pending save and in main local storage
        this.storePendingSave(localDoc);
        this.storeLocalDocument(localDoc);
        
        // Convert to DocumentMetadata format for return
        const document: DocumentMetadata = {
          id: localDoc.id,
          title: localDoc.title,
          template_id: localDoc.template_id,
          content: localDoc.content,
          owner_id: getCurrentUserId(),
          created_at: now,
          updated_at: now,
          is_deleted: false,
        };
        
        return { 
          success: true, 
          document,
          error: 'Document stored locally and will sync when connection is restored.' 
        };
      } else {
        // For database errors (RLS, validation, etc), don't fall back - return the error
        return { 
          success: false, 
          error: `Database error: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    }
  }

  // Load document with timestamp validation
  static async loadDocument(id: string): Promise<{ 
    document?: DocumentMetadata; 
    localVersion?: LocalDocument;
    conflict?: boolean;
    error?: string;
  }> {
    console.log('Loading document from Supabase:', id);
    
    try {
      // Try to load from Supabase first
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .eq('owner_id', getCurrentUserId())
        .eq('is_deleted', false)
        .single();

      console.log('Supabase loadDocument response:', { data, error });

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }

      if (!data) {
        console.log('Document not found in Supabase');
        return { error: 'Document not found' };
      }

      console.log('Document loaded from Supabase:', data);

      // Validate and provide defaults for required fields
      const document: DocumentMetadata = {
        id: data.id,
        title: data.title || 'Untitled Document',
        template_id: data.template_id || 'Modern Report',
        content: data.content || { type: "doc", content: [] },
        owner_id: data.owner_id,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
        is_deleted: data.is_deleted || false,
      };

      // Check if there's a local version that might be newer
      const localVersion = this.getLocalDocument(id);
      
      if (localVersion && localVersion.needs_sync) {
        const supabaseTime = new Date(document.updated_at).getTime();
        const localTime = new Date(localVersion.last_saved).getTime();
        
        if (localTime > supabaseTime) {
          console.log('Local version is newer, showing conflict dialog');
          return {
            document,
            localVersion,
            conflict: true,
          };
        }
      }

      return { document };
    } catch (error) {
      console.error('Failed to load document from Supabase:', error);
      
      // Fallback to localStorage
      const localDoc = this.getLocalDocument(id);
      if (localDoc) {
        console.log('Falling back to localStorage document');
        // Convert local document to DocumentMetadata format
        const doc: DocumentMetadata = {
          id: localDoc.id,
          title: localDoc.title || 'Untitled Document',
          template_id: localDoc.template_id || 'Modern Report',
          content: localDoc.content || { type: "doc", content: [] },
          owner_id: getCurrentUserId(),
          created_at: localDoc.last_saved,
          updated_at: localDoc.last_saved,
          is_deleted: false,
        };
        return { document: doc };
      }
      
      console.log('Document not found in localStorage either');
      return { error: `Document not found: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  }

  // Soft delete document
  static async deleteDocument(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ is_deleted: true, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('owner_id', getCurrentUserId());

      if (error) throw error;
      
      // Also remove from localStorage if it exists
      this.removeLocalDocument(id);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to delete document:', error);
      return { success: false, error: 'Failed to delete document' };
    }
  }

  // Local storage helper methods
  private static getLocalDocuments(): DocumentMetadata[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return [];
      
      const localDocs: LocalDocument[] = JSON.parse(stored);
      return localDocs.map(doc => ({
        id: doc.id,
        title: doc.title,
        template_id: doc.template_id,
        content: doc.content,
        owner_id: getCurrentUserId(),
        created_at: doc.last_saved,
        updated_at: doc.last_saved,
        is_deleted: false,
      }));
    } catch {
      return [];
    }
  }

  private static getLocalDocument(id: string): LocalDocument | null {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return null;
      
      const localDocs: LocalDocument[] = JSON.parse(stored);
      return localDocs.find(doc => doc.id === id) || null;
    } catch {
      return null;
    }
  }

  private static storePendingSave(document: LocalDocument): void {
    try {
      const stored = localStorage.getItem(LOCAL_PENDING_KEY);
      const pending: LocalDocument[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = pending.findIndex(doc => doc.id === document.id);
      if (existingIndex >= 0) {
        pending[existingIndex] = document;
      } else {
        pending.push(document);
      }
      
      localStorage.setItem(LOCAL_PENDING_KEY, JSON.stringify(pending));
    } catch (error) {
      console.error('Failed to store pending save:', error);
    }
  }

  private static clearPendingSave(id: string): void {
    try {
      const stored = localStorage.getItem(LOCAL_PENDING_KEY);
      if (!stored) return;
      
      const pending: LocalDocument[] = JSON.parse(stored);
      const filtered = pending.filter(doc => doc.id !== id);
      
      localStorage.setItem(LOCAL_PENDING_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to clear pending save:', error);
    }
  }

  private static removeLocalDocument(id: string): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return;
      
      const localDocs: LocalDocument[] = JSON.parse(stored);
      const filtered = localDocs.filter(doc => doc.id !== id);
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      
      // Also clear from pending saves
      this.clearPendingSave(id);
    } catch (error) {
      console.error('Failed to remove local document:', error);
    }
  }

  // Store document in main localStorage
  private static storeLocalDocument(document: LocalDocument): void {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localDocs: LocalDocument[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = localDocs.findIndex(doc => doc.id === document.id);
      if (existingIndex >= 0) {
        localDocs[existingIndex] = document;
      } else {
        localDocs.push(document);
      }
      
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localDocs));
    } catch (error) {
      console.error('Failed to store local document:', error);
    }
  }

  // Get pending saves that need to be synced
  static getPendingSaves(): LocalDocument[] {
    try {
      const stored = localStorage.getItem(LOCAL_PENDING_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}