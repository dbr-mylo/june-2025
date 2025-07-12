
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/contexts/UserContext';
import { getRoleDisplayName } from '@/lib/roles';
import { FileText, Palette, Users } from 'lucide-react';

export const GuestMode = () => {
  const { switchToGuest } = useUser();

  const handleRoleSelect = (role: UserRole) => {
    switchToGuest(role);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to Mylo Demo</h1>
          <p className="text-lg text-muted-foreground">
            Choose a role to explore how Mylo works for different types of users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <CardTitle>Contributor</CardTitle>
              </div>
              <CardDescription>
                Focus on writing and content creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• Create and edit documents</li>
                <li>• Apply templates to content</li>
                <li>• Use rich text editor</li>
                <li>• Preview formatted output</li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleRoleSelect('contributor')}
              >
                Try as {getRoleDisplayName('contributor')}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="h-6 w-6 text-purple-600" />
                <CardTitle>Template Editor</CardTitle>
              </div>
              <CardDescription>
                Design beautiful templates and layouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• Create custom templates</li>
                <li>• Design styles and layouts</li>
                <li>• All Contributor features</li>
                <li>• Manage template library</li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleRoleSelect('template-editor')}
              >
                Try as {getRoleDisplayName('template-editor')}
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-600" />
                <CardTitle>Admin</CardTitle>
              </div>
              <CardDescription>
                Manage users, teams, and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• User and team management</li>
                <li>• System administration</li>
                <li>• All Template Editor features</li>
                <li>• Publishing and permissions</li>
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleRoleSelect('admin')}
              >
                Try as {getRoleDisplayName('admin')}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Demo mode uses local storage only. No data is saved permanently.
          </p>
        </div>
      </div>
    </div>
  );
};
