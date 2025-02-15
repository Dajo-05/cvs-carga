import React from "react";
import { Cliente } from "../interfaces/Cliente";

interface ClienteDetailModalProps {
  show: boolean;
  cliente: Cliente | null;
  onClose: () => void;
}

const ClienteDetailModal: React.FC<ClienteDetailModalProps> = ({ show, cliente, onClose }) => {
  if (!show || !cliente) return null;

  return (
    <div className="modal d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalle del Cliente</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {cliente.id}</p>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Edad:</strong> {cliente.edad}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteDetailModal;
