import React from 'react'
import { Template } from '@/templates'

interface PreviewRendererProps {
  content: any
  template: Template
}

export const PreviewRenderer = ({ content, template }: PreviewRendererProps) => {
  const getTemplateStyleKey = (type: string, level?: number): string => {
    switch (type) {
      case 'paragraph': return 'p'
      case 'heading': return `h${level || 1}`
      case 'bulletList': return 'ul'
      case 'orderedList': return 'ol'
      case 'listItem': return 'li'
      default: return type
    }
  }

  const convertStyleToReact = (style: Record<string, any>) => {
    const reactStyle: React.CSSProperties = {}
    for (const key in style) {
      const camelKey = key.replace(/-([a-z])/g, (_, l) => l.toUpperCase())
      reactStyle[camelKey as keyof React.CSSProperties] = style[key]
    }
    return reactStyle
  }

  const renderNode = (node: any, depth: number = 0): React.ReactNode => {
    const styleKey = getTemplateStyleKey(node.type, node.attrs?.level)
    const styleObj = template.styles[styleKey] || {}
    const style = convertStyleToReact(styleObj)

    // Add nested indentation logic
    if (node.type === 'ul' || node.type === 'ol') {
      style.paddingLeft = `${depth * 1.5}em`
    }

    switch (node.type) {
      case 'paragraph':
        return <p style={style}>{node.content?.map((n: any, i: number) => renderNode(n, depth))}</p>
      case 'heading':
        const level = node.attrs?.level || 1
        const Tag = `h${level}` as keyof JSX.IntrinsicElements
        return <Tag style={style}>{node.content?.map((n: any, i: number) => renderNode(n, depth))}</Tag>
      case 'bulletList':
      case 'orderedList':
        const ListTag = node.type === 'bulletList' ? 'ul' : 'ol'
        return React.createElement(ListTag, { style }, node.content?.map((n: any, i: number) => renderNode(n, depth + 1)))
      case 'listItem':
        return <li style={style}>{node.content?.map((n: any, i: number) => renderNode(n, depth))}</li>
      case 'text':
        return node.text
      default:
        return node.content?.map((n: any, i: number) => renderNode(n, depth))
    }
  }

  if (!content || !content.content) return <p>No preview content available.</p>

  return <div>{content.content.map((node: any, i: number) => <div key={i}>{renderNode(node)}</div>)}</div>
}
