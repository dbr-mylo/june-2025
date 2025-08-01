import { toast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { TemplateSelector } from '@/components/TemplateSelector'
import Editor from '@/components/Editor'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DocumentEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [content, setContent] = useState<any>(null)
  const [template, setTemplate] = useState<string>('Modern Report')
  const [title, setTitle] = useState<string>('Untitled Document')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!id) {
      console.error('❌ Missing document ID in route')
      navigate('/documents')
      return
    }

    if (id === 'new') {
      console.log('🆕 Creating new document, skipping Supabase fetch')
      setContent({
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: 'Welcome to Mylo' }],
          },
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Start writing here...' }],
          },
        ],
      })
      setLoading(false)
      return
    }

    const loadDocument = async () => {
      console.log('📡 Fetching document from Supabase with ID:', id)

      const { data, error } = await supabase
        .from('documents')
        .select('content, template_id, title')
        .eq('id', id)
        .single()

      if (error || !data) {
        console.error('❌ Document load failed:', error)
        toast({
          title: 'Load failed',
          description: 'Could not fetch document from Supabase.',
          variant: 'destructive',
        })
        navigate('/documents')
        return
      }

      setContent(data.content)
      setTemplate(data.template_id)
      setTitle(data.title || 'Untitled Document')
      setLoading(false)
    }

    loadDocument()
  }, [id, navigate])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <Editor
        initialContent={content}
        initialTemplate={template}
        documentId={id}
        initialTitle={title}
      />
    </div>
  )
}
