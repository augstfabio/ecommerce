import styles from './Footer.module.css'
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <div className={styles.container}>
            <footer className={styles.footer}>
                <h4 className={styles.logo}>E-Compras</h4>
                <div className={styles.containerLocal}>
                    <h5>Localizaçao</h5>
                    <p> 21 Jump st - New York</p>
                    <p>CEP: 123987456</p>
                    <button>Localizar</button>
                </div>
                <div className={styles.containerContato}>
                    <h5>Contato</h5>
                    <p> Telefone: 4002-8922</p>
                    <p>Email: adm@gmail.com</p>
                    <button>Enviar email</button>
                </div>
                <div className={styles.containerRedesSociais}>
                    <h5>Redes Sociais</h5>
                    <ul>
                        <li><FaFacebook /></li>
                        <li><FaInstagram /></li>
                        <li><FaTwitter /></li>
                    </ul>
                    <button>Termos</button>
                </div>
            </footer>
            <p className={styles.copy}>&copy; 2024 E-Compras. Todos os direitos reservados.</p>
        </div>

    )
}
