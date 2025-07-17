import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@/components/Editor';
import { PreviewRenderer } from '@/components/PreviewRenderer';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ConflictResolutionDialog } from '@/components/ConflictResolutionDialog';
import { Button } from '@/components/ui/button';
import { applyTemplateToContent, TemplateName } from '@/components/TemplateEngine';
import { DocumentService } from '@/lib/DocumentService';
import { DocumentMetadata, LocalDocument } from '@/types/document';
import { RefreshCw, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentEditor = () => {
  const { documentId } = useParams<{ documentId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const editorRef = useRef<any>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('Modern Report');
  const [previewContent, setPreviewContent] = useState('<p>Click "Refresh Preview" to see your content with the selected template</p>');
  const [loading, setLoading] = useState(!!documentId);
  const [documentData, setDocumentData] = useState<DocumentMetadata | null>(null);
  
  // Conflict resolution state
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [conflictData, setConflictData] = useState<{
    supabaseDocument: DocumentMetadata;
    localDocument: LocalDocument;
  } | null>(null);

  // Load document if documentId is provided
  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId]);

  const loadDocument = async (id: string) => {
    setLoading(true);
    try {
      const result = await DocumentService.loadDocument(id);
      
      if (result.conflict && result.document && result.localVersion) {
        // Show conflict resolution dialog
        setConflictData({
          supabaseDocument: result.document,
          localDocument: result.localVersion,
        });
        setShowConflictDialog(true);
      } else if (result.document) {
        // No conflict, load normally
        applyDocumentData(result.document);
      } else {
        toast({
          title: "Document not found",
          description: result.error || "The requested document could not be loaded.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to load document:', error);
      toast({
        title: "Failed to load document",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const applyDocumentData = (document: DocumentMetadata) => {
    setDocumentData(document);
    setSelectedTemplate(document.template_id as TemplateName);
    
    // The Editor component will handle setting the content via initialContent prop
    // Trigger an initial preview refresh after content is loaded
    setTimeout(() => {
      handleRefreshPreview(document.content);
    }, 100);
  };

  const handleConflictResolution = (useLocal: boolean) => {
    if (!conflictData) return;
    
    if (useLocal) {
      // Use local version - convert to DocumentMetadata format
      const localAsDocument: DocumentMetadata = {
        id: conflictData.localDocument.id,
        title: conflictData.localDocument.title,
        template_id: conflictData.localDocument.template_id,
        content: conflictData.localDocument.content,
        owner_id: conflictData.supabaseDocument.owner_id,
        created_at: conflictData.supabaseDocument.created_at,
        updated_at: conflictData.localDocument.last_saved,
        is_deleted: false,
      };
      applyDocumentData(localAsDocument);
    } else {
      // Use Supabase version
      applyDocumentData(conflictData.supabaseDocument);
    }
    
    setConflictData(null);
  };

  const handleRefreshPreview = (content?: any) => {
    console.log('Refresh Preview clicked');
    console.log('Editor ref:', editorRef.current);
    
    let editorContent = content;
    if (!editorContent && editorRef.current) {
      editorContent = editorRef.current.getJSON();
      console.log('Editor JSON:', editorContent);
    }
    
    if (editorContent) {
      console.log('Selected template:', selectedTemplate);
      const styledHtml = applyTemplateToContent(editorContent, selectedTemplate);
      console.log('Styled HTML:', styledHtml);
      setPreviewContent(styledHtml);
    } else {
      console.log('No editor content available');
    }
  };

  const handleDocumentSaved = (document: DocumentMetadata) => {
    setDocumentData(document);
    // Update URL if this was a new document
    if (!documentId) {
      navigate(`/editor/${document.id}`, { replace: true });
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Document Editor</h1>
          <p className="text-sm text-muted-foreground">Create and edit your document content with template preview</p>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <TemplateSelector 
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
          />
          <Button onClick={() => handleRefreshPreview()} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Preview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
            <Editor 
              className="h-full" 
              ref={editorRef}
              documentId={documentData?.id}
              initialTitle={documentData?.title}
              initialContent={documentData?.content}
              templateId={selectedTemplate}
              onDocumentSaved={handleDocumentSaved}
            />
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
            <PreviewRenderer htmlContent={previewContent} templateName={selectedTemplate} />
          </div>
        </div>
      </div>

      {/* Conflict Resolution Dialog */}
      {showConflictDialog && conflictData && (
        <ConflictResolutionDialog
          isOpen={showConflictDialog}
          onClose={() => {
            setShowConflictDialog(false);
            setConflictData(null);
            navigate('/dashboard');
          }}
          supabaseDocument={conflictData.supabaseDocument}
          localDocument={conflictData.localDocument}
          onResolve={handleConflictResolution}
        />
      )}
    </div>
  );
};

export default DocumentEditor;