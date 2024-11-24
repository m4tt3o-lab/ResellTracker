import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import Sidebar from "./Sidebar.tsx";
import SneakersModal from "../ModalSneakers/CreatEditModal.tsx";
import ConfirmDeleteSneakerModal from "../ModalSneakers/SneakerDeleteModal.tsx";

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
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchModello, setSearchModello] = useState<string>("");
    const [SneakerToDelete, setSneakerToDelete] = useState<Sneaker | null>(null);
    const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);

    useEffect(() => {
        getSneakers();
      }, []);
    
      const getSneakers = async () => {
        try {
            const url = 'http://localhost:3000/sneakers';
            const response = await fetch(url);
            const data = await response.json();
            
            // Aggiungiamo le date come oggetti Date
            const sneakersWithDates = data.map((sneaker: Sneaker) => ({ 
                ...sneaker,
                dataAcquisto: new Date(sneaker.dataAcquisto), 
                dataVendita: sneaker.dataVendita ? new Date(sneaker.dataVendita) : null
            }));
            
            // Ordinamento sneakers in base alla presenza o meno di data vendute
            sneakersWithDates.sort((a:any, b:any) => {
                if (a.dataVendita === null && b.dataVendita !== null) return -1; 
                if (a.dataVendita !== null && b.dataVendita === null) return 1; 
                return 0; 
            });
    
            setSneakers(sneakersWithDates);
        } catch (error) {
            console.error('Errore durante il recupero delle sneakers:', error);
        }
    };
    
    
    const filterSneakers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sneakers?modello=${searchModello}`);
        const data = await response.json();
        setSneakers(data);
      } catch (error) {
        console.error('Errore durante la ricerca delle sneakers:', error);
      }
    };
  
    // debounce per la ricerca
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        if (searchModello) {
          filterSneakers(); 
        } else {
          getSneakers();
        }
      }, 300); 
  
      return () => clearTimeout(delayDebounce);
    }, [searchModello]);


    const earned = (sneakers: Sneaker[]): number => {
      return sneakers
        .filter(sneaker => sneaker.prezzoVendita !== null) 
        .reduce((total, sneaker) => {
          return total + (sneaker.prezzoVendita! - sneaker.prezzoAcquisto); 
        }, 0); 
    };

    const unSold = (sneakers: Sneaker[]): number => {
      return sneakers
        .filter((sneaker) => sneaker.dataVendita === null)
        .reduce((total, sneaker) => {
          return total + sneaker.prezzoAcquisto;
        }, 0);
    };

    const sold = (sneakers: Sneaker[]): number => {
      return sneakers
      .filter((sneaker) => sneaker.dataVendita!== null)
        .reduce((total) => {
          return total +=1;
        }, 0);
    }

    const removeSneaker = async (id:number) => {
      const url = `http://localhost:3000/sneakers/${id}`;
  
      try {
        const response = await fetch(url, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setSneakers((prevSneakers) => prevSneakers.filter((sneaker:Sneaker) => sneaker.id !== id));
        } 
      } catch (error) {
        console.error('Errore durante la richiesta di cancellazione del utente:', error);
      }
    };

    const handleSaveSneaker = () => {
      setShowAddModal(false);
      getSneakers(); 
    };
  
    const handleSaveEdit = () => {
      setShowEditModal(false);
      getSneakers(); 
    };
  
    const handleOpenAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);
  
    const handleOpenEditModal = (sneaker: Sneaker) => {
      setSelectedSneaker(sneaker); 
      setShowEditModal(true);
  };
    const handleCloseEditModal = () => setShowEditModal(false);
    
    const handleOpenDeleteModal = (sneaker:Sneaker) => {
      setSneakerToDelete(sneaker);
      setShowDeleteModal(true);
    };
  
    const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
      setSneakerToDelete(null);
    };
  
  
    return (
      <div className="d-flex">
        <Sidebar />
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
                <button className="btn caricaSneakers" title="Aggiungi" onClick={handleOpenAddModal}>
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
                      onChange={(e) => setSearchModello(e.target.value)}
                    />
                  </div>
                </div>
              </div>
    
              {/* Totali */}
              <div style={{ marginLeft: '130px' }} className="mt-5 d-flex">
                <div className="me-4" style={{ fontSize: '23px' }}>
                  <b>Totale guadagnato:</b>
                  <span
                    className={`badge ${earned(sneakers) >= 0 ? 'bg-success' : 'bg-danger'}`}
                    style={{ marginLeft: '5px', padding: '10px' }}
                  >
                    {`€ ${earned(sneakers)}`}
                  </span>
                </div>
    
                <div className="me-4" style={{ fontSize: '23px' }}>
                  <b>Totale non venduto:</b>
                  <span
                    className="badge bg-secondary"
                    style={{ marginLeft: '5px', padding: '10px' }}
                  >
                    {`€ ${unSold(sneakers)}`}
                  </span>
                </div>
    
                <div style={{ fontSize: '23px' }}>
                  <b>Sneakers vendute:</b>
                  <span
                    className="badge bg-secondary"
                    style={{ marginLeft: '5px', padding: '10px' }}
                  >
                    {`(${sold(sneakers)})`}
                  </span>
                </div>
              </div>
            </div>
          </div>
    
          {/* Tabella */}
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
                  <td>{`€ ${sneaker.prezzoAcquisto}`}</td>
                  <td>{sneaker.dataVendita ? new Date(sneaker.dataVendita).toLocaleDateString() : 'N/D'}</td>
                  <td>{sneaker.prezzoVendita ? `€ ${sneaker.prezzoVendita}` : 'N/D'}</td>
                  
                  <td className="text-center">
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-success me-2" title="Modifica" onClick={() => handleOpenEditModal(sneaker)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn btn-danger" title="Cancella" onClick={() =>handleOpenDeleteModal(sneaker)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ConfirmDeleteSneakerModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={() => {
        if (SneakerToDelete) {
            removeSneaker(SneakerToDelete.id);
            setSneakerToDelete(null);
            handleCloseDeleteModal(); 
        }
    }}
    sneaker={SneakerToDelete || {} as Sneaker} 
/>

          <SneakersModal
            showModal={showAddModal || showEditModal}
            onClose={showEditModal ? handleCloseEditModal : handleCloseAddModal}
            onSave={showEditModal ? handleSaveEdit : handleSaveSneaker}
            actionType={showEditModal ? 'edit' : 'add'}
            sneakers={selectedSneaker}
          />
        </div>
      </div>
    )};
    
    export default Sneakers;
    

    