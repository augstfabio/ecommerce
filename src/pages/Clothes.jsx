import styles from './Clothes.module.css';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Clothes() {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data, loading: fetchLoading } = useFetch({});

  useEffect(() => {
    if (data) {
      try {
        const category = 'clothing';
        const filteredProducts = data.filter(product =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        setClothes(filteredProducts);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  }, [data]);


  return (
    <div className={styles.clothes}>
      {fetchLoading && (
        <div className={styles.skl}>
          <span></span>
          <div className={styles.skeleton}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.skeleton}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>


      )}
      {!fetchLoading && <div className={styles.clothesContainer}>

        <h1>Roupas e Acessórios</h1>
        <div className={styles.products}>
          {clothes.map((prod) => (
            <Card prod={prod} key={prod.id} />
          ))}
        </div>

      </div>}


    </div>
  );
}
