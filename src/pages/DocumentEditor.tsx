import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@/components/Editor';
import { PreviewRenderer } from '@/components/PreviewRenderer';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ConflictResolutionDialog } from '@/components/ConflictResolutionDialog';
import { EditorHeader } from '@/components/EditorHeader';
import { DocumentMetadata } from '@/types/document';
import { DocumentService } from '@/lib/DocumentService';
import { applyTemplateToContent, TemplateName } from '@/components/TemplateEngine';
import { useToast } from '@/hooks/use-toast';

const DocumentEditor = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<DocumentMetadata | null>(null);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('Modern Report');
  const [previewContent, setPreviewContent] = useState('<p>Click "Refresh Preview" to see your content with the selected template</p>');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle');
  const [lastSaved, setLastSaved] = useState<string>('');
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [conflictVersions, setConflictVersions] = useState<{
    local: any;
    supabase: DocumentMetadata;
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId]);

  const loadDocument = async (id: string) => {
    console.log('DocumentEditor: Loading document with id:', id);
    setLoading(true);
    setLoadError(null);
    try {
      const result = await DocumentService.loadDocument(id);
      console.log('DocumentEditor: DocumentService.loadDocument result:', result);
      
      if (result.conflict && result.document && result.localVersion) {
        console.log('DocumentEditor: Conflict detected, showing dialog');
        setConflictVersions({
          local: result.localVersion,
          supabase: result.document,
        });
        setShowConflictDialog(true);
      } else if (result.document) {
        console.log('DocumentEditor: Successfully loaded document, applying data');
        applyDocumentData(result.document);
      } else {
        console.log('DocumentEditor: No document found, setting error state');
        const errorMessage = result.error || "This document could not be loaded. It may not exist or you may not have access.";
        setLoadError(errorMessage);
        console.log('DocumentEditor: Load error set to:', errorMessage);
      }
    } catch (error) {
      console.error('DocumentEditor: Failed to load document:', error);
      const errorMessage = "Failed to load document. Please check your connection and try again.";
      setLoadError(errorMessage);
      console.log('DocumentEditor: Load error set to:', errorMessage);
    } finally {
      setLoading(false);
      console.log('DocumentEditor: Loading finished, loading state set to false');
    }
  };

  const applyDocumentData = (document: DocumentMetadata) => {
    console.log('DocumentEditor: Applying document data:', document);
    setDocument(document);
    setDocumentTitle(document.title || 'Untitled Document');
    setSelectedTemplate((document.template_id as TemplateName) || 'Modern Report');
    
    // Safe handling of updated_at with fallback
    if (document.updated_at) {
      try {
        setLastSaved(new Date(document.updated_at).toLocaleString());
      } catch (error) {
        console.error('Invalid updated_at format:', document.updated_at);
        setLastSaved('—');
      }
    } else {
      console.log('No updated_at found, using fallback');
      setLastSaved('—');
    }
    
    if (editorRef.current && document.content) {
      try {
        const content = typeof document.content === 'string' 
          ? JSON.parse(document.content) 
          : document.content;
        editorRef.current.commands.setContent(content);
        handleRefreshPreview();
      } catch (error) {
        console.error('Failed to parse document content:', error);
        // Set empty content if parsing fails
        const emptyContent = { type: "doc", content: [] };
        editorRef.current.commands.setContent(emptyContent);
        toast({
          title: "Content loading warning",
          description: "Document content may not display correctly. Starting with empty document.",
          variant: "destructive",
        });
      }
    } else if (editorRef.current) {
      // Set empty content if no content exists
      const emptyContent = { type: "doc", content: [] };
      editorRef.current.commands.setContent(emptyContent);
      handleRefreshPreview();
    }
  };

  const handleConflictResolution = (useLocal: boolean) => {
    if (!conflictVersions) return;
    
    if (useLocal) {
      const localAsDocument: DocumentMetadata = {
        id: conflictVersions.supabase.id,
        title: conflictVersions.local.title || conflictVersions.supabase.title,
        template_id: conflictVersions.local.template_id || conflictVersions.supabase.template_id,
        content: conflictVersions.local.content,
        owner_id: conflictVersions.supabase.owner_id,
        created_at: conflictVersions.supabase.created_at,
        updated_at: conflictVersions.local.last_saved || conflictVersions.supabase.updated_at,
        is_deleted: false,
      };
      applyDocumentData(localAsDocument);
    } else {
      applyDocumentData(conflictVersions.supabase);
    }
    
    setConflictVersions(null);
    setShowConflictDialog(false);
  };

  const handleRefreshPreview = (content?: any) => {
    let editorContent = content;
    if (!editorContent && editorRef.current) {
      editorContent = editorRef.current.getJSON();
    }
    
    if (editorContent) {
      const styledHtml = applyTemplateToContent(editorContent, selectedTemplate);
      setPreviewContent(styledHtml);
    }
  };

  const handleDocumentSaved = (document: DocumentMetadata) => {
    setDocument(document);
    setSaveStatus('saved');
    setLastSaved(new Date().toLocaleString());
    
    // If this was a new document (no documentId), update the URL
    if (!documentId) {
      navigate(`/editor/${document.id}`, { replace: true });
    }
  };

  const handleSave = async () => {
    if (!editorRef.current) return;
    
    setSaveStatus('saving');
    try {
      const content = editorRef.current.getJSON();
      const result = await DocumentService.saveDocument(
        document?.id || null,
        documentTitle,
        selectedTemplate,
        JSON.stringify(content)
      );

      if (result.success && result.document) {
        handleDocumentSaved(result.document);
        toast({
          title: "Document saved",
          description: "Your changes have been saved successfully.",
        });
      } else {
        setSaveStatus('error');
        toast({
          title: "Save failed",
          description: result.error || "Failed to save document",
          variant: "destructive",
        });
      }
    } catch (error) {
      setSaveStatus('error');
      toast({
        title: "Save failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    console.log('DocumentEditor: Rendering loading state');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    console.log('DocumentEditor: Rendering error state:', loadError);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.349 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Document Not Found</h2>
          <p className="text-muted-foreground mb-4">{loadError}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!document) {
    console.log('DocumentEditor: No document loaded and no error, rendering fallback');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-foreground mb-2">Document could not be loaded</p>
          <p className="text-muted-foreground">The document may not exist or you may not have permission to access it.</p>
        </div>
      </div>
    );
  }

  console.log('DocumentEditor: Rendering editor with document:', document);
  console.log('DocumentEditor: Document title:', documentTitle);
  console.log('DocumentEditor: Document template:', selectedTemplate);
  console.log('DocumentEditor: Document content type:', typeof document?.content);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <EditorHeader
        title={documentTitle || 'Untitled Document'}
        onTitleChange={setDocumentTitle}
        templateName={selectedTemplate || 'Modern Report'}
        lastSaved={lastSaved || '—'}
        saveStatus={saveStatus}
        onSave={handleSave}
        onRefreshPreview={handleRefreshPreview}
      />

      {/* Editor Layout */}
      <div className="flex-1 flex">
        {/* Template Selector Sidebar */}
        <div className="w-80 border-r border-border bg-card p-4">
          <div className="mb-4">
            <h3 className="font-medium text-foreground mb-2">Template</h3>
            <TemplateSelector 
              value={selectedTemplate || 'Modern Report'}
              onValueChange={setSelectedTemplate}
            />
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="flex-1 grid grid-cols-2">
          {/* Editor */}
          <div className="border-r border-border">
            <Editor 
              className="h-full" 
              ref={editorRef}
              documentId={documentId}
              initialTitle={documentTitle || 'Untitled Document'}
              initialContent={document?.content || { type: "doc", content: [] }}
              templateId={selectedTemplate || 'Modern Report'}
              onDocumentSaved={handleDocumentSaved}
            />
          </div>
          
          {/* Preview */}
          <div>
            <PreviewRenderer 
              htmlContent={previewContent} 
              templateName={selectedTemplate || 'Modern Report'} 
            />
          </div>
        </div>
      </div>
      
      <ConflictResolutionDialog
        isOpen={showConflictDialog}
        onClose={() => setShowConflictDialog(false)}
        onResolve={handleConflictResolution}
        localDocument={conflictVersions?.local}
        supabaseDocument={conflictVersions?.supabase}
      />
    </div>
  );
};

export default DocumentEditor;