import { useEffect, useState } from "react";
import { Cliente } from "../interfaces/Cliente";
import { getClientes } from "../services/clienteService";

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const size = 5; // Tamaño de la página

  useEffect(() => {
    cargarClientes();
  }, [page, search]);

  const cargarClientes = async () => {
    const data = await getClientes(page, size, search);
    setClientes(data.clientes);
    setTotalItems(data.totalItems);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reiniciar la paginación al buscar
  };

  return (
    <div className="mt-3">
      <h3>Lista de Clientes</h3>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o email"
        className="form-control mb-3"
        value={search}
        onChange={handleSearchChange}
      />

      {/* Lista de clientes */}
      <ul className="list-group">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="list-group-item">
            {cliente.nombre} - {cliente.edad} años - {cliente.email}
          </li>
        ))}
      </ul>

      {/* Controles de paginación */}
      <nav className="mt-3">
        <ul className="pagination">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>Anterior</button>
          </li>
          <li className={`page-item ${page * size >= totalItems ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>Siguiente</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ClienteList;

