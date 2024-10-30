import React from 'react';
import '../Modal.css';

interface SneakerData {
    id?: number;
    modello: string;
    dataAcquisto: Date; 
    prezzoAcquisto: number;
    dataVendita?: Date; 
    prezzoVendita?: number; 
}

interface ConfirmDeleteSneakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sneaker: SneakerData;
}

const ConfirmDeleteSneakerModal: React.FC<ConfirmDeleteSneakerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  sneaker,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      style={{
        display: isOpen ? 'block' : 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      }}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="modal-dialog">
        <div className="modal-content" id='corpoModale'>
          <div className="modal-header" style={{border:'none'}}>
            <h5 className="modal-title" style={{ color: 'white' }}><i>Conferma Cancellazione</i></h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body" >
            <p style={{ color: 'white' }}>Sei sicuro di voler eliminare la sneaker <strong>{sneaker.modello}</strong>?</p>
          </div>
          <div className="modal-footer" style={{border:'none', alignItems:'start', justifyContent:'start'}}>
            <button type="button" className="btn" onClick={onConfirm} style={{
                        color: 'white',
                        border: '2px solid white',
                        borderRadius: '50px',
                        padding: '10px 20px',
            }}>Conferma</button>
            <button type="button" className="btn" onClick={onClose} style={
              {
                color: 'white',
                border: '2px solid white',
                borderRadius: '50px',
                padding: '10px 20px',
              }
            }>Annulla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteSneakerModal;

