import axios from "axios";
import { Cliente } from "../interfaces/Cliente";

const API_URL = "http://localhost:7091/api/Clientes";

export const getClientes = async () => {
  const response = await axios.get<Cliente[]>(API_URL);
  return response.data;
};

export const addCliente = async (cliente: Cliente) => {
  await axios.post(API_URL, cliente);
};
