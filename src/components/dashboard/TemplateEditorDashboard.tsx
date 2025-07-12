
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus, Search, Settings, User, Palette, Layout } from 'lucide-react';

export const TemplateEditorDashboard = () => {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Mylo</h1>
            {user?.role === 'guest' && (
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                Demo Mode - Template Editor
              </div>
            )}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border">
          <div className="p-6">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Palette className="mr-2 h-4 w-4" />
                Templates
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Recent
              </Button>
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Template Editor Dashboard</h1>
                <p className="text-muted-foreground">
                  {user?.role === 'guest' 
                    ? 'Demo mode: Create templates and documents to explore all features.'
                    : 'Design beautiful templates and create engaging content.'
                  }
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  New Document
                </Button>
                <Button>
                  <Palette className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Create Document</CardTitle>
                  <CardDescription>
                    Write with editor + preview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Design Template</CardTitle>
                  <CardDescription>
                    Create stunning layouts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Palette className="mr-2 h-4 w-4" />
                    New Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">My Templates</CardTitle>
                  <CardDescription>
                    Manage your designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Layout className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Work</CardTitle>
                  <CardDescription>
                    Continue your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Browse
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>
                    Your recently modified documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No documents yet. Create your first document!</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>My Templates</CardTitle>
                  <CardDescription>
                    Templates you've created
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Palette className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <p>No templates yet. Design your first template!</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
