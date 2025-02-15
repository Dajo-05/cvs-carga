import { useState } from "react";
import { uploadCsv } from "../services/clienteService";

interface ClienteFormProps {
  onCsvUploaded: () => void;
}

const ClienteForm = ({ onCsvUploaded }: ClienteFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "danger" | "">("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setAlertType("");

    if (!file) {
      setMessage("Por favor, selecciona un archivo CSV.");
      setAlertType("danger");
      return;
    }

    try {
      // Llamamos a la función del servicio
      const response = await uploadCsv(file);
      // Suponiendo que el backend retorna { message, totalRegistros }
      setMessage(`${response.message} Se guardaron ${response.totalRegistros} registros.`);
      setAlertType("success");
      onCsvUploaded(); // Notificamos al componente padre, si corresponde
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage("Error al cargar el archivo CSV: " + error.message);
      } else {
        setMessage("Error al cargar el archivo CSV.");
      }
      setAlertType("danger");
    }
  };

  return (
    <div className="container text-center">
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

      {/* Alerta de Bootstrap */}
      {message && alertType && (
        <div className={`alert alert-${alertType} mt-2`} role="alert">
          {message}
        </div>
      )}
    </form>
    </div>
  );
};

export default ClienteForm;
