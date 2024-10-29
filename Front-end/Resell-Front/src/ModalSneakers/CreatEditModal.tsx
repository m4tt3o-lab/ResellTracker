import React from 'react';
import SneakerPostForm from './SneakerPostForm.tsx';
import SneakerEditForm from './SneakerEditForm.tsx';
import '../Modal.css';

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
      style={{ display: showModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick} 
    >
      <div className="modal-dialog">
        <div className="modal-content" id='corpoModale'>
          <div className="modal-header" style={{border:'none'}}> 
            <h5 className="modal-title" style={{color: 'white'}}>
              {actionType === 'edit' ? <i>Modifica Sneaker</i> : <i>Aggiungi Sneaker</i>}
            </h5>
            <button type="button"className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body" >
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
