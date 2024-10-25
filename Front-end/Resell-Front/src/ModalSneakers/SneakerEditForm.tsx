import { useState, useEffect } from "react";

interface SneakerData {
  id?: number; 
  modello: string;
  dataAcquisto: Date;
  prezzoAcquisto: number;
  dataVendita?: Date; 
  prezzoVendita?: number; 
}

interface SneakerEditFormProps {
  sneakers: SneakerData ;
  onSave: (data: SneakerData) => void;
}

function SneakerEditForm({ sneakers, onSave }: SneakerEditFormProps) {
  const [modello, setModello] = useState('');
  const [dataAcquisto, setDataAcquisto] = useState('');
  const [prezzoAcquisto, setPrezzoAcquisto] = useState<number>(0);
  const [dataVendita, setDataVendita] = useState('');
  const [prezzoVendita, setPrezzoVendita] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (sneakers) {
      setModello(sneakers.modello);
      setDataAcquisto(sneakers.dataAcquisto.toISOString().split('T')[0]); 
      setPrezzoAcquisto(sneakers.prezzoAcquisto);
      setDataVendita(sneakers.dataVendita ? sneakers.dataVendita.toISOString().split('T')[0] : ''); 
      setPrezzoVendita(sneakers.prezzoVendita);
    }
  }, [sneakers]);

  const handleSneakerPatch = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `http://localhost:3000/sneakers/${sneakers.id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modello,
          dataAcquisto: new Date(dataAcquisto), 
          prezzoAcquisto,
          dataVendita: dataVendita ? new Date(dataVendita) : undefined, 
          prezzoVendita: prezzoVendita || undefined 
        }),
      });

      if (response.ok) {
        onSave({
          ...sneakers,
          modello,
          dataAcquisto: new Date(dataAcquisto), 
          prezzoAcquisto,
          dataVendita: dataVendita ? new Date(dataVendita) : undefined,
          prezzoVendita: prezzoVendita || undefined,
        });
        resetForm();
      } else {
        console.error("Modifica fallita.");
      }
    } catch (error) {
      console.error("Errore durante la richiesta di modifica:", error);
    }
  };

  const resetForm = () => {
    setModello('');
    setDataAcquisto('');
    setPrezzoAcquisto(0);
    setDataVendita('');
    setPrezzoVendita(undefined); 
  };

  return (
    <form onSubmit={handleSneakerPatch} className="p-3" style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: "5px" }}>
      <div className="mb-3">
        <label htmlFor="modello" className="form-label" style={{ color: "#343a40" }}>Modello</label>
        <input
          type="text"
          className="form-control"
          id="modello"
          value={modello}
          onChange={(e) => setModello(e.target.value)}
          required
          style={{ borderColor: "#6c757d", backgroundColor: "#e9ecef" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dataAcquisto" className="form-label" style={{ color: "#343a40" }}>Data Acquisto</label>
        <input
          type="date"
          className="form-control"
          id="dataAcquisto"
          value={dataAcquisto}
          onChange={(e) => setDataAcquisto(e.target.value)}
          required
          style={{ borderColor: "#6c757d", backgroundColor: "#e9ecef" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="prezzoAcquisto" className="form-label" style={{ color: "#343a40" }}>Prezzo Acquisto</label>
        <input
          type="number"
          className="form-control"
          id="prezzoAcquisto"
          value={prezzoAcquisto}
          onChange={(e) => setPrezzoAcquisto(Number(e.target.value))}
          required
          style={{ borderColor: "#6c757d", backgroundColor: "#e9ecef" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dataVendita" className="form-label" style={{ color: "#343a40" }}>Data Vendita (opzionale)</label>
        <input
          type="date"
          className="form-control"
          id="dataVendita"
          value={dataVendita}
          onChange={(e) => setDataVendita(e.target.value)}
          style={{ borderColor: "#6c757d", backgroundColor: "#e9ecef" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="prezzoVendita" className="form-label" style={{ color: "#343a40" }}>Prezzo Vendita (opzionale)</label>
        <input
          type="number"
          className="form-control"
          id="prezzoVendita"
          value={prezzoVendita || ''} 
          onChange={(e) => setPrezzoVendita(e.target.value ? Number(e.target.value) : undefined)}
          style={{ borderColor: "#6c757d", backgroundColor: "#e9ecef" }}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-dark" style={{ marginRight: "10px" }}>
          Modifica Sneaker
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default SneakerEditForm;
