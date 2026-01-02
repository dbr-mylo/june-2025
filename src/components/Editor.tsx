import { useEffect, useState, useRef, useCallback } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TEMPLATES, type TemplateName } from '@/templates'
import { TemplateSelector } from '@/components/TemplateSelector'
import { EditorToolbar } from './EditorToolbar'
import { PreviewRenderer } from './PreviewRenderer'
import { supabase } from '@/lib/supabaseClient'
import { toast } from '@/components/ui/use-toast'
import styles from './Editor.module.css'

interface EditorProps {
  initialContent: any
  initialTemplate: TemplateName
  documentId?: string
  initialTitle?: string
}

export default function Editor({
  initialContent,
  initialTemplate,
  documentId,
  initialTitle,
}: EditorProps) {
  const editorRef = useRef<any>(null)

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>(initialTemplate)
  const [appliedTemplate, setAppliedTemplate] = useState<TemplateName>(initialTemplate)
  const [previewContent, setPreviewContent] = useState<any>(initialContent)
  const [title, setTitle] = useState<string>(initialTitle || 'Untitled Document')

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent || '',
  })

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent])

  const handleRefreshPreview = useCallback(() => {
    if (!editor) return
    const json = editor.getJSON()
    setPreviewContent(json)
    setAppliedTemplate(selectedTemplate)
  }, [editor, selectedTemplate])

  const handleSave = useCallback(async () => {
    if (!editor) return

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      toast({
        title: 'Not signed in',
        description: 'You must be logged in to save.',
        variant: 'destructive',
      })
      return
    }

    const content = editor.getJSON()

    const payload = {
      content,
      template_id: selectedTemplate,
      owner_id: user.id,
      title,
    }

    let result
    if (documentId && documentId !== 'new') {
      result = await supabase.from('documents').update(payload).eq('id', documentId)
    } else {
      result = await supabase.from('documents').insert([payload])
    }

    if (!result || result.error) {
      toast({
        title: 'Save failed',
        description: result?.error?.message || 'Unexpected error occurred.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Saved successfully',
        description: 'Your document has been saved.',
      })
    }
  }, [editor, selectedTemplate, documentId, title])

  return (
    <div className="flex flex-col w-full bg-white">

      {/* Sticky header block */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">

        {/* Title bar */}
        <div className="px-6 py-3 border-b border-gray-200">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 border border-transparent rounded px-1 py-0.5 w-full"
          />
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2 bg-white flex items-center gap-4">
          <EditorToolbar editor={editor} />

          <div className="flex items-center gap-4 ml-auto">
            <TemplateSelector
              selected={selectedTemplate}
              onChange={setSelectedTemplate}
            />

            <button
              onClick={handleRefreshPreview}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Refresh Preview
            </button>

            <button
              onClick={handleSave}
              className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="flex flex-grow w-full">

        {/* Editor panel */}
        <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
          <div className="content-wrapper px-6 py-4">
            <EditorContent editor={editor} ref={editorRef} />
          </div>
        </div>

        {/* Preview panel */}
        <div className="w-1/2 overflow-y-auto flex justify-center bg-[#f1f1f1]">
          <div className="content-wrapper max-w-[700px] bg-white py-6 px-8">
            {previewContent ? (
              <PreviewRenderer
                content={previewContent}
                template={TEMPLATES[appliedTemplate]}
              />
            ) : (
              <p className="text-gray-400 italic">
                Click Refresh Preview to view formatted output
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
