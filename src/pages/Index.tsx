import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to dashboard by default
  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">Mylo</h1>
          <p className="text-lg text-muted-foreground">
            Professional document creation with smart templates
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center gap-2"
          size="lg"
        >
          <FileText className="h-5 w-5" />
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
