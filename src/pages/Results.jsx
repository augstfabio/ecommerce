import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import styles from './Results.module.css'
import Card from '../components/Card';
import { BiSort } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
export default function Results() {
    const location = useLocation();
    const { data, load, erro } = useFetch({ limit: 20 });
    const [sortMenu, setSortMenu] = useState(false)
    const [result, setResult] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get('q');
        if (q) {
            const filteredProducts = data.filter(product =>
                product.title.toLowerCase().includes(q.toLowerCase())
            );
            setResult(filteredProducts);
            setError(erro);
            setLoading(load);
        }
    }, [location, data, erro, load]);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={styles.result}>
            {sortMenu ?
                <div className={styles.sortResponsive}>

                    <div className={styles.sortCategory}>
                        <div className={styles.firstLine}><span></span><h3>Categoria</h3> <button onClick={() => setSortMenu(!sortMenu)} className={styles.closeSortMenu}><IoMdClose /></button></div>
                        <ul>
                            <li>
                                <input type="checkbox" name="all" id="all" />
                                <p>1. Todos</p>
                            </li>
                            <li>
                                <input type="checkbox" name="clothes" id="clothes" />
                                <p>2. Roupas</p>
                            </li>
                            <li>
                                <input type="checkbox" name="electronic" id="electronic" />
                                <p>3. Eletronicos</p>
                            </li>
                            <li>
                                <input type="checkbox" name="clothes" id="clothes" />
                                <p>4. Joias</p>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className={styles.sortCategory}>
                        <h3>Preço</h3>
                        <ul>
                            <li>
                                <input type="checkbox" name="all" id="all" />
                                <p>1. Todos</p>
                            </li>
                            <li>
                                <input type="checkbox" name="hundred" id="hundred" />
                                <p>2. R$ 0 - R$ 100</p>
                            </li>
                            <li>
                                <input type="checkbox" name="twoHundred" id="twoHundred" />
                                <p>3. R$ 1500 - R$ 200</p>
                            </li>
                            <li>
                                <input type="checkbox" name="aboveTwo" id="aboveTwo" />
                                <p>4. R$ 200+</p>
                            </li>
                        </ul>
                    </div>
                </div>
                :
                <div onClick={() => setSortMenu(!sortMenu)} className={styles.sortButton}>
                    <BiSort />
                    <span>Filtrar</span>
                </div>
            }

            <div className={windowWidth < 1200 ? `${styles.inactive}` : `${styles.sort}`}>
                <div className={styles.sortCategory}>
                    <h3>Categoria</h3>
                    <ul>
                        <li>
                            <input type="checkbox" name="all" id="all" />
                            <p>1. Todos</p>
                        </li>
                        <li>
                            <input type="checkbox" name="clothes" id="clothes" />
                            <p>2. Roupas</p>
                        </li>
                        <li>
                            <input type="checkbox" name="electronic" id="electronic" />
                            <p>3. Eletronicos</p>
                        </li>
                        <li>
                            <input type="checkbox" name="clothes" id="clothes" />
                            <p>4. Joias</p>
                        </li>
                    </ul>
                </div>
                <hr />
                <div className={styles.sortCategory}>
                    <h3>Preço</h3>
                    <ul>
                        <li>
                            <input type="checkbox" name="all" id="all" />
                            <p>1. Todos</p>
                        </li>
                        <li>
                            <input type="checkbox" name="hundred" id="hundred" />
                            <p>2. R$ 0 - R$ 100</p>
                        </li>
                        <li>
                            <input type="checkbox" name="twoHundred" id="twoHundred" />
                            <p>3. R$ 1500 - R$ 200</p>
                        </li>
                        <li>
                            <input type="checkbox" name="aboveTwo" id="aboveTwo" />
                            <p>4. R$ 200+</p>
                        </li>
                    </ul>
                </div>
            </div>


            <div className={styles.productsContainer}>
                <h1>Resultados:</h1>
                {result.length <= 0 && <div className={styles.placeHolder}>
                    <h2>... Nenhum produto encontrado</h2>
                    <p>Experimente digitar em ingles</p>
                </div>}

                <div className={styles.products}>
                    {result && result.map((prod) => (
                        <Card prod={prod} key={prod.id} />
                    ))}

                </div>

            </div>
        </div>
    )
}
