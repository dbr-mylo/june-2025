import { supabase, getCurrentUserId } from './supabase';
import { DocumentMetadata, LocalDocument } from '../types/document';
import { TemplateName } from '../components/TemplateEngine';

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
        const { data, error } = await supabase
          .from('documents')
          .update(documentData)
          .eq('id', id)
          .eq('owner_id', userId)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Create new document
        const { data, error } = await supabase
          .from('documents')
          .insert({
            ...documentData,
            created_at: now,
            is_deleted: false,
          })
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }

      // Clear any pending saves for this document
      this.clearPendingSave(result.id);
      
      return { success: true, document: result };
    } catch (error) {
      console.error('Failed to save to Supabase:', error);
      
      // Store in localStorage as fallback
      const localDoc: LocalDocument = {
        id: id || `local_${Date.now()}`,
        title,
        template_id: templateId,
        content,
        last_saved: now,
        needs_sync: true,
      };
      
      this.storePendingSave(localDoc);
      
      return { 
        success: false, 
        error: 'Save failed. Document stored locally and will sync when connection is restored.' 
      };
    }
  }

  // Load document with timestamp validation
  static async loadDocument(id: string): Promise<{ 
    document?: DocumentMetadata; 
    localVersion?: LocalDocument;
    conflict?: boolean;
    error?: string;
  }> {
    try {
      // Try to load from Supabase first
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .eq('owner_id', getCurrentUserId())
        .eq('is_deleted', false)
        .single();

      if (error) throw error;

      // Check if there's a local version that might be newer
      const localVersion = this.getLocalDocument(id);
      
      if (localVersion && localVersion.needs_sync) {
        const supabaseTime = new Date(data.updated_at).getTime();
        const localTime = new Date(localVersion.last_saved).getTime();
        
        if (localTime > supabaseTime) {
          return {
            document: data,
            localVersion,
            conflict: true,
          };
        }
      }

      return { document: data };
    } catch (error) {
      console.error('Failed to load document from Supabase:', error);
      
      // Fallback to localStorage
      const localDoc = this.getLocalDocument(id);
      if (localDoc) {
        // Convert local document to DocumentMetadata format
        const doc: DocumentMetadata = {
          id: localDoc.id,
          title: localDoc.title,
          template_id: localDoc.template_id,
          content: localDoc.content,
          owner_id: getCurrentUserId(),
          created_at: localDoc.last_saved,
          updated_at: localDoc.last_saved,
          is_deleted: false,
        };
        return { document: doc };
      }
      
      return { error: 'Document not found' };
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