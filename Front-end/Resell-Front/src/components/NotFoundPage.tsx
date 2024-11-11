import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#2e1a47' }}>
      <h1 style={{ fontSize: '4rem', color: 'white' }}>404</h1>
      <h2 style={{ fontSize: '2rem', color: 'white' }}><b>Pagina non trovata</b><i className="bi bi-emoji-frown" style={{marginLeft:'5px'}}></i></h2>
      
      <p style={{ fontSize: '1.25rem', color: 'white' }}>
        <b>La pagina che stai cercando non esiste. Torna all'</b>  
        <Link to="/" style={{ color: 'white' }}><b>Inventario</b></Link>.
      </p>
    </div>
  );
};

export default NotFound;