interface PreviewRendererProps {
  htmlContent: string;
}

export const PreviewRenderer = ({ htmlContent }: PreviewRendererProps) => {
  return (
    <div className="h-full bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
      </div>
      <div className="h-[calc(100%-60px)] overflow-auto p-6 bg-white">
        <div 
          className="max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};