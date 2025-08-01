import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { DocumentMenu } from '@/components/DocumentMenu'

interface DocumentRow {
  id: string
  title: string
  template_id: string
  created_at: string
  updated_at: string
}

export default function DocumentDashboard() {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadDocuments = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, template_id, created_at, updated_at')
        .filter('deleted_at', 'is', null)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('❌ Failed to fetch documents:', error)
        setDocuments([])
      } else {
        setDocuments(data)
      }

      setLoading(false)
    }

    loadDocuments()
  }, [])

  const handleOpen = (id: string) => {
    navigate(`/documents/${id}`)
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Documents</h1>
        <button
          onClick={() => navigate('/documents/new')}
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-900"
        >
          New Document
        </button>
      </div>

    
      {loading ? (
        <LoadingSpinner />
        ) : documents.length === 0 ? (
          <p className="text-sm text-gray-500">No documents found.</p>
        ) : (
          <div className="border rounded border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            <div className="col-span-2">Document Title</div>
            <div>Created</div>
            <div className="text-right">Actions</div>
          </div>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="grid grid-cols-4 px-4 py-3 items-center hover:bg-gray-50 text-sm border-t border-gray-100"
            >
              <div
                className="col-span-2 truncate cursor-pointer"
                onClick={() => handleOpen(doc.id)}
              >
                {doc.title || 'Untitled'}
              </div>
              <div onClick={() => handleOpen(doc.id)}>
                {new Date(doc.created_at).toLocaleDateString()}
              </div>
              <div className="text-right">
                <DocumentMenu
                  documentId={doc.id}
                  currentTitle={doc.title}
                  onRenameSuccess={(newTitle) =>
                    setDocuments((docs) =>
                      docs.map((d) =>
                        d.id === doc.id ? { ...d, title: newTitle } : d
                      )
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
