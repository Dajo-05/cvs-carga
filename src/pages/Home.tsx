// Home.tsx
import { useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container-fluid">
      <h1>Gestión de Clientes</h1>
      <ClienteForm onCsvUploaded={handleRefresh} />
      <ClienteList key={refresh ? "1" : "0"} />
    </div>
  );
};

export default Home;