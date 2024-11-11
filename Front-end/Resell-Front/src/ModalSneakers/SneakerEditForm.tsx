import { useState, useEffect } from "react";

interface SneakerData {
  id?: number;
  modello: string;
  dataAcquisto: Date;
  prezzoAcquisto: number;
  dataVendita?: Date | null;
  prezzoVendita?: number | null;
}

interface SneakerEditFormProps {
  sneakers: SneakerData;
  onSave: (data: SneakerData) => void;
}

function SneakerEditForm({ sneakers, onSave }: SneakerEditFormProps) {
  const [modello, setModello] = useState('');
  const [dataAcquisto, setDataAcquisto] = useState('');
  const [prezzoAcquisto, setPrezzoAcquisto] = useState<number>(0);
  const [dataVendita, setDataVendita] = useState('');
  const [prezzoVendita, setPrezzoVendita] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (sneakers) {
      setModello(sneakers.modello);
      setDataAcquisto(sneakers.dataAcquisto.toISOString().split('T')[0]);
      setPrezzoAcquisto(sneakers.prezzoAcquisto);
      setDataVendita(sneakers.dataVendita ? sneakers.dataVendita.toISOString().split('T')[0] : '');
      setPrezzoVendita(sneakers.prezzoVendita|| null);
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
          dataVendita: dataVendita ? new Date(dataVendita) : null,
          prezzoVendita: prezzoVendita || null
        }),
      });

      if (response.ok) {
        onSave({
          ...sneakers,
          modello,
          dataAcquisto: new Date(dataAcquisto),
          prezzoAcquisto,
          dataVendita: dataVendita ? new Date(dataVendita) : null,
          prezzoVendita: prezzoVendita || null,
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
    setPrezzoVendita(null);
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images/search?query=${modello}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    };

    if (modello) {
      fetchModels();
    } else {
      setSuggestions([]);
      setFilteredSuggestions([]);
    }
  }, [modello]);

  const handleSuggestionClick = (suggestion: string) => {
    setModello(suggestion);
    setFilteredSuggestions([]);
    setFilteredSuggestions((prev) => prev.filter((item) => item !== suggestion));
  };

  return (
    <form onSubmit={handleSneakerPatch}>
      <div className="mb-3">
        <label htmlFor="modello" className="form-label" style={{ color: 'white' }}><b>Modello</b></label>
        <input
          type="text"
          className="form-control"
          id="modello"
          value={modello}
          onChange={(e) => {
            setModello(e.target.value);
            setFilteredSuggestions(suggestions);
          }}
          required
        />
        {filteredSuggestions.length > 0 && (
          <div className="dropdown w-100" style={{ position: 'relative', zIndex: 1000 }}>
            <ul className="list-group rounded shadow mt-1">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action px-3 py-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    borderBottom: index !== filteredSuggestions.length - 1 ? '1px solid #ddd' : 'none',
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="dataAcquisto" className="form-label" style={{ color: 'white' }}><b>Data Acquisto</b></label>
        <input
          type="date"
          className="form-control"
          id="dataAcquisto"
          value={dataAcquisto}
          onChange={(e) => setDataAcquisto(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="prezzoAcquisto" className="form-label" style={{ color: 'white' }}><b>Prezzo Acquisto</b></label>
        <input
          type="number"
          className="form-control"
          id="prezzoAcquisto"
          value={prezzoAcquisto}
          onChange={(e) => setPrezzoAcquisto(Number(e.target.value))}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dataVendita" className="form-label" style={{ color: 'white' }}><b>Data Vendita</b></label>
        <input
          type="date"
          className="form-control"
          id="dataVendita"
          value={dataVendita}
          onChange={(e) => setDataVendita(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="prezzoVendita" className="form-label" style={{ color: 'white' }}><b>Prezzo Vendita</b></label>
        <input
          type="number"
          className="form-control"
          id="prezzoVendita"
          value={prezzoVendita || ''}
          onChange={(e) => setPrezzoVendita(e.target.value ? Number(e.target.value) : null)}
          placeholder='Prezzo vendita ...'
        />
      </div>
      <div className="d-flex justify-content-start">
        <button type="submit" className="btn" style={{
          color: 'white',
          border: '2px solid white',
          borderRadius: '50px',
          padding: '10px 20px',
        }}>
          Modifica Sneaker
        </button>
        <button type="button" className="btn" style={{
          marginLeft: '5px',
          color: 'white',
          border: '2px solid white',
          borderRadius: '50px',
          padding: '10px 20px',
        }} onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default SneakerEditForm;
