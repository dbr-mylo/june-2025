import { useCallback, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TEMPLATES, type TemplateName } from '@/templates'
import { EditorToolbar } from './EditorToolbar'
import { PreviewRenderer } from './PreviewRenderer'

export default function Editor() {
  const editorRef = useRef<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName>('Modern Report')
  const [previewContent, setPreviewContent] = useState<any>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <p>This is a paragraph.</p>
      <ul>
        <li>Bullet 1
          <ul><li>Sub-bullet</li></ul>
        </li>
        <li>Bullet 2</li>
      </ul>
      <ol>
        <li>Number 1</li>
        <li>Number 2</li>
      </ol>
    `,
  })

  const handleRefreshPreview = useCallback(() => {
    if (editor) {
      const json = editor.getJSON()
      console.log('🔁 Refreshing preview with content:', json)
      setPreviewContent(json)
    }
  }, [editor])

  const handleTemplateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTemplate(event.target.value as TemplateName)
    // Preview does NOT auto-refresh
  }

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 border-r border-gray-200 p-4">
        <EditorToolbar editor={editor} onRefresh={handleRefreshPreview} />
        <EditorContent editor={editor} ref={editorRef} />
        <div className="mt-4 flex items-center space-x-2">
          <label htmlFor="template" className="text-sm font-medium">
            Template:
          </label>
          <select
            id="template"
            className="rounded border px-2 py-1 text-sm"
            value={selectedTemplate}
            onChange={handleTemplateSelect}
          >
            {Object.keys(TEMPLATES).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            onClick={handleRefreshPreview}
            className="ml-auto rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Refresh Preview
          </button>
        </div>
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        {previewContent ? (
          <PreviewRenderer content={previewContent} template={TEMPLATES[selectedTemplate]} />
        ) : (
          <p className="text-gray-400 italic">Click "Refresh Preview" to view formatted output</p>
        )}
      </div>
    </div>
  )
}
