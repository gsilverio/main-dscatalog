import { Navigate, Outlet } from 'react-router-dom';
import { Role } from 'types/role';
import { hasAnyRoles, isAuthenticated } from 'util/auth';

type Props = {
  role?: Role[];
};

const PrivateRoute = ({ role = [] }: Props) => {
  return isAuthenticated() ? (
    !hasAnyRoles(role) ? (
      <Navigate to={{ pathname: '/admin/products' }} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={{ pathname: '/admin/auth/login' }} />
  );
};

export default PrivateRoute;
