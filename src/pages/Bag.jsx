import styles from './Bag.module.css'
import { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/ItemsContext';

export default function Bag() {
    const [lsItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [total, setTotal] = useState()
    const navigate = useNavigate();

    const { rmItem, setAllData, rmQtd, addQtd, dataCartItems: cartItems, cartItems: cartItemsInfo } = useCart()

    const handleBackHome = () => {
        navigate('/');
        window.scrollTo(0, 0);
    }


    return (
        <div className={styles.bag}>
            <div className={styles.responsiveBagContainer}>
                <h3>Sua sacola</h3>
                {cartItems.length <= 0 &&
                    <div className={styles.placeHolder}>
                        <h2>Sua sacola está vazia</h2>
                    </div>
                }
                <div className={styles.responsiveProducts}>
                    {cartItems && cartItems.map((item) => (
                        <div key={item.id} className={styles.prodItems}>
                            <div className={styles.responsiveDescription}>
                                <img src={item.image} alt={item.title} />
                                <span>
                                    <h1>{item.title}</h1>
                                    <p>R$ {item.price}</p>
                                </span>

                            </div>
                            <div className={styles.responsivePricing}>

                                <p>Quantidade:</p>
                                <div className={styles.ResponsiveQtdBtns}>
                                    <button onClick={() => rmQtd(item)} className={styles.qtdEdit}>-</button>
                                    {cartItemsInfo.find(lsItem => lsItem.productId === item.id)?.quantity || 0}
                                    <button onClick={() => addQtd(item)} className={styles.qtdEdit}>+</button>

                                </div>
                                <p>R$ {item.price * (cartItemsInfo.find(product => product.productId === item.id)?.quantity || 0)}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
                <div className={styles.totalContainer}>
                    <div className={styles.total}>
                        <h1>Resumo</h1>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td className={styles.pricing}>R$
                                        {cartItems.reduce((total, item) => {
                                            const productInfo = cartItemsInfo.find(prod => prod.productId === item.id);
                                            if (productInfo) {
                                                return total + (productInfo.quantity * item.price);
                                            }
                                        }, 0)}</td>
                                </tr>

                                <tr>
                                    <td>Frete:</td>

                                    <td className={styles.pricing}>R$15.50</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>

                                    <td className={styles.pricing}>R$
                                        {cartItems.reduce((total, item) => {
                                            const productInfo = cartItemsInfo.find(prod => prod.productId === item.id);
                                            if (productInfo) {
                                                return total + (productInfo.quantity * item.price) + 15.50;
                                            }
                                        }, 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className={styles.finalizar}>Finalizar Compra</button>
                    </div>

                </div>
            </div>
            <div className={styles.bagContainer}>
                <div className={styles.products}>
                    <h1>Sua sacola</h1>
                    {cartItems.length <= 0 &&
                        <div className={styles.placeHolder}>
                            <h2>Sua sacola está vazia</h2>
                        </div>
                    }
                    {
                        !cartItems.length <= 0 &&
                        <div className={styles.productsList}>
                            <table className={styles.table}>
                                <thead className={styles.tInfo}>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Preço</th>
                                        <th>Quantidade</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className={styles.tdImage}>
                                                {<Link to={`/product/${item.id}`}><h2>{item.title}</h2></Link>}
                                                <img src={item.image} alt="produto" />
                                            </td>

                                            <td id={styles.price} className={styles.tInfo}>R$ {item.price}</td>

                                            <td className={styles.tInfo}>
                                                <div id={styles.qtdCtrl}>
                                                    <button onClick={() => rmQtd(item)} className={styles.qtdEdit}>-</button>
                                                    {cartItemsInfo.find(lsItem => lsItem.productId === item.id)?.quantity || 0}
                                                    <button onClick={() => addQtd(item)} className={styles.qtdEdit}>+</button>
                                                </div>

                                            </td>
                                            <td id={styles.subtotalProd} className={styles.tInfo}>R$ {item.price * (cartItemsInfo.find(product => product.productId === item.id)?.quantity || 0)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    }

                    <button onClick={() => handleBackHome()} className={styles.backBtn}>Pagina home</button>
                </div>
                <div className={styles.totalContainer}>
                    <div className={styles.total}>
                        <h1>Resumo</h1>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Subtotal:</td>
                                    <td className={styles.pricing}>R$
                                        {cartItems.reduce((total, item) => {
                                            const productInfo = cartItemsInfo.find(prod => prod.productId === item.id);
                                            if (productInfo) {
                                                return total + (productInfo.quantity * item.price);
                                            }
                                        }, 0)}</td>
                                </tr>

                                <tr>
                                    <td>Frete:</td>

                                    <td className={styles.pricing}>R$15.50</td>
                                </tr>
                                <tr>
                                    <td>Total:</td>

                                    <td className={styles.pricing}>R$
                                        {cartItems.reduce((total, item) => {
                                            const productInfo = cartItemsInfo.find(prod => prod.productId === item.id);
                                            if (productInfo) {
                                                return total + (productInfo.quantity * item.price) + 15.50;
                                            }
                                        }, 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className={styles.finalizar}>Finalizar Compra</button>
                    </div>

                </div>
            </div>
        </div>
    )
}