import { useState } from "react";
import { uploadCsv } from "../services/clienteService";

interface ClienteFormProps {
  onCsvUploaded: () => void;
}

const ClienteForm = ({ onCsvUploaded }: ClienteFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Por favor, selecciona un archivo CSV.");
      return;
    }

    try {
      await uploadCsv(file);
      setMessage("Archivo CSV cargado correctamente.");
      onCsvUploaded(); // Para refrescar o notificar al padre si es necesario
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Error al cargar el archivo CSV: " + error.message);
      } else {
        setMessage("Error al cargar el archivo CSV.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h3>Cargar Archivo CSV</h3>
      <div className="mb-3">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
          className="form-control" 
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Subir Archivo
      </button>
      {message && <p className="mt-2 text-center">{message}</p>}
    </form>
  );
};

export default ClienteForm;
