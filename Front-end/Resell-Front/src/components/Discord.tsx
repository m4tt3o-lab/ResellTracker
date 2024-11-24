import Sidebar from "./Sidebar.tsx"
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';



interface Link{
    id: number
    Url: string
    createdAt: string
}

function DiscordBot() {
    const [links, setLinks] = useState<Link[]>([])
    const [isBotOnline, setIsBotOnline] = useState(false);

    const fetchBotStatus = async () => {
          try {
            const url = 'http://localhost:3000/links/bot-status';
            const response = await fetch(url);
            const data = await response.json()
            setIsBotOnline(data.botStatus);
          } catch (error) {
            console.error("Errore nel controllo dello stato del bot:", error);
            setIsBotOnline(false);
          }
        };

    const getLinks = async () => {
        try {
            const url = 'http://localhost:3000/links';
            const response = await fetch(url);
            const data = await response.json();
            setLinks(data);
        } catch (error) {
            console.error('Errore durante il recupero dei link:', error);
        }
    };

    useEffect(() => {
      const fetchLinks = async () => {
          await fetchBotStatus();
          if (isBotOnline) {
              await getLinks();
          } else {
              setLinks([]);
          }
      };
  
      fetchLinks(); 
      const intervalId = setInterval(fetchLinks, 15000);
  
      return () => clearInterval(intervalId); // Pulisci l'intervallo al termine dell'effetto
  }, [isBotOnline]);

  
  const ClearPage = async () => {
    const url = `http://localhost:3000/links/delete-all-links`;
  
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', 
          },
        });
  
        if (response.ok) {
          getLinks()
          console.log('Tutti i link sono stati cancellati con successo.');
        } 
      } catch (error) {
        console.error('Errore durante la richiesta di cancellazione del utente:', error);
      }
    };



    return (
        <div className="d-flex">
          <Sidebar />
          <div style={{ color: "white", padding: "20px", marginLeft: "70px", flexGrow: '1' }}>
            <div className="d-flex">
              <div>
                <h1 style={{fontSize: '2.5rem'}}>Links Monitoring</h1>
                <p className="mb-0">
                  <b>Non pererti più nessuna richiesta per i tuoi articoli.</b>
                  <br />
                  <b>In questa sezione puoi facilmente accedere a discord e vendere prima degli altri!</b>
                </p>
              </div>
              <div style={{ marginLeft: '130px' }} className="mt-5 d-flex">
                <div className="me-4" style={{ fontSize: '23px' }}>
                  <span style={{fontSize:'30px'}}><b>Status BatMan</b></span>
                  <span className="ms-2" >{isBotOnline? <i className="bi bi-toggle-on" style={{fontSize:'30px'}}></i>: <i className="bi bi-toggle-off" style={{fontSize:'30px'}}></i>}</span>
                </div>
                
                <div style={{ fontSize: '23px',marginLeft: '130px' }}>
                  <button className="btn" 
                  style={{
                      color: 'white',
                      border: '2px solid white',
                      borderRadius: '50px',
                      padding: '10px 20px',
                    }}
                    onClick={ClearPage}>Pulisci pagina
                  </button>
                </div>
              </div>
                  
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Links</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <a href={link.Url} title="Click" className="link-hover" target="_blank" style={{ color: "inherit", textDecoration: "none" }}>
                          {`${link.Url}`}
                        </a>
                        <span style={{marginLeft: '20px'}}>
                                {new Date(link.createdAt).toLocaleString('it-IT', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: false,
                                }).replace(',', '')}
                       </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
      
}

export default DiscordBot