import { Route, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import './styles.css';
import User from './User';
const Admin = () => {
  return (
    <>
      <div className="admin-container">
        <Navbar />
        <div className="admin-content">
          <Routes>
            <Route path="products" element={<h1>Product CRUD</h1>} />
            <Route path="categories" element={<h1>Categories CRUD</h1>} />
            <Route path="users" element={<User />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Admin;
