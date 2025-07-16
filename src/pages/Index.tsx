import { useState, useRef } from 'react';
import { Editor } from '@/components/Editor';
import { PreviewRenderer } from '@/components/PreviewRenderer';
import { TemplateSelector } from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { applyTemplateToContent, TemplateName } from '@/components/TemplateEngine';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('Modern Report');
  const [previewContent, setPreviewContent] = useState('<p>Click "Refresh Preview" to see your content with the selected template</p>');
  const editorRef = useRef<any>(null);

  const handleRefreshPreview = () => {
    if (editorRef.current) {
      const editorJson = editorRef.current.getJSON();
      const styledHtml = applyTemplateToContent(editorJson, selectedTemplate);
      setPreviewContent(styledHtml);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Document Editor</h1>
          <p className="text-sm text-muted-foreground">Create and edit your document content with template preview</p>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <TemplateSelector 
            value={selectedTemplate}
            onValueChange={setSelectedTemplate}
          />
          <Button onClick={handleRefreshPreview} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Preview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
            <Editor className="h-full" ref={editorRef} />
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
            <PreviewRenderer htmlContent={previewContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
