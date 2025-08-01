import React from 'react'
import { Template } from '@/templates'
import { renderPreviewHTML } from '@/lib/TemplateEngine'
import { toPreviewClassName, generateInjectedCSS } from '@/lib/preview-utils'

interface PreviewRendererProps {
  content: any
  template: Template
}

export const PreviewRenderer = ({ content, template }: PreviewRendererProps) => {
  if (!content || !content.content) {
    return <p>No preview content available.</p>
  }

  const html = renderPreviewHTML(content, template.styles)
  const previewClass = toPreviewClassName(template.name)
  const injectedCSS = generateInjectedCSS(template.styles)

  console.log('[📘 PreviewRenderer]', {
  template: template.name,
  className: `preview-pane ${previewClass}`,
  injectedCSS,
  renderedHTML: html.slice(0, 500) + '...'  // truncate to keep readable
})

  return (
    <div className={`preview-pane ${previewClass}`}>
      <style>{injectedCSS}</style>
      <div
        className="preview-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
