interface PreviewRendererProps {
  htmlContent: string;
  templateName?: string;
}

export const PreviewRenderer = ({ htmlContent, templateName }: PreviewRendererProps) => {
  console.log('PreviewRenderer - Received HTML:', htmlContent);
  console.log('PreviewRenderer - Template Name:', templateName);
  
  return (
    <div className="h-full bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
        {templateName && (
          <p className="text-sm text-muted-foreground mt-1">Active Template: {templateName}</p>
        )}
      </div>
      <div className="h-[calc(100%-80px)] overflow-auto p-6 bg-white">
        <div 
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};