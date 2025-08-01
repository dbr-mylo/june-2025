import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'

interface DocumentMenuProps {
  documentId: string
  currentTitle: string
  onRenameSuccess: (newTitle: string) => void
}

export function DocumentMenu({ documentId, currentTitle, onRenameSuccess }: DocumentMenuProps) {
  const navigate = useNavigate()

  const handleTrash = async () => {
    const { error } = await supabase
      .from('documents')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', documentId)

    if (error) {
      console.error('❌ Failed to move to trash:', error)
    } else {
      window.location.reload() // quick and dirty UI refresh
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Open document actions"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        className="min-w-[160px] rounded bg-white shadow border border-gray-200 text-sm"
        sideOffset={4}
      >
        <DropdownMenu.Item
          onSelect={() => navigate(`/documents/${documentId}`)}
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
        >
          Open
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={async () => {
            const newTitle = window.prompt('Rename document:', currentTitle)
            if (!newTitle || newTitle.trim() === '') return

            const { error } = await supabase
              .from('documents')
              .update({ title: newTitle.trim() })
              .eq('id', documentId)

            if (error) {
              console.error('❌ Rename failed:', error)
            } else {
              onRenameSuccess(newTitle.trim())
            }
          }}
          className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
        >
          Rename
        </DropdownMenu.Item>
        <DropdownMenu.Item
          onSelect={handleTrash}
          className="px-3 py-2 text-red-600 hover:bg-gray-50 cursor-pointer"
        >
          Trash
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
