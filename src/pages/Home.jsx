import Card from '../components/Card'
import styles from './Home.module.css'
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Home() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { data: roupas, loading: roupasLoading, error: roupasError } = useFetch({limit: 4})
    const { data:electronics, loading: electronicsLoading, error: electronicsError } = useFetch({ limit:4, category:'electronics'})
    const { data:biju,loading: bijuLoading, error: bijuError } = useFetch( {limit: 4, category: 'jewelery'})
    
    useEffect(()=>{
        const isLoading = ()=>{
            if (roupasLoading && electronicsLoading && bijuLoading){
                setLoading(true)
            } else{
                setLoading(false)
            }
        }
        isLoading()
    },[roupasLoading, electronicsLoading, bijuLoading])
    
    const handleRedirect = (category)=>{
        navigate(`/${category}`);
        window.scrollTo(0, 0);
    }
    return (
        <div className={styles.home}>
            <div className={styles.category}>
                <h2>Roupas e Acessórios</h2>
                {loading && (
                    <div className={styles.skeleton}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
                <div className={styles.products}>
                    {roupas.map((prod) => (
                        <Card prod={prod} key={prod.id} />
                    ))}
                </div>
                <div className={styles.more}>
                    <button onClick={()=>handleRedirect('clothes')}>Ver mais</button>
                </div>
            </div>
            <div className={styles.category}>
                <h2>Eletronicos</h2>
                {loading && (
                    <div className={styles.skeleton}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
                <div className={styles.products}>
                    {electronics.map((prod) => (
                        <Card prod={prod} key={prod.id} />
                    ))}
                </div>
                <div className={styles.more}>
                    <button onClick={()=>handleRedirect('electronics')}>Ver mais</button>
                </div>
            </div>
            <div className={styles.category}>
                <h2>Bijuterias</h2>
                {loading && (
                    <div className={styles.skeleton}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
                <div className={styles.products}>
                    {biju.map((prod) => (
                        <Card prod={prod} key={prod.id} />
                    ))}
                </div>
                <div className={styles.more}>
                    <button onClick={()=>handleRedirect('jewelery')}>Ver mais</button>
                </div>
            </div>

        </div>
    )
}
