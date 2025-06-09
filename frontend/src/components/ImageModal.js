import React from 'react';

function ImageModal({ isOpen, onClose, imageUrl, userName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-image-container">
          <img src={imageUrl} alt={userName} className="modal-image" />
        </div>
      </div>
    </div>
  );
}

export default ImageModal; 