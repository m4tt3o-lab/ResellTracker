import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


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
                dataAcquisto: new Date(sneaker.dataAcquisto), // Converti in Date
                dataVendita: new Date(sneaker.dataVendita), // Converti in Date
            }));
            setSneakers(sneakersWithDates);
        } catch (error) {
            console.error('Errore durante il recupero delle sneakers:', error);
        }
    };


    return(
        <table className="table table-hover">
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
              <td><img 
                  src={`http://localhost:3000/${sneaker.imageUrl}`} 
                  alt={sneaker.modello} 
                  className="img-fluid" 
                  style={{ maxWidth: '100px', maxHeight: '100px' }} 
                />
                </td>
                <td>{sneaker.modello}</td>
              <td>{sneaker.dataAcquisto.toLocaleDateString()}</td>
              <td>{(sneaker.prezzoAcquisto)}</td>
              <td>{sneaker.dataVendita.toLocaleDateString()}</td>
              <td>{sneaker.prezzoVendita}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-success me-2" >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button className="btn btn-danger" >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default Sneakers