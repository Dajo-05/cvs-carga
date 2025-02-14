import { useEffect, useState } from "react";
import { Cliente } from "../interfaces/Cliente";
import { getClientes } from "../services/clienteService";

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  return (
    <div className="mt-3">
      <h3>Lista de Clientes</h3>
      <ul className="list-group">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="list-group-item">
            {cliente.nombre} - {cliente.edad} años - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteList;
