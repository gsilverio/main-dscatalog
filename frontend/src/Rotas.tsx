import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Admin from 'pages/Admin';
import ProductDetail from 'pages/ProductDetail';
import { Navigate } from 'react-router-dom';
import Auth from 'pages/Admin/Auth';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { myHistory } from 'util/history';
import PrivateRoute from 'components/PrivateRoute';

//No Route path="/" -> a barra significa a rota raiz (rota principal)

const Rotas = () => (
  <HistoryRouter history={myHistory}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Catalog />} />
      <Route path="products/:productId" element={<ProductDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<Navigate to="/admin/products" />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/admin/auth" element={<Auth />} />
      </Route>
      <Route
        path="/admin/auth/"
        element={<Navigate to="/admin/auth/login" />}
      />
      <Route path="/admin/auth/*" element={<Auth />} />
    </Routes>
  </HistoryRouter>
);

export default Rotas;
