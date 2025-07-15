import { Editor } from '@/components/Editor'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">Document Editor</h1>
          <p className="text-sm text-muted-foreground">Create and edit your document content</p>
        </div>
        
        <div className="border border-border rounded-lg overflow-hidden bg-card shadow-sm">
          <Editor className="h-[600px]" />
        </div>
      </div>
    </div>
  );
};

export default Index;
