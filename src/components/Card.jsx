import styles from './Card.module.css'
import { Link } from 'react-router-dom'

import { MdStarRate } from "react-icons/md";
export default function Card({ prod }) {
  const url = `/product/${prod.id}`
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  }
  if (!prod) {
    return null;
  }
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={prod.image} alt="produto" />
      </div>
      <div className={styles.name}>
        <Link to={url}><p onClick={() => handleScrollToTop()}>{prod.title}</p></Link>
      </div>
      <div className={styles.rate}>
        <div className={styles.stars}><span><MdStarRate /> </span>{(prod.rating.rate)}</div>

      </div>
      <div className={styles.price}>
        <p>R$ {prod.price}</p>
      </div>
    </div>
  )
}
