import { useEffect, useState } from "react";
import { Cliente } from "../interfaces/Cliente";
import { getClientes } from "../services/clienteService";
import ClienteDetailModal from "./ClienteDetailModal";

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const size = 5; // Tamaño de la página
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para el modal de detalle
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, [page, search]);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const data = await getClientes(page, size, search);
      setClientes(data.clientes);
      setTotalItems(data.totalItems);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reiniciar la paginación al buscar
  };

  const handleViewDetail = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
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

      {/* Mensajes de carga y error */}
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {/* Lista de clientes */}
      {!loading && !error && (
        <ul className="list-group">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {cliente.nombre} - {cliente.edad} años - {cliente.email}
              </div>
              <button className="btn btn-info btn-sm" onClick={() => handleViewDetail(cliente)}>
                Ver Detalle
              </button>
            </li>
          ))}
        </ul>
      )}

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

      {/* Modal para detalle del cliente */}
      <ClienteDetailModal show={showModal} cliente={selectedCliente} onClose={handleCloseModal} />
    </div>
  );
};

export default ClienteList;