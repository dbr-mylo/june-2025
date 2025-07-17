import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, RefreshCw, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditorHeaderProps {
  title: string;
  onTitleChange: (title: string) => void;
  templateName: string;
  lastSaved?: string;
  saveStatus: "saving" | "saved" | "error" | "idle";
  onSave: () => void;
  onRefreshPreview: () => void;
}

export function EditorHeader({
  title,
  onTitleChange,
  templateName,
  lastSaved,
  saveStatus,
  onSave,
  onRefreshPreview
}: EditorHeaderProps) {
  const navigate = useNavigate();

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case "saving":
        return "Saving...";
      case "saved":
        return lastSaved ? `Last saved: ${lastSaved}` : "Saved";
      case "error":
        return "Save failed";
      default:
        return "Not saved";
    }
  };

  return (
    <div className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
      {/* Left side - Navigation and title */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="border-none shadow-none p-0 h-auto font-medium text-base bg-transparent focus-visible:ring-0"
            placeholder="Untitled Document"
          />
        </div>
      </div>

      {/* Center - Template and status */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>Template: {templateName}</span>
        <span className={
          saveStatus === "error" ? "text-destructive" : 
          saveStatus === "saving" ? "text-orange-500" : 
          "text-muted-foreground"
        }>
          {getSaveStatusText()}
        </span>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefreshPreview}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Preview
        </Button>
        
        <Button
          size="sm"
          onClick={onSave}
          disabled={saveStatus === "saving"}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          {saveStatus === "saving" ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}