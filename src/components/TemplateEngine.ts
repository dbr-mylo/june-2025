// Template definitions from preview-rendering-rules.md
export const TEMPLATES = {
  'Modern Report': {
    name: 'Modern Report',
    styles: {
      h1: { fontFamily: 'Lato', fontSize: '32px', color: '#1a1a1a' },
      h2: { fontFamily: 'Lato', fontSize: '24px', color: '#1a1a1a' },
      p: { fontFamily: 'Georgia', fontSize: '16px', lineHeight: '1.6', color: '#333333' },
      ul: { fontFamily: 'Georgia', fontSize: '16px', color: '#333333' },
      ol: { fontFamily: 'Georgia', fontSize: '16px', color: '#333333' }
    }
  },
  'Corporate Letterhead': {
    name: 'Corporate Letterhead',
    styles: {
      h1: { fontFamily: 'Helvetica', fontSize: '28px', color: '#0055a5' },
      h2: { fontFamily: 'Helvetica', fontSize: '20px', color: '#0055a5' },
      p: { fontFamily: 'Times New Roman', fontSize: '14px', lineHeight: '1.4', color: '#000000' },
      ul: { fontFamily: 'Times New Roman', fontSize: '14px', color: '#000000' },
      ol: { fontFamily: 'Times New Roman', fontSize: '14px', color: '#000000' }
    }
  },
  'Academic Paper': {
    name: 'Academic Paper',
    styles: {
      h1: { fontFamily: 'Times New Roman', fontSize: '24px', color: '#000000', fontWeight: 'bold' },
      h2: { fontFamily: 'Times New Roman', fontSize: '18px', color: '#000000', fontWeight: 'bold' },
      p: { fontFamily: 'Times New Roman', fontSize: '12pt', lineHeight: '2', color: '#000000' },
      ul: { fontFamily: 'Times New Roman', fontSize: '12pt', color: '#000000' },
      ol: { fontFamily: 'Times New Roman', fontSize: '12pt', color: '#000000' }
    }
  }
} as const;

export type TemplateName = keyof typeof TEMPLATES;

interface TiptapNode {
  type: string;
  content?: TiptapNode[];
  text?: string;
  attrs?: any;
}

export function applyTemplateToContent(tiptapJson: any, templateName: TemplateName): string {
  if (!tiptapJson || !tiptapJson.content) {
    return '<p>No content to preview</p>';
  }

  const template = TEMPLATES[templateName];
  
  function renderNode(node: TiptapNode): string {
    const styles = template.styles[node.type as keyof typeof template.styles];
    const styleString = styles 
      ? Object.entries(styles)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
          .join('; ')
      : '';

    switch (node.type) {
      case 'paragraph':
        const pContent = node.content?.map(renderNode).join('') || '';
        return `<p style="${styleString}">${pContent}</p>`;
      
      case 'heading':
        const level = node.attrs?.level || 1;
        const headingStyles = template.styles[`h${level}` as keyof typeof template.styles];
        const headingStyleString = headingStyles
          ? Object.entries(headingStyles)
              .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
              .join('; ')
          : '';
        const hContent = node.content?.map(renderNode).join('') || '';
        return `<h${level} style="${headingStyleString}">${hContent}</h${level}>`;
      
      case 'bulletList':
        const ulContent = node.content?.map(renderNode).join('') || '';
        return `<ul style="${styleString}">${ulContent}</ul>`;
      
      case 'orderedList':
        const olContent = node.content?.map(renderNode).join('') || '';
        return `<ol style="${styleString}">${olContent}</ol>`;
      
      case 'listItem':
        const liContent = node.content?.map(renderNode).join('') || '';
        return `<li>${liContent}</li>`;
      
      case 'text':
        return node.text || '';
      
      case 'hardBreak':
        return '<br>';
      
      default:
        return node.content?.map(renderNode).join('') || '';
    }
  }

  const htmlContent = tiptapJson.content.map(renderNode).join('');
  return htmlContent || '<p>No content to preview</p>';
}