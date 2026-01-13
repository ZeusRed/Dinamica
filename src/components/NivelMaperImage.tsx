import { useEffect, useState, useMemo } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import ButtonCardImage from "./ButtonCardImage";

import s1 from "../assets/images/level1/s1.jpeg";
import s2 from "../assets/images/level1/s2.jpeg";
import s3 from "../assets/images/level1/s3.jpeg";

import e1 from "../assets/images/level2/e1.jpeg";
import e2 from "../assets/images/level2/e2.jpeg";
import e3 from "../assets/images/level2/e3.jpeg";
import e4 from "../assets/images/level2/e4.jpeg";

import m1 from "../assets/images/level3/m1.jpeg";
import m2 from "../assets/images/level3/m2.jpeg";
import m3 from "../assets/images/level3/m3.jpeg";

import ss1 from "../assets/images/level4/ss1.jpeg"; 
import ss2 from "../assets/images/level4/ss2.jpeg"; 
import ss3 from "../assets/images/level4/ss3.jpeg";
import ss4 from "../assets/images/level4/ss4.jpeg";
import ss5 from "../assets/images/level4/ss5.jpeg";

import l1 from "../assets/images/level5/l1.jpeg";
import l2 from "../assets/images/level5/l2.jpeg";
import l3 from "../assets/images/level5/l3.jpeg";


import WrongAnswerOverlay from "./WrongAnswer";

interface NivelMaperImageProps {
  name: string;
  setIsRegistered: (isRegistered: boolean) => void;
}

interface LevelRoute {
  key: number;
  route: string;
  isUpLevel?: boolean;
}

interface LevelRoutes {
  level: number;
  routes: LevelRoute[];
}

function NivelMaperImage({ name, setIsRegistered }: NivelMaperImageProps) {
  const [levelCounter, setLevelCounter] = useState<number>(1);
  const [imageRoutes, setImageRoutes] = useState<LevelRoute[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Definir rutas una sola vez
  const routes: LevelRoutes[] = useMemo(
    () => [
      {
        level: 1,
        routes: [
          {
            key: 1,
            route: s1,
          },
          {
            key: 2,
            route: s2,
            isUpLevel: true,
          },
          { key: 3, route: s3 },
        ],
      },
      {
        level: 2,
        routes: [
          {
            key: 1,
            route: e1,
            isUpLevel: true,
          },
          { key: 2, route: e2 },
          { key: 3, route: e3 },
          { key: 4, route: e4, isUpLevel: true },
        ],
      },
      {
        level: 3,
        routes: [
          {
            key: 1,
            route: m1,
            isUpLevel: true,
          },
          {
            key: 2,
            route: m2,
          },
          {
            key: 3,
            route: m3,
          },
        ],
      },
      {
        level: 4,
        routes: [
          {
            key: 1,
            route: ss1, 
          },
          {
            key: 2,
            route: ss2,
          },
          {
            key: 3,
            route: ss3,
            isUpLevel: true,
          },
          {
            key: 4,
            route: ss4,
          },
          {
            key: 5,
            route: ss5,
          },
        ],
      },
      {
        level: 5,
        routes: [
          {
            key: 1,
            route: l1,
            isUpLevel: true,
          },
          {
            key: 2,
            route: l2,
             isUpLevel: true,
          },
          {
            key: 3,
            route: l3,
             isUpLevel: true,
          },
        ],
      },
    ],
    []
  );

  const MAX_LEVEL = routes.length;

  // Actualizar imágenes según nivel
  useEffect(() => {
    const levelData = routes.find((l) => l.level === levelCounter);
    setImageRoutes(levelData?.routes ?? []);
  }, [levelCounter, routes]);

  // Subir nivel (seguro)
  const updateLevel = () => {
    if (levelCounter >= MAX_LEVEL) setIsComplete(true);
    setLevelCounter((prev) => Math.min(prev + 1, MAX_LEVEL));
  };

  // Reiniciar
  const resetLevel = () => {
    setLevelCounter(1);
    setIsComplete(false);
    setImageRoutes(routes[0].routes);
  };
  const [showWrong, setShowWrong] = useState(false);


  return (
    <Card>
      <div className="grid w-full">
        <div className="col-12 flex justify-content-center">
          <div className="flex flex-column align-items-center">
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(2rem, 8vw, 5rem)",
              }}
            >
              Nivel {levelCounter}
            </h1>
            <h3>Elige la opción correcta</h3>
            <Button
              outlined
              rounded
              label="Resetear Puzzle"
              onClick={resetLevel}
              className="mt-3"
            />
          </div>
        </div>
      </div>
      <div className="grid">
        {!isComplete && (
          <div className="col-12 flex justify-content-center flex-wrap mb-4 gap-2">
            {imageRoutes.map((route) => (
              <div
                key={`${levelCounter}-${route.key}`}
                className="w-full sm:w-6 md:w-4 lg:w-3 flex justify-content-center"
              >
                <ButtonCardImage
                  ruta={route.route}
                  updateLevel={route.isUpLevel ? updateLevel : () => setShowWrong(true)}
                />
              </div>
            ))}
          </div>
        )}
        <div className="col-12 flex justify-content-center">
          {isComplete && (
            <div className="m-2 p-3 sm:p-4 border-2 border-green-500 text-green-700 text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl">
                ¡Felicidades {name}! Has completado todos los niveles.
              </h2>
              <div className="mt-3">
                <Button
                  label="Reiniciar Dinámica"
                  icon="pi pi-refresh"
                  onClick={
                    setIsRegistered ? () => setIsRegistered(false) : resetLevel
                  }
                  className="p-button-success"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <WrongAnswerOverlay visible={showWrong} onFinish={() => setShowWrong(false)} />
    </Card>
  );
}

export default NivelMaperImage;
