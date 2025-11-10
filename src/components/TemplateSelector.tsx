import { TEMPLATES, TEMPLATE_LABELS, type TemplateName } from '@/templates'

console.log('TemplateSelector path:', import.meta.url)


interface TemplateSelectorProps {
  selected: TemplateName
  onChange: (template: TemplateName) => void
}
console.log("Active TemplateSelector running");
console.log('Running from path:', import.meta.url)


export const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {

console.log('TemplateSelector labels:', TEMPLATE_LABELS)
console.log('TemplateSelector names:', Object.keys(TEMPLATES))


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
        {/* options for the template dropdown */}
        {Object.keys(TEMPLATES).map((name) => (
          <option key={name} value={name}>
            {TEMPLATE_LABELS[name] || name}
          </option>
        ))}

      </select>
    </div>
  )
}
