import { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DocumentMetadata } from '../types/document';
import { DocumentService } from '../lib/DocumentService';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Sidebar } from './Sidebar';
import { FileText, Plus, Calendar, Search, MoreHorizontal } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onOpenDocument: (id: string) => void;
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
  
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '—';
      return date.toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: '2-digit' 
      });
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return '—';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Delete this document? This cannot be undone in MVP.')) {
      onDeleteDocument(document.id);
    }
  };

  return (
    <div style={style}>
      <div 
        className="grid grid-cols-[40px_1fr_150px_150px_40px] gap-4 px-4 py-3 hover:bg-muted/30 cursor-pointer border-b border-border/50 transition-colors"
        onClick={() => onOpenDocument(document.id)}
      >
        {/* Checkbox placeholder */}
        <div className="flex items-center">
          <div className="w-4 h-4 border border-border rounded"></div>
        </div>
        
        {/* Document Title */}
        <div className="flex items-center gap-2 min-w-0">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="font-medium text-foreground truncate">
            {document.title}
          </span>
        </div>
        
        {/* Created Date */}
        <div className="flex items-center text-sm text-muted-foreground">
          {formatDate(document.created_at)}
        </div>
        
        {/* Last Edited Date */}
        <div className="flex items-center text-sm text-muted-foreground">
          {document.updated_at ? formatDate(document.updated_at) : "—"}
        </div>
        
        {/* Actions */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = ({ onOpenDocument }: DashboardProps) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const { toast } = useToast();

  const ITEMS_PER_PAGE = 25;
  const ROW_HEIGHT = 100;
  const MAX_HEIGHT = 500;

  const handleCreateNew = async () => {
    try {
      // Create a new document and navigate to its editor
      const result = await DocumentService.saveDocument(
        null,
        'Untitled Document', 
        'Modern Report',
        JSON.stringify({ type: 'doc', content: [] })
      );

      if (result.success && result.document) {
        navigate(`/editor/${result.document.id}`);
        if (result.error) {
          toast({
            title: "Document created locally",
            description: result.error,
            variant: "default",
          });
        }
      } else {
        toast({
          title: "Failed to create document",
          description: result.error || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to create document",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Documents</h1>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Document
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort</span>
              <Button variant="outline" size="sm">
                Last Edited
              </Button>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first document to get started with Mylo
                </p>
                <Button onClick={handleCreateNew} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Document
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Documents Table Header */}
              <div className="grid grid-cols-[40px_1fr_150px_150px_40px] gap-4 px-4 py-3 bg-muted/30 rounded-t-lg border-b text-sm font-medium text-muted-foreground">
                <div></div>
                <div>Document Title</div>
                <div>Created</div>
                <div>Last Edited</div>
                <div></div>
              </div>
              
              {/* Documents List */}
              <div className="bg-card rounded-b-lg border border-t-0">
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
                        'View more'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};