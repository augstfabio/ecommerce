import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import styles from './Product.module.css';
import { useParams } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/ItemsContext';
import { FaHeart } from "react-icons/fa";

export default function Product() {
    const navigate = useNavigate();
    const { addItem, rmItem, cartItems } = useCart();
    const { id: end } = useParams();
    const { data, loading } = useFetch({ id: end });
    const [similar, setSimilar] = useState([]);
    const [fav, setFav] = useState(false);


    useEffect(() => {
        const throwSimilar = async () => {
            const res = await fetch(`https://fakestoreapi.com/products/category/${data.category}?limit=4`);
            const json = await res.json();
            setSimilar(json);
        }
        throwSimilar();
    }, [data]);

    const alreadyInCart = (productId) => {
        const existingItem = cartItems.find(item => item.productId === productId);
        return existingItem;
    }

    const handleRedirect = (id) => {
        navigate(`/product/${id}`);
        window.location.reload();
        window.scrollTo(0, 0);
    }
    const handleRedirectBag = () => {
        navigate(`/bag`);
        window.scrollTo(0, 0);
    }
    const handleFav = ()=>{
        setFav(!fav)
    }
   

    return (
        <div className={styles.product}>
            <div className={styles.container}>
                <div className={styles.content}>
                    {!loading ? (
                        <div className={styles.infoProduct}>
                            <h1>{data.title}</h1>
                            <div className={styles.aboutProduct}>
                                <img src={data.image} alt={data.title} />
                                <div className={styles.pricing}>
                                    <h2>R$ {data.price}</h2>
                                    <p>{loading ? '' : 'À vista no pix'}</p>
                                    <div className={styles.aboutBtns}>
                                        {alreadyInCart(data.id) ? <button onClick={() => rmItem(data)} className={styles.removeCart}>Remover do carrinho</button> : <button onClick={()=>addItem(data)}>Adicionar ao carrinho</button>}
                                        {
                                            fav ? (<div onClick={handleFav} className={styles.heartFav}><FaHeart /></div>):(<div onClick={handleFav} className={styles.heart}><FaRegHeart /></div>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <p>{data.description && data.description}</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.infoProductSkeleton}>
                            <span></span>
                            <div className={styles.aboutProductSkeleton}>
                                <span ></span>
                                <div className={styles.pricingSkeleton}>
                                    <div className={styles.priceSkeleton}></div>
                                    <div className={styles.aboutBtnsSkeleton}></div>
                                </div>
                            </div>
                            <div className={styles.descriptionSkeleton}></div>
                        </div>
                    )}

                    {similar && <div className={styles.similar}>
                        <h3>Você também pode gostar</h3>
                        <div className={styles.rel}>
                            {similar.map((prod) => (
                                <div className={styles.similarCard} key={prod.id}>
                                    <img src={prod.image} alt={prod.title} />
                                    <p className={styles.redirect} onClick={() => handleRedirect(prod.id)}>{prod.title.slice(0, 9)}</p>
                                    <p>R$ {prod.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    }

                </div>
                <div className={styles.finally}>
                    <div className={styles.finallyContainer}>
                        
                        
                        <div className={styles.finalizarCompra}>
                            <h4>Finalizar Compra</h4>
                            <hr />
                            <div className={styles.total}>
                                <p>Total:</p>
                                <p>R$ {data.price}</p>
                            </div>
                            <button>Finalizar compra</button>
                            <button onClick={handleRedirectBag} className={styles.goBag}>Ir para a sacola</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
