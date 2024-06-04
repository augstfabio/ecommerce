import styles from './Contact.module.css';
import svg from '../assets/contactsvg.svg';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [msg, setMsg] = useState('')

  const handleEnviado = (e) => {
    e.preventDefault();
    setEnviado(!enviado);
    setNome('')
    setMsg('')
    setSobrenome('')
  };

  useEffect(() => {
    const simularEnvio = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
    };
    if (enviado) {
      simularEnvio();
    }
  }, [enviado]);

  return (
    <div className={styles.contact}>
      <div className={styles.contactContainer}>
        <div className={styles.svg}>
          <img src={svg} alt="Svg icon" />
        </div>
        <form onSubmit={(e) => handleEnviado(e)} className={styles.form}>
          <h1>Fale conosco</h1>
          <label>
            <span>Nome:</span>
            <input id='nome' name='nome' required onChange={(e)=>setNome(e.target.value)} value={nome} type="text" placeholder="Digite seu nome" />
          </label>
          <label>
            <span>Sobrenome:</span>
            <input id='sobrenome' name='sobrenome' required onChange={(e)=>setSobrenome(e.target.value)} value={sobrenome}  type="text" placeholder="Digite seu sobrenome" />
          </label>
          <label>
            <span>Mensagem</span>
            <textarea id='mensagem' name='mensagem' required onChange={(e)=>setMsg(e.target.value)} value={msg} id="textarea"></textarea>
          </label>
          <button className={styles.button} type="submit">
            Enviar mensagem
          </button>
          {loading && <p className={styles.popup}>Mensagem enviada! (confia)</p>}
        </form>
      </div>
    </div>
  );
}
