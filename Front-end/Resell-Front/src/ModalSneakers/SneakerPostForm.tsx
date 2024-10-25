import { useState, useEffect } from 'react';

interface SneakerData {
    id?: number;
    modello: string;
    dataAcquisto: Date;
    prezzoAcquisto: number;
    dataVendita?: Date;
    prezzoVendita?: number;
}

interface SneakerPostFormProps {
    onSave: (data: SneakerData) => void;
}

function SneakerPostForm({ onSave }: SneakerPostFormProps) {
    const [modello, setModello] = useState('');
    const [dataAcquisto, setDataAcquisto] = useState('');
    const [prezzoAcquisto, setPrezzoAcquisto] = useState<number | undefined>(undefined);
    const [dataVendita, setDataVendita] = useState('');
    const [prezzoVendita, setPrezzoVendita] = useState<number | undefined>(undefined);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);


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

    const SneakerPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = "http://localhost:3000/sneakers";

        const sneakerData: SneakerData = {
            modello,
            dataAcquisto: new Date(dataAcquisto),
            prezzoAcquisto: prezzoAcquisto!,
            ...(dataVendita && { dataVendita: new Date(dataVendita) }),
            ...(prezzoVendita && { prezzoVendita })
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    modello: sneakerData.modello,
                    dataAcquisto: sneakerData.dataAcquisto.toISOString(),
                    prezzoAcquisto: sneakerData.prezzoAcquisto,
                    ...(sneakerData.dataVendita && { dataVendita: sneakerData.dataVendita.toISOString() }),
                    ...(sneakerData.prezzoVendita && { prezzoVendita: sneakerData.prezzoVendita }),
                }),
            });

            if (response.ok) {
                const result = await response.json();
                onSave(result);
                setModello('');
                setDataAcquisto('');
                setPrezzoAcquisto(undefined);
                setDataVendita('');
                setPrezzoVendita(undefined);
                setFilteredSuggestions([]);
            } else {
                alert("Aggiunta fallita.");
            }
        } catch (error) {
            console.error("Errore durante la richiesta di aggiunta:", error);
        }
    };

    return (
        <form onSubmit={SneakerPost}>
            <div className="mb-3">
                <label htmlFor="modello" className="form-label" style={{ color: 'black' }}>Modello</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Inserisci modello sneaker...'
                    id="modello"
                    value={modello}
                    onChange={(e) => {
                        setModello(e.target.value);
                        setFilteredSuggestions(suggestions);
                    }}
                    required
                />
                {/* Mostra i suggerimenti */}
                {filteredSuggestions.length > 0 && (
                    <div className="dropdown" style={{ position: 'relative', zIndex: 1000 }}>
                        <ul className="list-group ">
                            {filteredSuggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="list-group-item"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
    
            <div className="mb-3">
                <label htmlFor="dataAcquisto" className="form-label" style={{ color: 'black' }}>Data Acquisto</label>
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
                <label htmlFor="prezzoAcquisto" className="form-label" style={{ color: 'black' }}>Prezzo Acquisto</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder='Inserisci prezzo acquisto...'
                    id="prezzoAcquisto"
                    value={prezzoAcquisto || ''}
                    onChange={(e) => setPrezzoAcquisto(Number(e.target.value))}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dataVendita" className="form-label" style={{ color: 'black' }}>Data Vendita</label>
                <input
                    type="date"
                    className="form-control"
                    id="dataVendita"
                    value={dataVendita}
                    onChange={(e) => setDataVendita(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="prezzoVendita" className="form-label" style={{ color: 'black' }}>Prezzo Vendita</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder='Inserisci prezzo vendita...'
                    id="prezzoVendita"
                    value={prezzoVendita || ''}
                    onChange={(e) => setPrezzoVendita(Number(e.target.value))}
                />
            </div>
            <button type="submit" className="btn btn-primary">Salva Sneaker</button>
        </form>
    );
}

export default SneakerPostForm;