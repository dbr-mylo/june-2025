import { useNavigate } from 'react-router-dom';
import { Dashboard as DashboardComponent } from '@/components/Dashboard';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleOpenDocument = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <DashboardComponent
      onOpenDocument={handleOpenDocument}
    />
  );
};

export default Dashboard;