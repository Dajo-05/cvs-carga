import { useState } from "react";
import axios from "axios";
import { uploadCsv } from "../services/clienteService";

interface ClienteFormProps {
  onCsvUploaded: () => void;
}

const ClienteForm = ({ onCsvUploaded }: ClienteFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "danger" | "">("");
  const [csvErrorDetail, setCsvErrorDetail] = useState<string>("");

  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setAlertType("");
    setCsvErrorDetail("");

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validar extensión del archivo
      const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
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
    setCsvErrorDetail("");

    if (!file) {
      setMessage("Por favor, selecciona un archivo CSV.");
      setAlertType("danger");
      return;
    }

    try {
      const response = await uploadCsv(file);
      // Si la respuesta es exitosa, se asume que retorna: { message, totalRegistros }
      setMessage(`${response.message} Se guardaron ${response.totalRegistros} registros.`);
      setAlertType("success");
      onCsvUploaded();
    } catch (error: unknown) {
      // Usamos axios.isAxiosError para manejar errores de Axios
      if (axios.isAxiosError(error)) {
        // Verificamos si el backend retornó un objeto con la propiedad Message
        if (error.response && error.response.data && error.response.data.message) {
          setMessage("Error al procesar el archivo CSV.");
          setAlertType("danger");
          setCsvErrorDetail(error.response.data.message);
          console.log("error if",error.response.data.message);
        } else {
          console.log("error else",error.message);
          setMessage("Error al cargar el archivo CSV: " + error.message);
          setAlertType("danger");
        }
      } else {
        // Error genérico que no es de Axios
        setMessage("Error desconocido: " + (error as Error).message);
        setAlertType("danger");
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

      {/* Alerta general */}
      {message && alertType && (
        <div className={`alert alert-${alertType} mt-2`} role="alert">
          {message}
        </div>
      )}

      {/* Mostrar error detallado (fila y columna) si existe */}
      {csvErrorDetail && (
        <div className="alert alert-danger mt-2" role="alert">
          <strong>Error en el CSV:</strong> {csvErrorDetail}
        </div>
      )}
    </form>
  );
};

export default ClienteForm;
