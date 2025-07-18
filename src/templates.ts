
export interface TemplateStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  lineHeight?: string;
  listStyleType?: string;
}

export interface Template {
  name: string;
  styles: {
    [nodeType: string]: TemplateStyle;
  };
}

export const templates: Template[] = [
  {
    name: 'Modern Report',
    styles: {
      h1: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '36px',
        color: '#2563eb',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '28px',
        color: '#2563eb',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24px',
        color: '#2563eb',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        lineHeight: '1.6',
        color: '#374151'
      },
      ul: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        color: '#374151',
        lineHeight: '1.6',
        listStyleType: 'disc'
      },
      ol: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        color: '#374151',
        lineHeight: '1.6',
        listStyleType: 'decimal'
      },
      li: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
        color: '#374151',
        lineHeight: '1.6'
      }
    }
  },
  {
    name: 'Corporate Letterhead',
    styles: {
      h1: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '32px',
        color: '#dc2626',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '24px',
        color: '#dc2626',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '22px',
        color: '#dc2626',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '16px',
        lineHeight: '1.3',
        color: '#1f2937'
      },
      ul: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '16px',
        color: '#1f2937',
        lineHeight: '1.3',
        listStyleType: 'disc'
      },
      ol: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '16px',
        color: '#1f2937',
        lineHeight: '1.3',
        listStyleType: 'decimal'
      },
      li: {
        fontFamily: 'Avenir, sans-serif',
        fontSize: '16px',
        color: '#1f2937',
        lineHeight: '1.3'
      }
    }
  },
  {
    name: 'Academic Paper',
    styles: {
      h1: {
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        color: '#059669',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        color: '#059669',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        color: '#059669',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        lineHeight: '2.0',
        color: '#111827'
      },
      ul: {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: '#111827',
        lineHeight: '2.0',
        listStyleType: 'disc'
      },
      ol: {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: '#111827',
        lineHeight: '2.0',
        listStyleType: 'decimal'
      },
      li: {
        fontFamily: 'Georgia, serif',
        fontSize: '14px',
        color: '#111827',
        lineHeight: '2.0'
      }
    }
  }
];
