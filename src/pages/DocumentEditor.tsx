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
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId]);

  const loadDocument = async (id: string) => {
    console.log('DocumentEditor: Loading document with id:', id);
    setLoading(true);
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
        console.log('DocumentEditor: Applying document data');
        applyDocumentData(result.document);
      } else {
        console.log('DocumentEditor: No document found, showing error and navigating to dashboard');
        toast({
          title: "Document not found",
          description: result.error || "The requested document could not be loaded. It may have been deleted or you may not have permission to access it.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('DocumentEditor: Failed to load document:', error);
      toast({
        title: "Failed to load document",
        description: "Please check your connection and try again. If the problem persists, the document may not exist.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const applyDocumentData = (document: DocumentMetadata) => {
    setDocument(document);
    setDocumentTitle(document.title);
    setSelectedTemplate(document.template_id as TemplateName);
    setLastSaved(new Date(document.updated_at).toLocaleString());
    
    if (editorRef.current && document.content) {
      try {
        const content = typeof document.content === 'string' 
          ? JSON.parse(document.content) 
          : document.content;
        editorRef.current.commands.setContent(content);
        handleRefreshPreview();
      } catch (error) {
        console.error('Failed to parse document content:', error);
        toast({
          title: "Content loading warning",
          description: "Document content may not display correctly.",
          variant: "destructive",
        });
      }
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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <EditorHeader
        title={documentTitle}
        onTitleChange={setDocumentTitle}
        templateName={selectedTemplate}
        lastSaved={lastSaved}
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
              value={selectedTemplate}
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
              initialTitle={documentTitle}
              initialContent={document?.content}
              templateId={selectedTemplate}
              onDocumentSaved={handleDocumentSaved}
            />
          </div>
          
          {/* Preview */}
          <div>
            <PreviewRenderer 
              htmlContent={previewContent} 
              templateName={selectedTemplate} 
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