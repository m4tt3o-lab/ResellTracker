import React from 'react';
import SneakerPostForm from './SneakerPostForm.tsx';
import SneakerEditForm from './SneakerEditForm.tsx';

interface SneakerData {
  id?: number;
  modello: string;
  dataAcquisto: Date; 
  prezzoAcquisto: number;
  dataVendita?: Date; 
  prezzoVendita?: number; 
}

interface SneakersModalProps {
  showModal: boolean;
  onClose: () => void;
  onSave: (data: SneakerData) => void;
  actionType: 'add' | 'edit';
  sneakers: SneakerData | null;
}

const SneakersModal: React.FC<SneakersModalProps> = ({
  showModal,
  onClose,
  onSave,
  actionType,
  sneakers,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      tabIndex={-1}
      style={{ display: showModal ? 'block' : 'none' }}
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick} 
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{color: 'black'}}>
              {actionType === 'edit' ? 'Modifica Sneaker' : 'Aggiungi Sneaker'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {actionType === 'edit' && sneakers ? (
              <SneakerEditForm onSave={onSave} sneakers={sneakers} />
            ) : (
              <SneakerPostForm onSave={onSave} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SneakersModal;
