import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import Sidebar from "./Sidebar.tsx";

interface Sneaker {
    id: number;
    imageUrl: string;
    modello: string;
    dataAcquisto: Date;
    prezzoAcquisto: number;
    dataVendita: Date;
    prezzoVendita: number;
  }

function Sneakers() {
    const [sneakers, setSneakers] = useState<Sneaker[]>([])


    useEffect(() => {
        getSneakers();
      }, []);
    
      const getSneakers = async () => {
        try {
            const url = 'http://localhost:3000/sneakers';
            const response = await fetch(url);
            const data = await response.json();
            // Converti le date da stringhe a oggetti Date
            const sneakersWithDates = data.map((sneaker: Sneaker) => ({
                ...sneaker,
                dataAcquisto:  new Date(sneaker.dataAcquisto), // Converti in Date
                dataVendita: sneaker.dataVendita? new Date(sneaker.dataVendita): null// Converti in Date
            }));
            setSneakers(sneakersWithDates);
        } catch (error) {
            console.error('Errore durante il recupero delle sneakers:', error);
        }
    };

    const earned = (sneakers: Sneaker[]): number => {
      return sneakers
        .filter(sneaker => sneaker.prezzoVendita !== null) // Considera solo le sneakers vendute
        .reduce((total, sneaker) => {
          return total + (sneaker.prezzoVendita! - sneaker.prezzoAcquisto); // Calcola il guadagno
        }, 0); // Il valore iniziale del guadagno è 0
    };

    const unSold = (sneakers: Sneaker[]): number => {
      return sneakers
        .filter((sneaker) => sneaker.dataVendita === null)
        .reduce((total, sneaker) => {
          return total + sneaker.prezzoAcquisto;
        }, 0);
    };
  
    return  (
      <div className="d-flex" >
        <Sidebar /> {/* Aggiungi la sidebar qui */}
        <div style={{ color: "white", padding: "20px", marginLeft: "70px", flexGrow: '1' }}> 
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex">
            <div>
              <h1>Sneakers manager</h1>
              <p className="mb-0">
                <b>Gestisci il tuo inventario di sneakers.</b>
                <br />
                <b>Aggiungi i tuoi prodotti e tieni traccia del tuo business!</b>
              </p>
            </div>
  
            {/* Bottoni di azione */}
            <div style={{ marginLeft: '130px' }}>
              <button className="btn caricaSneakers">
                Carica Sneaker <i className="bi bi-plus-circle"></i>
              </button>
  
              {/* Barra di ricerca */}
              <div className="w-40 mt-4">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cerca per parola chiave..."
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
              </div>
            </div>
  
            <div style={{ marginLeft: '130px' }} className="mt-5">
            <span style={{ fontSize: '23px' }}>
               <b>Totale guadagnato:</b> 
          <span className={`badge ${earned(sneakers) > 0 ? 'bg-success' : 'bg-danger' }`} style={{ marginLeft: '5px', padding: '10px' }}>
            {`€ ${earned(sneakers)}`}
          </span>
        </span>

        <span style={{ marginLeft: '130px', fontSize: '23px' }}>
          <b>Totale non venduto:</b>
          <span className="badge bg-secondary" style={{ marginLeft: '5px', padding: '10px' }}>
            {`€ ${unSold(sneakers)}`}
          </span>
        </span>
            </div>
          </div>
  {/*
          <div>
            <button className="btn btn-secondary">Esporta Liste</button>
          </div>*/}
        </div>


  {/* Tabella delle sneakers */}
  <table className="table table-hover table-responsive">
    <thead className="table-dark">
      <tr>
        <th>Immagine</th>
        <th>Modello</th>
        <th>Data Acquisto</th>
        <th>Prezzo Acquisto</th>
        <th>Data Vendita</th>
        <th>Prezzo Vendita</th>
        <th className="text-center">Azioni</th>
      </tr>
    </thead>
    <tbody>
      {sneakers.map((sneaker) => (
        <tr key={sneaker.id}>
          <td>
            <img
              src={`http://localhost:3000/${sneaker.imageUrl}`}
              alt={sneaker.modello}
              className="img-fluid"
              style={{ maxWidth: "65px", maxHeight: "50px" }}
            />
          </td>
          <td>{sneaker.modello}</td>
          <td>{new Date(sneaker.dataAcquisto).toLocaleDateString()}</td>
          <td>{sneaker.prezzoAcquisto}</td>
          <td>{sneaker.dataVendita ? new Date(sneaker.dataVendita).toLocaleDateString() : 'N/D'}</td>
          <td>{sneaker.prezzoVendita ? sneaker.prezzoVendita : 'N/D'}</td>
          
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <button className="btn btn-success me-2">
                <i className="bi bi-pencil-square"></i>
              </button>
              <button className="btn btn-danger">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>
    );
}      

export default Sneakers;