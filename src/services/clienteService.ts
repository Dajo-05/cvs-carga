import axios from "axios";
import { Cliente } from "../interfaces/Cliente";

const API_URL = "http://localhost:7091/api/Clientes";

export const getClientes = async (page: number, size: number, search: string) => {
  const response = await axios.get<{ clientes: Cliente[]; totalItems: number }>(
    API_URL,
    { params: { page, size, search } }
  );
  return response.data;
};

