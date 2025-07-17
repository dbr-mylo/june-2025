import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { AlertTriangle, Clock, FileText } from 'lucide-react';
import { DocumentMetadata, LocalDocument } from '../types/document';

interface ConflictResolutionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  supabaseDocument: DocumentMetadata;
  localDocument: LocalDocument;
  onResolve: (useLocal: boolean) => void;
}

export const ConflictResolutionDialog = ({
  isOpen,
  onClose,
  supabaseDocument,
  localDocument,
  onResolve,
}: ConflictResolutionDialogProps) => {
  const [selectedVersion, setSelectedVersion] = useState<'supabase' | 'local' | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleResolve = () => {
    if (selectedVersion) {
      onResolve(selectedVersion === 'local');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <DialogTitle>Unsaved Changes Found</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            This document has unsaved changes stored locally that are newer than the version on the server. 
            Choose which version to keep:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Server Version */}
            <Card 
              className={`cursor-pointer border-2 transition-colors ${
                selectedVersion === 'supabase' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedVersion('supabase')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">Server Version</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Last saved: {formatDate(supabaseDocument.updated_at)}</span>
                  </div>
                  <div>Template: {supabaseDocument.template_id}</div>
                </div>
              </CardContent>
            </Card>

            {/* Local Version */}
            <Card 
              className={`cursor-pointer border-2 transition-colors ${
                selectedVersion === 'local' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedVersion('local')}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-warning" />
                  <h3 className="font-semibold">Local Version (Unsaved)</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Last edited: {formatDate(localDocument.last_saved)}</span>
                  </div>
                  <div>Template: {localDocument.template_id}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> The version you don't select will be permanently lost. 
              Consider exporting it first if you need to keep both versions.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleResolve}
            disabled={!selectedVersion}
          >
            Use {selectedVersion === 'local' ? 'Local' : 'Server'} Version
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};