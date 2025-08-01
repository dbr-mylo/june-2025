import { TEMPLATES, type TemplateName } from '@/templates'

interface TemplateSelectorProps {
  selected: TemplateName
  onChange: (template: TemplateName) => void
}

export const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="template" className="block text-sm font-medium mb-1">
        Template
      </label>
      <select
        id="template"
        value={selected}
        onChange={(e) => onChange(e.target.value as TemplateName)}
        className="rounded border px-2 py-1 text-sm"
      >
        {Object.keys(TEMPLATES).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
