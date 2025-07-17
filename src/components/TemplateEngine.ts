// Template definitions from preview-rendering-rules.md
export const TEMPLATES = {
  'Modern Report': {
    name: 'Modern Report',
    styles: {
      h1: { fontFamily: 'Lato, sans-serif', fontSize: '36px', color: '#2563eb', fontWeight: 'bold' },
      h2: { fontFamily: 'Lato, sans-serif', fontSize: '28px', color: '#2563eb', fontWeight: 'bold' },
      p: { fontFamily: 'Lato, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#374151' },
      ul: { fontFamily: 'Lato, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#374151' },
      ol: { fontFamily: 'Lato, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#374151' }
    }
  },
  'Corporate Letterhead': {
    name: 'Corporate Letterhead',
    styles: {
      h1: { fontFamily: 'Helvetica, sans-serif', fontSize: '32px', color: '#dc2626', fontWeight: 'bold' },
      h2: { fontFamily: 'Helvetica, sans-serif', fontSize: '24px', color: '#dc2626', fontWeight: 'bold' },
      p: { fontFamily: 'Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.3', color: '#1f2937' },
      ul: { fontFamily: 'Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.3', color: '#1f2937' },
      ol: { fontFamily: 'Helvetica, sans-serif', fontSize: '16px', lineHeight: '1.3', color: '#1f2937' }
    }
  },
  'Academic Paper': {
    name: 'Academic Paper',
    styles: {
      h1: { fontFamily: '"Times New Roman", serif', fontSize: '28px', color: '#059669', fontWeight: 'bold' },
      h2: { fontFamily: '"Times New Roman", serif', fontSize: '22px', color: '#059669', fontWeight: 'bold' },
      p: { fontFamily: '"Times New Roman", serif', fontSize: '14px', lineHeight: '2.0', color: '#111827' },
      ul: { fontFamily: '"Times New Roman", serif', fontSize: '14px', lineHeight: '2.0', color: '#111827' },
      ol: { fontFamily: '"Times New Roman", serif', fontSize: '14px', lineHeight: '2.0', color: '#111827' }
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

// Helper function to map Tiptap node types to template style keys
function getTemplateStyleKey(nodeType: string, level?: number): string {
  switch (nodeType) {
    case 'paragraph':
      return 'p';
    case 'heading':
      return `h${level || 1}`;
    case 'bulletList':
      return 'ul';
    case 'orderedList':
      return 'ol';
    default:
      return nodeType;
  }
}

export function applyTemplateToContent(tiptapJson: any, templateName: TemplateName): string {
  console.log('=== TemplateEngine Debug ===');
  console.log('Template Name:', templateName);
  console.log('Tiptap JSON:', JSON.stringify(tiptapJson, null, 2));
  
  if (!tiptapJson || !tiptapJson.content) {
    return '<p>No content to preview</p>';
  }

  const template = TEMPLATES[templateName];
  console.log('Selected Template:', JSON.stringify(template, null, 2));
  
  function renderNode(node: TiptapNode): string {
    const styleKey = getTemplateStyleKey(node.type, node.attrs?.level);
    console.log(`Node type: ${node.type} → Style key: ${styleKey}`);
    
    const styles = template.styles[styleKey as keyof typeof template.styles];
    console.log(`Styles for ${styleKey}:`, styles);
    
    const styleString = styles
      ? Object.entries(styles)
          .map(([key, value]) => {
            const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            let cssValue = String(value);

            if (cssKey === 'font-family') {
              const families = cssValue.split(',').map(f => {
                const trimmed = f.trim().replace(/^["']|["']$/g, '');
                return /\s/.test(trimmed) ? `"${trimmed}"` : trimmed;
              });
              cssValue = families.join(', ');
            }
            return `${cssKey}: ${cssValue} !important`;
          })
          .join('; ') + ';'   // ensure final semicolon
      : '';


    console.log(`Generated style string: "${styleString}"`);

    switch (node.type) {
      case 'paragraph':
        const pContent = node.content?.map(renderNode).join('') || '';
        return `<p style='${styleString}'>${pContent}</p>`;

      
      case 'heading':
        const hContent = node.content?.map(renderNode).join('') || '';
        const level = node.attrs?.level || 1;
        return `<h${level} style='${styleString}'>${hContent}</h${level}>`;
      
      case 'bulletList':
        const ulContent = node.content?.map(renderNode).join('') || '';
        return `<ul style='${styleString}'>${ulContent}</ul>`;

      
      case 'orderedList':
        const olContent = node.content?.map(renderNode).join('') || '';
        return `<ol style='${styleString}'>${olContent}</ol>`;

      case 'listItem':
        const liContent = node.content?.map(renderNode).join('') || '';
        return `<li style='${styleString}'>${liContent}</li>`;

      case 'text':
        return node.text || '';
      
      case 'hardBreak':
        return '<br>';
      
      default:
        return node.content?.map(renderNode).join('') || '';
    }
  }

  const htmlContent = tiptapJson.content.map(renderNode).join('');
  console.log('Final Generated HTML:', htmlContent);
  console.log('=== End TemplateEngine Debug ===');
  return htmlContent || '<p>No content to preview</p>';
}