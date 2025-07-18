
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import { useState, useEffect } from 'react'
import { EditorToolbar } from './EditorToolbar'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { PreviewRenderer } from './PreviewRenderer'
import { TemplateSelector } from './TemplateSelector'
import { templates, Template } from '@/templates'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { RefreshCw } from 'lucide-react'

interface EditorProps {
  className?: string
}

export const Editor = ({ className = '' }: EditorProps) => {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(templates[0])
  const [previewContent, setPreviewContent] = useState<any>(null)

  // Manual word count function as fallback
  const getWordCount = (editor: any) => {
    if (!editor) return 0
    
    // Try CharacterCount extension first
    try {
      if (editor.storage.characterCount?.words) {
        return editor.storage.characterCount.words() || 0
      }
    } catch (error) {
      console.warn('CharacterCount extension failed, using manual count')
    }
    
    // Fallback to manual counting
    const text = editor.getText().trim()
    if (!text) return 0
    return text.split(/\s+/).length
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the default bold, italic to use our extensions
        bold: false,
        italic: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Bold,
      Italic,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
      ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      CharacterCount,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
      handleKeyDown: (view, event) => {
        // Handle Tab for list indentation - only when cursor is in a list
        if (event.key === 'Tab' && !event.shiftKey) {
          if (editor?.isActive('listItem') && editor?.commands.sinkListItem('listItem')) {
            event.preventDefault()
            return true
          }
        }
        
        // Handle Shift+Tab for list outdenting - only when cursor is in a list
        if (event.key === 'Tab' && event.shiftKey) {
          if (editor?.isActive('listItem') && editor?.commands.liftListItem('listItem')) {
            event.preventDefault()
            return true
          }
        }
        
        return false
      },
    },
  })

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('mylo-document')
    if (savedContent && editor) {
      try {
        const parsedContent = JSON.parse(savedContent)
        editor.commands.setContent(parsedContent.content || '')
        // Initial preview update
        handleRefreshPreview()
      } catch (error) {
        console.warn('Failed to load saved content:', error)
      }
    }
  }, [editor])

  const handleSave = async () => {
    if (!editor) return

    setIsSaving(true)
    try {
      const content = editor.getHTML()
      const documentData = {
        content,
        lastModified: new Date().toISOString(),
        wordCount: getWordCount(editor),
      }

      localStorage.setItem('mylo-document', JSON.stringify(documentData))
      
      toast({
        title: "Document saved",
        description: "Your work has been saved locally.",
      })
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Failed to save document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRefreshPreview = () => {
    if (!editor) return
    
    try {
      // Get the JSON content from TipTap
      const jsonContent = editor.getJSON()
      console.log('Refreshing preview with content:', jsonContent)
      setPreviewContent(jsonContent)
    } catch (error) {
      console.error('Error refreshing preview:', error)
      toast({
        title: "Preview update failed",
        description: "Failed to update preview. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    // Automatically refresh preview when template changes
    handleRefreshPreview()
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-border bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between p-2">
          <EditorToolbar editor={editor} />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {getWordCount(editor)} words
            </span>
            <TemplateSelector 
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
            />
            <Button 
              onClick={handleRefreshPreview}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Preview
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              variant="outline"
              size="sm"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      {/* Split Panel Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Editor Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto">
              <EditorContent 
                editor={editor} 
                className="h-full"
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Preview Panel */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-auto bg-gray-50">
              {previewContent ? (
                <PreviewRenderer 
                  content={previewContent}
                  template={selectedTemplate}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <p className="mb-2">Preview will appear here</p>
                    <Button 
                      onClick={handleRefreshPreview}
                      variant="outline"
                      size="sm"
                      className="gap-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh Preview
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
