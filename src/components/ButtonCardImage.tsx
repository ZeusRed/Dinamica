import { Button } from "primereact/button";
import { Card } from "primereact/card";

interface ButtonCardImageProps {
  ruta: string;
  updateLevel?: () => void;
}

function ButtonCardImage({ ruta, updateLevel }: ButtonCardImageProps) {
  // imagen un boton que se parezca a una tarjeta de imagen
  return (
    <Card style={{ width: "300px", height: "300px" }}>
      <Button
      style={{ width: "200px", height: "200px" }}
      icon={<img src={ruta} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      className="p-button-text"
      onClick={updateLevel}
      />
    </Card>
  );
}
export default ButtonCardImage;
