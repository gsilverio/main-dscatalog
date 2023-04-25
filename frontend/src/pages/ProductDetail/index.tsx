import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import './styles.css';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from 'util/requests';
import ProductInfoLoader from './ProductInfoLoader';
import ProductDetailLoader from './ProductDetailLoader';

type UrlParams = {
  productId: string;
};
const ProductDetail = () => {
  const { productId } = useParams<UrlParams>();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  //   //FORMA INCORRETA
  //   let product: Product;
  //   //FORMA INCORRTE
  //   //AXIOS CHAMADAS ASSINCRONAS
  //   axios.get(BASE_URL + '/products/2').then((response) => {
  //     console.log(response.data);
  //   });

  return (
    <>
      <div className="productDetail-container">
        <div className="base-card productDetail-card">
          <Link to="/products">
            <div className="goBack-container">
              <ArrowIcon />
              <h2>VOLTAR</h2>
            </div>
          </Link>
          <div className="row">
            <div className="col-xl-6">
              {isLoading ? (
                <ProductInfoLoader />
              ) : (
                <>
                  <div className="img-container">
                    <img src={product?.imgUrl} alt={product?.name} />
                  </div>
                  <div className="name-price-container">
                    <h1>{product?.name}</h1>
                    {product && <ProductPrice price={product?.price} />}
                  </div>
                </>
              )}
            </div>
            <div className="col-xl-6">
              {isLoading ? (
                <ProductDetailLoader />
              ) : (
                <div className="description-container">
                  <h2>Descricao do Produto</h2>
                  <p>{product?.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
