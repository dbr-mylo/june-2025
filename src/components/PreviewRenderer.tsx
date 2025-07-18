
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

  // Map TipTap node types to template style keys
  const getTemplateStyleKey = (nodeType: string, level?: number): string => {
    switch (nodeType) {
      case 'paragraph': return 'p';
      case 'heading': return `h${level || 1}`;
      case 'bulletList': return 'ul';
      case 'orderedList': return 'ol';
      case 'listItem': return 'li';
      default: return nodeType;
    }
  }

  // Convert CSS properties to React-compatible camelCase
  const convertStyleToReact = (style: any) => {
    const reactStyle: any = {}
    Object.entries(style).forEach(([key, value]) => {
      switch (key) {
        case 'font-family':
          reactStyle.fontFamily = value
          break
        case 'font-size':
          reactStyle.fontSize = value
          break
        case 'font-weight':
          reactStyle.fontWeight = value
          break
        case 'line-height':
          reactStyle.lineHeight = value
          break
        case 'list-style-type':
          reactStyle.listStyleType = value
          break
        default:
          // Convert kebab-case to camelCase for other properties
          const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
          reactStyle[camelKey] = value
      }
    })
    return reactStyle
  }

  const renderNode = (node: any, index: number, nestLevel: number = 0): React.ReactNode => {
    if (!node) return null

    const nodeType = node.type
    
    switch (nodeType) {
      case 'heading':
        const level = node.attrs?.level || 1
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        const styleKey = getTemplateStyleKey(nodeType, level)
        const rawHeadingStyle = template.styles[styleKey] || template.styles['h1'] || {}
        const headingStyle = convertStyleToReact(rawHeadingStyle)
        
        console.log(`📝 TipTap node: ${nodeType} (level ${level}, nestLevel: ${nestLevel}) - Style key: ${styleKey}`)
        console.log(`🎯 Raw style:`, rawHeadingStyle)
        console.log(`🎯 Converted React style:`, headingStyle)
        
        return (
          <HeadingTag key={index} style={headingStyle}>
            {renderContent(node.content, nestLevel)}
          </HeadingTag>
        )

      case 'paragraph':
        const pStyleKey = getTemplateStyleKey(nodeType)
        const rawPStyle = template.styles[pStyleKey] || {}
        const pStyle = convertStyleToReact(rawPStyle)
        
        console.log(`📄 TipTap node: ${nodeType} (nestLevel: ${nestLevel}) - Style key: ${pStyleKey}`)
        console.log(`🎯 Raw style:`, rawPStyle)
        console.log(`🎯 Converted React style:`, pStyle)
        
        return (
          <p key={index} style={pStyle}>
            {renderContent(node.content, nestLevel)}
          </p>
        )

      case 'bulletList':
        const ulStyleKey = getTemplateStyleKey(nodeType)
        const rawUlStyle = template.styles[ulStyleKey] || {}
        const ulStyle = { 
          ...convertStyleToReact(rawUlStyle),
          paddingLeft: `${nestLevel * 1.5}em`
        }
        
        console.log(`🔸 TipTap node: ${nodeType} (nestLevel: ${nestLevel}) - Style key: ${ulStyleKey}`)
        console.log(`🎯 Raw style:`, rawUlStyle)
        console.log(`🎯 Converted React style with indentation:`, ulStyle)
        
        return (
          <ul key={index} style={ulStyle}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex, nestLevel + 1))}
          </ul>
        )

      case 'orderedList':
        const olStyleKey = getTemplateStyleKey(nodeType)
        const rawOlStyle = template.styles[olStyleKey] || {}
        const olStyle = { 
          ...convertStyleToReact(rawOlStyle),
          paddingLeft: `${nestLevel * 1.5}em`
        }
        
        console.log(`🔹 TipTap node: ${nodeType} (nestLevel: ${nestLevel}) - Style key: ${olStyleKey}`)
        console.log(`🎯 Raw style:`, rawOlStyle)
        console.log(`🎯 Converted React style with indentation:`, olStyle)
        
        return (
          <ol key={index} style={olStyle}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex, nestLevel + 1))}
          </ol>
        )

      case 'listItem':
        const liStyleKey = getTemplateStyleKey(nodeType)
        const rawLiStyle = template.styles[liStyleKey] || {}
        const liStyle = convertStyleToReact(rawLiStyle)
        
        console.log(`📋 TipTap node: ${nodeType} (nestLevel: ${nestLevel}) - Style key: ${liStyleKey}`)
        console.log(`🎯 Raw style:`, rawLiStyle)
        console.log(`🎯 Converted React style:`, liStyle)
        
        return (
          <li key={index} style={liStyle}>
            {node.content?.map((item: any, itemIndex: number) => renderNode(item, itemIndex, nestLevel))}
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
        const fallbackStyleKey = getTemplateStyleKey(nodeType)
        const rawFallbackStyle = template.styles[fallbackStyleKey] || {}
        const fallbackStyle = convertStyleToReact(rawFallbackStyle)
        
        console.log(`❓ Unknown TipTap node: ${nodeType} (nestLevel: ${nestLevel}) - Style key: ${fallbackStyleKey}`)
        console.log(`🎯 Raw style:`, rawFallbackStyle)
        console.log(`🎯 Converted React style:`, fallbackStyle)
        
        if (node.content) {
          return (
            <div key={index} style={fallbackStyle}>
              {renderContent(node.content, nestLevel)}
            </div>
          )
        }
        return null
    }
  }

  const renderContent = (content: any[], nestLevel: number = 0): React.ReactNode => {
    if (!content || !Array.isArray(content)) return null
    
    return content.map((node, index) => renderNode(node, index, nestLevel))
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
