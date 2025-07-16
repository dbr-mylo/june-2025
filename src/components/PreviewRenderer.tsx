import { useState } from 'react';
import { Button } from './ui/button';

interface PreviewRendererProps {
  htmlContent: string;
  templateName?: string;
}

export const PreviewRenderer = ({ htmlContent, templateName }: PreviewRendererProps) => {
  const [showDebug, setShowDebug] = useState(false);
  
  console.log('PreviewRenderer - Received HTML:', htmlContent);
  console.log('PreviewRenderer - Template Name:', templateName);
  
  return (
    <div className="h-full bg-background border border-border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Preview</h2>
          {templateName && (
            <p className="text-sm text-muted-foreground mt-1">Active Template: {templateName}</p>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </Button>
      </div>
      <div className="h-[calc(100%-80px)] overflow-auto p-6 bg-white">
        {showDebug ? (
          <pre className="text-xs bg-gray-100 p-4 rounded border overflow-auto whitespace-pre-wrap">
            {htmlContent}
          </pre>
        ) : (
          <div className="template-preview-isolation">
            <div 
              className="template-preview-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        )}
      </div>
    </div>
  );
};