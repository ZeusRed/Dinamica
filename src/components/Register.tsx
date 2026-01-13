import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";
import { InputText } from "primereact/inputtext";

interface RegisterProps {
  setName: (name: string) => void;
  setIsRegistered?: (isRegistered: boolean) => void;
}

function Register({ setName, setIsRegistered }: RegisterProps) {
  const [isFillName, setFillName] = useState<boolean>(false);
  //componente que renderiza un formulario de registro
  const fillName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setFillName(true);
  };
  const registrar = () => {
    if (isFillName) {
      setIsRegistered && setIsRegistered(true);
    }
  };
  return (
    <div>
      <Card style={{ width: "400px", padding: "40px" }}>
        <h2>Registro</h2>
        <div
          className="p-fluid p-formgrid p-grid mb-3"
          style={{   marginBottom: "20px", marginTop: "20px" }}
        >
          <InputText className="mb-5" placeholder="Nombre" onChange={fillName} />
          <Button rounded onClick={() => registrar()}>
            Registrarse
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Register;
