import { useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <h1>Gestión de Clientes</h1>
      <ClienteForm onClienteAdded={() => setRefresh(!refresh)} />
      <ClienteList key={refresh ? "1" : "0"} />
    </div>
  );
};

export default Home;
