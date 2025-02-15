import { useState } from "react";
import { uploadCsv } from "../services/clienteService";

interface ClienteFormProps {
  onCsvUploaded: () => void;
}

const ClienteForm = ({ onCsvUploaded }: ClienteFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "danger" | "">("");

  const maxFileSize = 100 * 1024 * 1024; // 5 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setAlertType("");
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validar extensión del archivo
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== "csv") {
        setMessage("El archivo debe tener extensión .csv");
        setAlertType("danger");
        setFile(null);
        return;
      }

      // Validar tamaño del archivo
      if (selectedFile.size > maxFileSize) {
        setMessage("El archivo excede el tamaño máximo permitido (5 MB).");
        setAlertType("danger");
        setFile(null);
        return;
      }

      setFile(selectedFile);
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
      const response = await uploadCsv(file);
      setMessage(`${response.message} Se guardaron ${response.totalRegistros} registros.`);
      setAlertType("success");
      onCsvUploaded();
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
  );
};

export default ClienteForm;
