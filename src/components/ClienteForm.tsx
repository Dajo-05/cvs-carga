import { useState } from "react";
import { Cliente } from "../interfaces/Cliente";
import { addCliente } from "../services/clienteService";

const ClienteForm = ({ onClienteAdded }: { onClienteAdded: () => void }) => {
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nombre: "",
    edad: 0,
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCliente(cliente);
    onClienteAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h3>Agregar Cliente</h3>
      <input type="text" name="nombre" placeholder="Nombre" className="form-control mb-2" onChange={handleChange} required />
      <input type="number" name="edad" placeholder="Edad" className="form-control mb-2" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
      <button type="submit" className="btn btn-primary w-100">Guardar</button>
    </form>
  );
};

export default ClienteForm;
