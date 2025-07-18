import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentService } from '@/lib/DocumentService';
import { useToast } from '@/hooks/use-toast';

export const NewDocumentRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(true);

  useEffect(() => {
    const createNewDocument = async () => {
      try {
        const result = await DocumentService.saveDocument(
          null, // id = null for new document
          'Untitled Document',
          'Modern Report',
          { type: "doc", content: [] }
        );

        if (result.success && result.document) {
          // Navigate to the new document
          navigate(`/editor/${result.document.id}`, { replace: true });
        } else {
          throw new Error(result.error || 'Failed to create document');
        }
      } catch (error) {
        console.error('Failed to create new document:', error);
        toast({
          title: "Error",
          description: "Failed to create new document. Please try again.",
          variant: "destructive",
        });
        navigate('/dashboard', { replace: true });
      }
    };

    createNewDocument();
  }, [navigate, toast]);

  if (isCreating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Creating new document...</p>
        </div>
      </div>
    );
  }

  return null;
};