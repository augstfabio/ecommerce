import styles from './Electronics.module.css'
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Electronics() {
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data, loading: fetchLoading } = useFetch({});

  useEffect(() => {
    if (data) {
      try {
        const category = 'electronics';
        const filteredProducts = data.filter(product =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
        setElectronics(filteredProducts);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.electronics}>
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
        <div className={styles.electronicsContainer}>
          <h1>Eletronicos</h1>
          <div className={styles.products}>
            {electronics.map((prod) => (
              <Card prod={prod} key={prod.id} />
            ))}
          </div>

        </div>

      }

    </div>
  );
}
