import { JSONContent } from '@tiptap/react'

type StyleMap = {
  [key: string]: React.CSSProperties
}

export function renderPreviewHTML(doc: JSONContent, styles: StyleMap): string {
  const renderNode = (node: any): string => {
    const { type, content = [], text, marks, attrs } = node
    const children = content.map(renderNode).join('')

    if (type === 'text') {
      return applyMarks(text || '', marks)
    }

    const styleKey = normalizeNodeType(type, attrs)
    const styleObj = styles[styleKey] || {}
    const styleString = Object.entries(styleObj)
      .map(([key, value]) => `${camelToKebab(key)}:${value}`)
      .join(';')

    const tag = mapTag(type, attrs)
    return `<${tag} style="${styleString}">${children}</${tag}>`
  }

  if (!doc || !Array.isArray(doc.content)) return ''

  const htmlContent = doc.content.map(renderNode).join('')
  return `<div class="preview-body">${htmlContent}</div>`
}

// Helper: Map Tiptap types to template style keys
function normalizeNodeType(type: string, attrs?: any): string {
  if (type === 'heading') return `h${attrs?.level || 1}`
  if (type === 'paragraph') return 'p'
  if (type === 'bulletList') return 'ul'
  if (type === 'orderedList') return 'ol'
  if (type === 'listItem') return 'li'
  return type
}

// Helper: Map Tiptap types to HTML tags
function mapTag(type: string, attrs?: any): string {
  switch (type) {
    case 'paragraph':
      return 'p'
    case 'heading':
      return `h${attrs?.level || 1}`
    case 'bulletList':
      return 'ul'
    case 'orderedList':
      return 'ol'
    case 'listItem':
      return 'li'
    default:
      return 'div'
  }
}

// Helper: Convert camelCase → kebab-case for inline styles
function camelToKebab(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Helper: Inline formatting (marks)
function applyMarks(text: string, marks: any[]): string {
  if (!marks || !Array.isArray(marks)) return text

  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':
        return `<strong>${acc}</strong>`
      case 'italic':
        return `<em>${acc}</em>`
      case 'underline':
        return `<u>${acc}</u>`
      default:
        return acc
    }
  }, text)
}
