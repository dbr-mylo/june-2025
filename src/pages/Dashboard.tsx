import { useNavigate } from 'react-router-dom';
import { Dashboard as DashboardComponent } from '@/components/Dashboard';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOpenDocument = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/editor');
  };

  return (
    <DashboardComponent
      onOpenDocument={handleOpenDocument}
      onCreateNew={handleCreateNew}
    />
  );
};

export default Dashboard;