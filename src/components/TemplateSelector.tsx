import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEMPLATES, TemplateName } from "./TemplateEngine";

interface TemplateSelectorProps {
  value: TemplateName;
  onValueChange: (value: TemplateName) => void;
}

export const TemplateSelector = ({ value, onValueChange }: TemplateSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Template:</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(TEMPLATES).map((templateName) => (
            <SelectItem key={templateName} value={templateName}>
              {templateName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};