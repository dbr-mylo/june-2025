
import { Template } from '@/templates'

interface PreviewRendererProps {
  content: any
  template: Template
  className?: string
}

export const PreviewRenderer = ({ content, template, className = '' }: PreviewRendererProps) => {
  // Debug logging for template application
  console.log('🎨 PreviewRenderer - Template name:', template.name)
  console.log('📄 PreviewRenderer - Raw TipTap JSON:', content)

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    const nodeType = node.type
    const style = template.styles[nodeType] || {}
    
    // Debug logging for each node
    console.log(`🔍 Node type: ${nodeType}, Style key: ${nodeType}, Resolved style:`, style)

    switch (nodeType) {
      case 'heading':
        const level = node.attrs?.level || 1
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        const headingStyle = template.styles[`h${level}`] || template.styles['h1'] || {}
        
        console.log(`📝 Heading h${level} - Style key: h${level}, Resolved style:`, headingStyle)
        console.log(`🎯 Inline style string: ${Object.entries(headingStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}`)
        
        return (
          <HeadingTag key={index} style={headingStyle}>
            {renderContent(node.content)}
          </HeadingTag>
        )

      case 'paragraph':
        console.log(`📄 Paragraph - Style key: p, Resolved style:`, style)
        console.log(`🎯 Inline style string: ${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join('; ')}`)
        
        return (
          <p key={index} style={style}>
            {renderContent(node.content)}
          </p>
        )

      case 'bulletList':
        console.log(`🔸 BulletList - Style key: ul, Resolved style:`, style)
        console.log(`🎯 Inline style string: ${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join('; ')}`)
        
        return (
          <ul key={index} style={style}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex))}
          </ul>
        )

      case 'orderedList':
        console.log(`🔹 OrderedList - Style key: ol, Resolved style:`, style)
        console.log(`🎯 Inline style string: ${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join('; ')}`)
        
        return (
          <ol key={index} style={style}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex))}
          </ol>
        )

      case 'listItem':
        const liStyle = template.styles.li || {}
        console.log(`📋 ListItem - Style key: li, Resolved style:`, liStyle)
        console.log(`🎯 Inline style string: ${Object.entries(liStyle).map(([k, v]) => `${k}: ${v}`).join('; ')}`)
        
        return (
          <li key={index} style={liStyle}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex))}
          </li>
        )

      case 'text':
        let textElement = node.text || ''
        
        // Apply text formatting
        if (node.marks) {
          for (const mark of node.marks) {
            switch (mark.type) {
              case 'bold':
                textElement = <strong key={`bold-${index}`}>{textElement}</strong>
                break
              case 'italic':
                textElement = <em key={`italic-${index}`}>{textElement}</em>
                break
              case 'underline':
                textElement = <u key={`underline-${index}`}>{textElement}</u>
                break
            }
          }
        }
        
        return textElement

      default:
        // Fallback for unknown node types
        if (node.content) {
          return (
            <div key={index} style={style}>
              {renderContent(node.content)}
            </div>
          )
        }
        return null
    }
  }

  const renderContent = (content: any[]): React.ReactNode => {
    if (!content || !Array.isArray(content)) return null
    
    return content.map((node, index) => renderNode(node, index))
  }

  const parseContent = () => {
    try {
      // If content is a string (HTML), we need to handle it differently
      if (typeof content === 'string') {
        console.log('⚠️ Content is HTML string, using dangerouslySetInnerHTML')
        return <div dangerouslySetInnerHTML={{ __html: content }} />
      }
      
      // If content is TipTap JSON
      if (content && content.content) {
        console.log('✅ Content is TipTap JSON, rendering with React components')
        const renderedContent = renderContent(content.content)
        console.log('🎨 Final rendered preview content:', renderedContent)
        return renderedContent
      }
      
      console.log('📭 No content to preview')
      return <p style={template.styles.p || {}}>No content to preview</p>
    } catch (error) {
      console.error('❌ Error parsing content for preview:', error)
      return <p style={template.styles.p || {}}>Error rendering preview</p>
    }
  }

  return (
    <div className={`preview-renderer p-6 bg-white min-h-full ${className}`}>
      <div className="max-w-none">
        {parseContent()}
      </div>
    </div>
  )
}
