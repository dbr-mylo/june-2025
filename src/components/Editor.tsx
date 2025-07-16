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

interface EditorProps {
  className?: string
  ref?: React.RefObject<any>
}

export const Editor = React.forwardRef<any, EditorProps>(({ className = '' }, ref) => {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

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

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('mylo-document')
    if (savedContent && editor) {
      try {
        const parsedContent = JSON.parse(savedContent)
        editor.commands.setContent(parsedContent.content || '')
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