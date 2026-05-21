import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: 'BeomLog Admin',
  robots: {
    index: false,
    follow: false,
  },
};

const AdminPage = () => {
  return <AdminDashboard />;
};

export default AdminPage;
