import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

interface DocumentRow {
  id: string
  title: string
  template_id: string
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export default function TrashDashboard() {
  const [documents, setDocuments] = useState<DocumentRow[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadTrash = async () => {
      const { data, error } = await supabase
        .from('documents')
        .select('id, title, template_id, created_at, updated_at, deleted_at')
        .filter('deleted_at', 'not.is', null)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('❌ Failed to fetch trash documents:', error)
        setDocuments([])
      } else {
        setDocuments(data)
      }

      setLoading(false)
    }

    loadTrash()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Trash</h1>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : documents.length === 0 ? (
        <p className="text-sm text-gray-500">Trash is empty.</p>
      ) : (
        <div className="border rounded border-gray-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            <div className="col-span-2">Document Title</div>
            <div>Deleted At</div>
          </div>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="grid grid-cols-3 px-4 py-3 items-center hover:bg-gray-50 text-sm border-t border-gray-100"
            >
              <div className="col-span-2 truncate">{doc.title || 'Untitled'}</div>
              <div className="flex items-center justify-end space-x-2">
                <span>{new Date(doc.updated_at).toLocaleDateString()}</span>
                <button
                  onClick={async () => {
                    await supabase
                      .from('documents')
                      .update({ deleted_at: null })
                      .eq('id', doc.id)

                    setDocuments((prev) => prev.filter((d) => d.id !== doc.id))
                  }}
                  className="text-blue-600 hover:underline"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
