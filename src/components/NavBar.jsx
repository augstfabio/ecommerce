import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsBagFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

import styles from './NavBar.module.css';
import { useCart } from '../context/ItemsContext';

export default function NavBar() {
    const [menu, setMenu] = useState(false)
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const { cartItems } = useCart();
    const qtd = cartItems.length;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/results?q=${query}`);
    };
    const handleSetShowMenu = () => {
        setMenu(!menu)
    }

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
        <nav className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.logoContainer}>
                    <Link to='/'><h1>E-Compras</h1></Link>
                </div>
                <div className={styles.navigationContainer}>
                    {windowWidth <= 1500 ?
                        <div className={styles.menu}>
                            <span  onClick={handleSetShowMenu} className={styles.menuIcon}><MdOutlineMenu /></span>
                            {menu &&
                                <div className={styles.ulContainer}>
                                    <ul className={styles.responsiveUl}>
                                        <li onClick={handleSetShowMenu}><Link to='/'>Inicio</Link></li>
                                        <li onClick={handleSetShowMenu}><Link to='/clothes'>Roupas</Link></li>
                                        <li onClick={handleSetShowMenu}><Link to='/electronics'>Eletronicos</Link></li>
                                        <li onClick={handleSetShowMenu}><Link to='/jewelery'>Bijuteria</Link></li>
                                        <li onClick={handleSetShowMenu}> <Link to='/about'>Sobre</Link></li>
                                        <li onClick={handleSetShowMenu}> <Link to='/contact'>Contato</Link   ></li>

                                    </ul>
                                    <span onClick={handleSetShowMenu} ><IoIosCloseCircleOutline /></span>
                                </div>

                            }

                        </div> :
                        <ul>
                            <Link to='/'>Inicio</Link>
                            <Link to='/clothes'>Roupas</Link>
                            <Link to='/electronics'>Eletronicos</Link>
                            <Link to='/jewelery'>Bijuteria</Link>
                            <Link to='/about'>Sobre</Link>
                            <Link to='/contact'>Contato</Link>
                        </ul>
                    }

                    <Link to='/bag' className={styles.bagContainer}>
                        <BsBagFill />
                        {qtd === 0 ? '' : <span>{qtd}</span>}
                    </Link>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <form onSubmit={(e) => handleSubmit(e)} className={styles.inputContainer}>
                    <div><input onChange={(e) => setQuery(e.target.value)} value={query} className={styles.input} type="text" placeholder='Econtrar produtos' /></div>
                    <button className={styles.submit} type="submit">{<FaSearch />}</button>
                </form>
            </div>
        </nav>
    );
}