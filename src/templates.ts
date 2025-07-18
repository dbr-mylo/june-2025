
export interface TemplateStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  lineHeight?: string;
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
        fontFamily: 'Lato, sans-serif',
        fontSize: '32px',
        color: '#1a1a1a',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '24px',
        color: '#1a1a1a',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Lato, sans-serif',
        fontSize: '20px',
        color: '#1a1a1a',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#333333'
      },
      ul: {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#333333',
        lineHeight: '1.6'
      },
      ol: {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#333333',
        lineHeight: '1.6'
      }
    }
  },
  {
    name: 'Corporate Letterhead',
    styles: {
      h1: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '28px',
        color: '#0055a5',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '20px',
        color: '#0055a5',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '18px',
        color: '#0055a5',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#000000'
      },
      ul: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '14px',
        color: '#000000',
        lineHeight: '1.4'
      },
      ol: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '14px',
        color: '#000000',
        lineHeight: '1.4'
      }
    }
  },
  {
    name: 'Academic Paper',
    styles: {
      h1: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '24px',
        color: '#000000',
        fontWeight: 'bold',
        lineHeight: '1.2'
      },
      h2: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '18px',
        color: '#000000',
        fontWeight: 'bold',
        lineHeight: '1.3'
      },
      h3: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '16px',
        color: '#000000',
        fontWeight: 'bold',
        lineHeight: '1.4'
      },
      p: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '12pt',
        lineHeight: '2',
        color: '#000000'
      },
      ul: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '12pt',
        color: '#000000',
        lineHeight: '2'
      },
      ol: {
        fontFamily: 'Times New Roman, Times, serif',
        fontSize: '12pt',
        color: '#000000',
        lineHeight: '2'
      }
    }
  }
];
