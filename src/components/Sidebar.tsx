import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Folder, User, Settings, Trash2 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActiveRoute = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard' || currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const navItems = [
    {
      title: "Documents",
      icon: FileText,
      href: "/dashboard",
      isActive: isActiveRoute('/dashboard')
    },
    {
      title: "Templates",
      icon: Folder,
      href: "#",
      isActive: false,
      disabled: true
    },
    {
      title: "Trash",
      icon: Trash2,
      href: "#",
      isActive: false,
      disabled: true
    }
  ];

  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r border-border", className)}>
      {/* Header */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <h2 className="text-lg font-semibold">Mylo</h2>
      </div>

      {/* User Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">User Name</p>
            <p className="text-xs text-muted-foreground truncate">Team</p>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.disabled ? (
                <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground/60 cursor-not-allowed">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </div>
              ) : (
                <Link to={item.href}>
                  <Button
                    variant={item.isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3",
                      item.isActive && "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Folders Section */}
        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Folders
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground/60">
              <Folder className="h-4 w-4" />
              Marketing
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground/60">
              <Folder className="h-4 w-4" />
              Reports
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}