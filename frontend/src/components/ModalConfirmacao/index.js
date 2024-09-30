import React from 'react';
import './ModalConfirmacao.css';

const ModalConfirmacao = ({ message, onConfirm, onCancel }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <h3>Confirmação</h3>
                <p>{message}</p>
                <div className='modal-buttons'>
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacao;
