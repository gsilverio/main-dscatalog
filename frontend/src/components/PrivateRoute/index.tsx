import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, Role } from 'util/auth';

type Props = {
  role?: Role[];
};

const PrivateRoute = ({ role = [] }: Props) => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/admin/auth/login' }} />
  );
};

export default PrivateRoute;
