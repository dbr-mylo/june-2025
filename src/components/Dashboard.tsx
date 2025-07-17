import { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DocumentMetadata } from '../types/document';
import { DocumentService } from '../lib/DocumentService';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { FileText, Plus, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface DashboardProps {
  onOpenDocument: (id: string) => void;
  onCreateNew: () => void;
}

interface DocumentRowProps {
  index: number;
  style: React.CSSProperties;
  data: {
    documents: DocumentMetadata[];
    onOpenDocument: (id: string) => void;
    onDeleteDocument: (id: string) => void;
  };
}

const DocumentRow = ({ index, style, data }: DocumentRowProps) => {
  const { documents, onOpenDocument, onDeleteDocument } = data;
  const document = documents[index];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this document? This cannot be undone in MVP.')) {
      onDeleteDocument(document.id);
    }
  };

  return (
    <div style={style}>
      <Card 
        className="mx-4 mb-2 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => onOpenDocument(document.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground truncate">
                  {document.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Modified: {formatDate(document.updated_at)}</span>
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {document.template_id}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-destructive hover:text-destructive shrink-0"
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Dashboard = ({ onOpenDocument, onCreateNew }: DashboardProps) => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 25;
  const ROW_HEIGHT = 100;
  const MAX_HEIGHT = 500;

  const loadDocuments = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const newDocuments = await DocumentService.listDocuments(
        ITEMS_PER_PAGE, 
        isLoadMore ? offset : 0
      );

      if (isLoadMore) {
        setDocuments(prev => [...prev, ...newDocuments]);
        setOffset(offset + ITEMS_PER_PAGE);
      } else {
        setDocuments(newDocuments);
        setOffset(ITEMS_PER_PAGE);
      }

      setHasMore(newDocuments.length === ITEMS_PER_PAGE);
    } catch (error) {
      toast({
        title: "Failed to load documents",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    const result = await DocumentService.deleteDocument(id);
    if (result.success) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast({
        title: "Document deleted",
        description: "The document has been permanently deleted.",
      });
    } else {
      toast({
        title: "Failed to delete document",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  // Check for pending saves on mount
  useEffect(() => {
    const pendingSaves = DocumentService.getPendingSaves();
    if (pendingSaves.length > 0) {
      toast({
        title: "Unsaved changes detected",
        description: `${pendingSaves.length} document(s) have unsaved changes.`,
        variant: "default",
      });
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading documents...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Documents</h1>
              <p className="text-muted-foreground mt-1">
                Manage your documents and templates
              </p>
            </div>
            <Button onClick={onCreateNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Document
            </Button>
          </div>
        </div>

        {documents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first document to get started with Mylo
              </p>
              <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Document
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="bg-card rounded-lg border">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">
                  Recent Documents ({documents.length})
                </h2>
              </div>
              
              <List
                height={Math.min(MAX_HEIGHT, documents.length * ROW_HEIGHT)}
                itemCount={documents.length}
                itemSize={ROW_HEIGHT}
                itemData={{
                  documents,
                  onOpenDocument,
                  onDeleteDocument: handleDeleteDocument,
                }}
              >
                {DocumentRow}
              </List>
              
              {hasMore && (
                <div className="p-4 border-t border-border text-center">
                  <Button
                    variant="outline"
                    onClick={() => loadDocuments(true)}
                    disabled={loadingMore}
                    className="flex items-center gap-2"
                  >
                    {loadingMore ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        Loading...
                      </>
                    ) : (
                      'Load More Documents'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};