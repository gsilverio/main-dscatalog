import ProductCard from 'components/ProductCard';
import { Product } from 'types/product';
import { Link } from 'react-router-dom';
import './styles.css';
import Pagination from 'components/Pagination';
import { useState, useEffect } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { requestBackEnd } from 'util/requests';
import axios, { AxiosRequestConfig } from 'axios';
import CardLoader from './Cardloader';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/products`,
      params: {
        page: 0,
        size: 12,
      },

      //NAO TEM DATA PORQUE GET NAO PRECISA DE CORPO
    };
    setIsLoading(true);
    requestBackEnd(params)
      .then((responde) => {
        setPage(responde.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container my-4 catalog-container">
        <div className="row catalog-title-container">
          <h1>Catalogo de produtos</h1>
        </div>
        <div className="row">
          {isLoading ? (
            <>
              <CardLoader />
            </>
          ) : (
            page?.content.map((product) => {
              return (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                  <Link to="/products/1">
                    <ProductCard product={product} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
        <div className="row">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Catalog;