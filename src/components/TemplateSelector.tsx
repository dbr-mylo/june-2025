import { TEMPLATES, type Template } from '@/templates'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

interface TemplateSelectorProps {
  selectedTemplate: Template
  onTemplateSelect: (template: Template) => void
}

export const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          {selectedTemplate.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(TEMPLATES).map((template) => (
          <DropdownMenuItem
            key={template.name}
            onClick={() => onTemplateSelect(template)}
            className={selectedTemplate.name === template.name ? 'bg-accent' : ''}
          >
            {template.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
