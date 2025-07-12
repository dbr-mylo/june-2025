
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Template {
  id: string;
  name: string;
  settings: Record<string, any>;
  styles: Array<{
    name: string;
    selector: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    lineHeight: string;
  }>;
  thumbnailUrl?: string;
  createdBy: string;
  assignedTo: string[];
  createdAt: string;
}

export interface TemplateContextType {
  selectedTemplate: Template | null;
  availableTemplates: Template[];
  setSelectedTemplate: (template: Template | null) => void;
  loadTemplates: () => Promise<void>;
  isLoading: boolean;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

interface TemplateProviderProps {
  children: ReactNode;
}

export const TemplateProvider = ({ children }: TemplateProviderProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase template loading
      console.log('Loading templates...');
      
      // Mock templates for now
      const mockTemplates: Template[] = [
        {
          id: '1',
          name: 'Default Template',
          settings: {},
          styles: [
            {
              name: 'Heading 1',
              selector: 'h1',
              fontFamily: 'Inter',
              fontSize: '2rem',
              fontWeight: '600',
              color: 'hsl(var(--foreground))',
              lineHeight: '1.2'
            }
          ],
          createdBy: 'system',
          assignedTo: ['all'],
          createdAt: new Date().toISOString()
        }
      ];
      
      setAvailableTemplates(mockTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        selectedTemplate,
        availableTemplates,
        setSelectedTemplate,
        loadTemplates,
        isLoading
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};
