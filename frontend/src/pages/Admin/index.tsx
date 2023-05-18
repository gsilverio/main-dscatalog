import { Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import './styles.css';

import PrivateRoute from 'components/PrivateRoute';
import Users from './Users';
import Products from './Products';
const Admin = () => {
  return (
    <>
      <div className="admin-container">
        <Navbar />
        <div className="admin-content">
          <Routes>
            <Route path="products/*" element={<Products />} />
            <Route path="categories/*" element={<h1>Categories CRUD</h1>} />
            <Route element={<PrivateRoute role={['ROLE_ADMIN']} />}>
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
