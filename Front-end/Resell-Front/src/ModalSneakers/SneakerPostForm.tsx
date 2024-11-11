import { useState, useEffect } from 'react';
import '../App.css';

interface SneakerData {
    id?: number;
    modello: string;
    dataAcquisto: Date;
    prezzoAcquisto: number;
    dataVendita?: Date | null;
    prezzoVendita?: number | null;
}

interface SneakerPostFormProps {
    onSave: (data: SneakerData) => void;
}

function SneakerPostForm({ onSave }: SneakerPostFormProps) {
    const [modello, setModello] = useState('');
    const [dataAcquisto, setDataAcquisto] = useState('');
    const [prezzoAcquisto, setPrezzoAcquisto] = useState<number | null>(null);
    const [dataVendita, setDataVendita] = useState('');
    const [prezzoVendita, setPrezzoVendita] = useState<number | null>(null);
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
    };

    const SneakerPost = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = "http://localhost:3000/sneakers";

        const sneakerData: SneakerData = {
            modello,
            dataAcquisto: new Date(dataAcquisto),
            prezzoAcquisto: prezzoAcquisto!,
            dataVendita: dataVendita ? new Date(dataVendita) : null,
            prezzoVendita: prezzoVendita ?? null,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    modello: sneakerData.modello,
                    dataAcquisto: sneakerData.dataAcquisto.toISOString(),
                    prezzoAcquisto: sneakerData.prezzoAcquisto,
                    dataVendita: sneakerData.dataVendita ? sneakerData.dataVendita.toISOString() : null,
                    prezzoVendita: sneakerData.prezzoVendita ?? null,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                onSave(result);
                setModello('');
                setDataAcquisto('');
                setPrezzoAcquisto(null);
                setDataVendita('');
                setPrezzoVendita(null);
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
                <label htmlFor="modello" className="form-label" style={{ color: 'white' }}><b>Modello</b></label>
                <input
                    type="text"
                    className="form-control"
                    placeholder='Inserisci modello sneaker...'
                    id="modello"
                    value={modello}
                    onChange={(e) => {
                        setModello(e.target.value);
                        setFilteredSuggestions(suggestions.filter(suggestion => suggestion.toLowerCase().includes(e.target.value.toLowerCase())));
                    }}
                    required
                />
                {/* Mostra i suggerimenti */}
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
                    placeholder='Inserisci prezzo acquisto...'
                    id="prezzoAcquisto"
                    value={prezzoAcquisto || ''}
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
                    placeholder='Inserisci prezzo vendita...'
                    id="prezzoVendita"
                    value={prezzoVendita || ''}
                    onChange={(e) => setPrezzoVendita(Number(e.target.value || ''))}
                />
            </div>
            <button type="submit" className="btn" style={{
                color: 'white',
                border: '2px solid white',
                borderRadius: '50px',
                padding: '10px 20px',
            }}>Salva Sneaker</button>
        </form>
    );
}

export default SneakerPostForm;
