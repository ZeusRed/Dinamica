import { useState } from "react";
import "./App.css";
import NivelMaperImage from "./components/NivelMaperImage";
import Register from "./components/Register";

function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  return (
    <div className="App">
      {!isRegistered && (
        <div className="welcome-screen">
          <h1>Bienvenido a la Dinámica de Rutas de Evacuación</h1>
          <p>Por favor, regístrate para comenzar.</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Register setName={setName} setIsRegistered={setIsRegistered} />
          </div>
        </div>
      )}
      {isRegistered && (
        <NivelMaperImage name={name} setIsRegistered={setIsRegistered} />
      )}
    </div>
  );
}

export default App;
