import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated } from 'util/auth';
import './style.css';
function Home() {
  return (
    <>
      <div className="home-container">
        <h1>{isAuthenticated() ? 'autenticado' : 'nao atenticado'}</h1>
        <h1>Resultado = {hasAnyRoles(['ROLE_ADMIN']) ? 'sim' : 'nao'}</h1>
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Conheca o melhor catalogo de produtos</h1>
              <p>
                Ajudaremos voce a encontrar os melhores produtos disponiveis no
                mercado
              </p>
            </div>
            <div>
              <Link to="/products">
                <ButtonIcon text="Inicie agora sua busca" />
              </Link>
            </div>
          </div>
          <div className="home-image-container">
            <MainImage />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
