export const TEMPLATES = {
  'Modern Report': {
  name: 'Modern Report',
  styles: {
    h1: {
      fontFamily: 'Minion Pro, serif',
      fontSize: '20px',
      lineHeight: '24px',
      textAlign: 'center',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      color: '#91161a',
      padding: '10px 0px 8px 0px',
      borderBottom: '1px solid #91161a',
      borderTop: '1px solid #91161a',
      margin: '0px 0px 55px 0px'
    },
    h2: {
      fontFamily: 'Minion Pro, serif',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontSize: '14px',
      borderTop: '0.5px solid #000000',
      padding: '5px 0px 0px 0px',
      color: '#91161a',
      margin: '34px 0px 10px 0px !important'
    },
    h3: {
      fontFamily: 'Minion Pro, serif',
      fontSize: '12px',
      color: '#000000',
      lineHeight: '17px',
      marginTop: '5px',
      marginBottom: '0px',
      fontWeight: 'bold'
    },
    p: {
      fontFamily: 'Minion Pro, serif',
      fontSize: '11px',
      lineHeight: '17px',
      color: '#000000',
      marginBottom: '10px'
    },
    '.preview-pane strong': {
      color: '#91161a'
    },
    ul: {
      fontFamily: 'Minion Pro, serif',
      paddingLeft: '1.5rem',
      marginTop: '0rem',
      marginBottom: '1rem',
      listStyleType: 'disc',
      fontSize: '11px',
      lineHeight: '17px'
    },
    ol: {
      fontFamily: 'Minion Pro, serif',
      paddingLeft: '1.5rem',
      marginTop: '0rem',
      marginBottom: '1rem',
      listStyleType: 'decimal',
      fontSize: '12px'
    },
    'ul li p': {
      fontFamily: 'Minion Pro, serif',
      marginBottom: '0px !important'
    }
  }
},
  'Corporate Letterhead': {
    name: 'Corporate Letterhead',
    styles: {
      '.preview-pane.corporate-letterhead ol, .preview-pane.corporate-letterhead ul, .preview-pane.corporate-letterhead h1': {
        fontFamily:'Gill Sans, sans-serif',
      },
      h1: {
          fontSize: '24px',
          fontFamily: 'Gill Sans, sans-serif',
          fontWeight: '600',
          color: '#25408E',
          textAlign: 'right',
          margin: '0 0 40px -19px',
          lineHeight: '28px',
          padding: '0px',
          backgroundImage: 'linear-gradient(#d9d9d9, #d9d9d9), linear-gradient(#d9d9d9, #d9d9d9), linear-gradient(#d9d9d9, #d9d9d9)',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
          backgroundSize: '190px 3px, 190px 3px, 190px 3px',
          backgroundPosition: '20px calc(50% - 8px), 20px 50%, 20px calc(50% + 8px)'
        },
    h2: {
          paddingTop: '10px',
          fontWeight: '600',
          color: '#25408E',
          fontFamily:'Gill Sans, sans-serif',
          fontSize: '17px'
        },
    h3: {
          fontSize: '13px',
          fontWeight: '600',
          fontStyle: 'italic',
          color: '#000000',
          lineHeight: '15px',
          paddingBottom: '3px',
          fontFamily:'Gill Sans, sans-serif'
        },
    p: {
          fontSize: '13px',
          lineHeight: '18px',
          margin: '0 0 9px 0',
          fontWeight: '300',
          letterSpacing: '0.2px !important',
          fontFamily:'Gill Sans, sans-serif',
        },
    strong: {
          color: '#25408E',
          fontWeight: '600',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
          textDecorationColor: '#B3B3B3',
          textDecorationThickness: '1.5px'
        },
    ul: {
          margin: '-9px 0 18px 0',
          listStyleType: 'disc',
          listStyleSize: '8px !important',
          paddingLeft: '35px'
        },
    'ul li::marker': {
          fontSize: '12px'
        },
    li: {
          marginBottom: '0px !important'
        },
    'li p': {
          margin: '0px !important',
          padding: '0px !important',
          lineHeight: '0px',
          fontWeight: '300'
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
export const TEMPLATE_LABELS: Record<string, string> = {
  'Modern Report': 'Traditional Report',
  'Corporate Letterhead': 'Corporate Report',
  'Academic Paper': 'Fun Report',
}
