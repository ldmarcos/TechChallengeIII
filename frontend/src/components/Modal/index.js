import React from 'react';
import './Modal.css'; // Adicione seu CSS para estilização do modal

const Modal = ({children }) => {
    return (
        <div className='modal-overlay'>
            <div className='modal'>
                {children}
            </div>
        </div>
    );
};

export default Modal;
