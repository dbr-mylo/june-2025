
import { UserRole } from '@/contexts/UserContext';

export const ROLE_PERMISSIONS = {
  contributor: {
    canCreateDocuments: true,
    canEditOwnDocuments: true,
    canViewTemplates: true,
    canSelectTemplates: true,
    canAccessPreview: true,
    canEditTemplates: false,
    canCreateTemplates: false,
    canManageUsers: false,
    routes: ['/dashboard', '/document/:id', '/settings', '/account', '/trash']
  },
  'template-editor': {
    canCreateDocuments: true,
    canEditOwnDocuments: true,
    canViewTemplates: true,
    canSelectTemplates: true,
    canAccessPreview: true,
    canEditTemplates: true,
    canCreateTemplates: true,
    canManageUsers: false,
    routes: ['/dashboard', '/document/:id', '/template/:id', '/templates', '/settings', '/account', '/trash']
  },
  admin: {
    canCreateDocuments: true,
    canEditOwnDocuments: true,
    canViewTemplates: true,
    canSelectTemplates: true,
    canAccessPreview: true,
    canEditTemplates: true,
    canCreateTemplates: true,
    canManageUsers: true,
    routes: ['/dashboard', '/document/:id', '/template/:id', '/templates', '/admin', '/settings', '/account', '/trash']
  },
  guest: {
    canCreateDocuments: true,
    canEditOwnDocuments: true,
    canViewTemplates: true,
    canSelectTemplates: true,
    canAccessPreview: true,
    canEditTemplates: false,
    canCreateTemplates: false,
    canManageUsers: false,
    routes: ['/guest', '/help']
  }
} as const;

export function hasPermission(role: UserRole, permission: keyof typeof ROLE_PERMISSIONS.contributor): boolean {
  return ROLE_PERMISSIONS[role][permission] as boolean;
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const allowedRoutes = ROLE_PERMISSIONS[role].routes;
  return allowedRoutes.some(allowedRoute => {
    // Handle dynamic routes like /document/:id
    if (allowedRoute.includes(':')) {
      const pattern = allowedRoute.replace(/:[\w]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(route);
    }
    return route === allowedRoute || route.startsWith(allowedRoute + '/');
  });
}

export function getDefaultRoute(role: UserRole): string {
  switch (role) {
    case 'contributor':
      return '/dashboard';
    case 'template-editor':
      return '/dashboard';
    case 'admin':
      return '/dashboard';
    case 'guest':
      return '/guest';
    default:
      return '/';
  }
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'contributor':
      return 'Contributor';
    case 'template-editor':
      return 'Template Editor';
    case 'admin':
      return 'Admin';
    case 'guest':
      return 'Guest';
    default:
      return 'Unknown';
  }
}
