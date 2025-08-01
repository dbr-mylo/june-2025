export const TEMPLATES = {
  'Modern Report': {
    name: 'Modern Report',
    styles: {
      '.preview-pane.modern-report ol, .preview-pane.modern-report ul': {
        fontFamily: 'Roboto, sans-serif',
      },
      h1: { fontFamily: 'Roboto, sans-serif', fontSize: '36px', color: '#2563eb', fontWeight: 'bold', lineHeight: '1.2' },
      h2: { fontFamily: 'Roboto, sans-serif', fontSize: '28px', color: '#2563eb', fontWeight: 'bold', lineHeight: '1.3' },
      h3: { fontFamily: 'Roboto, sans-serif', fontSize: '24px', color: '#2563eb', fontWeight: 'bold', lineHeight: '1.4' },
      p:  { fontFamily: 'Roboto, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#374151' },
      ul: {
        //fontFamily: 'Roboto, sans-serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'disc',
      },

      ol: {
        //fontFamily: 'Roboto, sans-serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'decimal',
      },

      li: {
        marginBottom: '0.25rem',
      }

    }
  },
  'Corporate Letterhead': {
    name: 'Corporate Letterhead',
    styles: {
      '.preview-pane.corporate-letterhead ol, .preview-pane.corporate-letterhead ul': {
        fontFamily: 'Avenir, sans-serif',
      },
      h1: { fontFamily: 'Avenir, sans-serif', fontSize: '32px', color: '#dc2626', fontWeight: 'bold' },
      h2: { fontFamily: 'Avenir, sans-serif', fontSize: '24px', color: '#dc2626', fontWeight: 'bold' },
      h3: { fontFamily: 'Avenir, sans-serif', fontSize: '22px', color: '#dc2626', fontWeight: 'bold' },
      p:  { fontFamily: 'Avenir, sans-serif', fontSize: '16px', lineHeight: '1.3', color: '#1f2937' },
      ul: {
        //fontFamily: 'Avenir, sans-serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'disc',
      },
      ol: {
        //fontFamily: 'Avenir, sans-serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'decimal',
      },
      li: {
        marginBottom: '0.25rem',
      }

    }
  },
  'Academic Paper': {
    name: 'Academic Paper',
    styles: {
      '.preview-pane.academic-paper ol, .preview-pane.academic-paper ul': {
        fontFamily: 'Georgia, serif',
      },
      h1: { fontFamily: 'Georgia, serif', fontSize: '28px', color: '#059669', fontWeight: 'bold' },
      h2: { fontFamily: 'Georgia, serif', fontSize: '22px', color: '#059669', fontWeight: 'bold' },
      h3: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#059669', fontWeight: 'bold' },
      p:  { fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: '2.0', color: '#111827' },
      ul: {
        //fontFamily: 'Georgia, serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'disc',
      },
      ol: {
        //fontFamily: 'Georgia, serif', 
        paddingLeft: '1.5rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem',
        listStyleType: 'decimal',
      },
      li: {
        marginBottom: '0.25rem',
      }
    }
  }
} as const;

export type TemplateName = keyof typeof TEMPLATES;
export type Template = typeof TEMPLATES[TemplateName];
