
import React from 'react';

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
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: 'black' }}>Conferma Cancellazione</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p style={{ color: 'black' }}>Sei sicuro di voler eliminare la sneaker <strong>{sneaker.modello}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Annulla</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Conferma</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteSneakerModal;

