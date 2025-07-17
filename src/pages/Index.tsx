import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@/components/Editor';
import { PreviewRenderer } from '@/components/PreviewRenderer';
import { TemplateSelector } from '@/components/TemplateSelector';
import { Button } from '@/components/ui/button';
import { applyTemplateToContent, TemplateName } from '@/components/TemplateEngine';
import { RefreshCw, FileText, Folder } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('Modern Report');
  const [previewContent, setPreviewContent] = useState('<p>Click "Refresh Preview" to see your content with the selected template</p>');
  const editorRef = useRef<any>(null);

  const handleRefreshPreview = () => {
    console.log('Refresh Preview clicked');
    console.log('Editor ref:', editorRef.current);
    if (editorRef.current) {
      const editorJson = editorRef.current.getJSON();
      console.log('Editor JSON:', editorJson);
      console.log('Selected template:', selectedTemplate);
      const styledHtml = applyTemplateToContent(editorJson, selectedTemplate);
      console.log('Styled HTML:', styledHtml);
      setPreviewContent(styledHtml);
    } else {
      console.log('Editor ref is null');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Mylo</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Professional document creation with smart templates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={() => navigate('/editor')} 
              className="flex items-center gap-2"
              size="lg"
            >
              <FileText className="h-5 w-5" />
              Create New Document
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')} 
              variant="outline"
              className="flex items-center gap-2"
              size="lg"
            >
              <Folder className="h-5 w-5" />
              View My Documents
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Try the Editor</h2>
          <p className="text-sm text-muted-foreground">Test drive our editor with live template preview</p>
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
            <PreviewRenderer htmlContent={previewContent} templateName={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
