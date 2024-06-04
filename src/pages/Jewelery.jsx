import styles from './Jewelery.module.css'
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Jewelery() {
  const [jewelery, setJewelery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data, loading: fetchLoading } = useFetch({});

  useEffect(() => {
    if (data) {
      try {
        const category = 'jewelery';
        const filteredProducts = data.filter(product =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        setJewelery(filteredProducts);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  }, [data]);


  return (
    <div className={styles.jewelery}>
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
      {!fetchLoading &&
        <div className={styles.jeweleryContainer}>
          <h1>Bijuteria</h1>
          <div className={styles.products}>
            {jewelery.map((prod) => (
              <Card prod={prod} key={prod.id} />
            ))}
          </div>

        </div>
      }


    </div>
  );
}
