import React, { useState, useEffect, useImperativeHandle } from 'react'
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
import { EditorToolbar } from './EditorToolbar'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'
import { DocumentService } from '../lib/DocumentService'
import { TemplateName } from './TemplateEngine'
import { Save, Clock, AlertTriangle } from 'lucide-react'

interface EditorProps {
  className?: string
  ref?: React.RefObject<any>
  documentId?: string
  initialTitle?: string
  initialContent?: any
  templateId?: TemplateName
  onDocumentSaved?: (document: any) => void
}

export const Editor = React.forwardRef<any, EditorProps>(({ 
  className = '', 
  documentId,
  initialTitle = 'Untitled Document',
  initialContent,
  templateId = 'Modern Report',
  onDocumentSaved 
}, ref) => {
  const { toast } = useToast()
  const [documentTitle, setDocumentTitle] = useState(initialTitle)
  const [lastSaved, setLastSaved] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

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

  // Expose editor instance through ref
  useImperativeHandle(ref, () => ({
    getJSON: () => editor?.getJSON(),
    getHTML: () => editor?.getHTML(),
    getText: () => editor?.getText()
  }), [editor])

  // Load initial content on mount
  useEffect(() => {
    if (initialContent && editor) {
      editor.commands.setContent(initialContent)
    } else if (!initialContent && editor) {
      // Load from localStorage as fallback
      const savedContent = localStorage.getItem('mylo-document')
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent)
          editor.commands.setContent(parsedContent.content || '')
        } catch (error) {
          console.warn('Failed to load saved content:', error)
        }
      }
    }
  }, [editor, initialContent])

  const handleSave = async () => {
    if (!editor || !documentTitle.trim()) {
      toast({
        title: "Cannot save document",
        description: "Please enter a document title.",
        variant: "destructive",
      })
      return
    }

    setSaveStatus('saving')

    try {
      const content = editor.getJSON()
      const result = await DocumentService.saveDocument(
        documentId || null,
        documentTitle.trim(),
        templateId,
        content
      )

      if (result.success && result.document) {
        setSaveStatus('saved')
        setLastSaved(result.document.updated_at)
        
        // Also save to localStorage as backup
        localStorage.setItem('mylo-document', JSON.stringify({
          content: editor.getHTML(),
          lastModified: result.document.updated_at,
          wordCount: getWordCount(editor),
          title: documentTitle,
          templateId: templateId,
        }))

        toast({
          title: "Document saved",
          description: "Your document has been saved successfully.",
        })

        onDocumentSaved?.(result.document)
      } else {
        setSaveStatus('error')
        toast({
          title: "Save failed",
          description: result.error || "Failed to save document. Changes stored locally.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setSaveStatus('error')
      console.error('Save error:', error)
      toast({
        title: "Save failed",
        description: "An unexpected error occurred. Changes stored locally.",
        variant: "destructive",
      })
    }

    // Reset status after 3 seconds
    setTimeout(() => {
      if (saveStatus !== 'saving') {
        setSaveStatus('idle')
      }
    }, 3000)
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
      {/* Header with title and save controls */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full"
              placeholder="Document title..."
            />
            {lastSaved && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                <span>Last saved: {new Date(lastSaved).toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Button 
              onClick={handleSave} 
              size="sm"
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-2"
            >
              {saveStatus === 'saving' ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-3 w-3" />
                  Save
                </>
              )}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {saveStatus === 'error' && (
                <AlertTriangle className="h-4 w-4 text-warning" />
              )}
              <span>{getWordCount(editor)} words</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-border bg-background">
        <div className="px-4 py-2">
          <EditorToolbar editor={editor} />
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <EditorContent 
          editor={editor} 
          className="h-full"
        />
      </div>
    </div>
  )
});

Editor.displayName = 'Editor';