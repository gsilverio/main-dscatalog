import { Route, Routes } from 'react-router-dom';
import { ReactComponent as AuthImage } from '../../../assets/images/auth-image.svg';
import Login from './Login';
import './styles.css';

const Auth = () => {
  return (
    <h1>
      <div className="auth-container">
        <div className="auth-banner-container">
          <h1>Divulgue seus produtos no DS catalog</h1>
          <p>
            Faça parte do nosso catalago de divulgacao e aumente a venda dos
            seus produtos.
          </p>
          <AuthImage />
        </div>
        <div className="auth-form-container base-card">
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<h1>Card de Signup</h1>}></Route>
            <Route path="recover" element={<h1>Card de Recover</h1>}></Route>
          </Routes>
        </div>
      </div>
    </h1>
  );
};

export default Auth;
