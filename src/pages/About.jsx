import styles from './About.module.css'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  const handleRedirect = ()=>{
    navigate('/');
    window.scrollTo(0, 0);
      
  }

  return (
    <div className={styles.about}>
      <div className={styles.aboutContainer}>
        <div className={styles.text}>
          <h1>Sobre nós</h1>
          <h2>Ajudando você a ter estilo e os melhores produtos</h2>
          <p>o <span>E-Compras</span> é um projeto frontend desenvolvido por 
          <a href="https://github.com/augstfabio">Fabio Augusto</a> para desmontração de site de eccomerce simples
          utilizando React e a Api da <a href="https://fakestoreapi.com">FakeStoreApi</a> 
          </p>
          <button onClick={()=>handleRedirect()}>Ver Produtos</button>
        </div>
        <div className={styles.svg}>
          <img src="https://fakestoreapi.com/icons/intro.svg" alt="logo" />
        </div>
      </div>


    </div>
  )
}
