import axios from "axios";
import { Cliente } from "../interfaces/Cliente";

const API_URL = "https://localhost:7091/api/Clientes";

// Función para obtener clientes (si se mantiene)
export const getClientes = async (page: number, size: number, search: string) => {
  const response = await axios.get<{ clientes: Cliente[]; totalItems: number }>(
    API_URL,
    { params: { page, size, search } }
  );
  return response.data;
};

// Función para subir el archivo CSV
export const uploadCsv = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); 

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};



