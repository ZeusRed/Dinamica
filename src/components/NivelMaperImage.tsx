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


interface LevelRoute {
  key: number;
  route: string;
  isUpLevel?: boolean;
}

interface LevelRoutes {
  level: number;
  routes: LevelRoute[];
}

function NivelMaperImage() {
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
            route: `assets/images/level3/img1.jpg`,
            isUpLevel: true,
          },
          {
            key: 2,
            route: `assets/images/level3/img2.jpg`,
          },
        ],
      },
      {
        level: 4,
        routes: [
          {
            key: 1,
            route: `assets/images/level4/img1.jpg`,
            isUpLevel: true,
          },
          {
            key: 2,
            route: `assets/images/level4/img2.jpg`,
          },
        ],
      },
      {
        level: 5,
        routes: [
          {
            key: 1,
            route: `assets/images/level5/img1.jpg`,
            isUpLevel: true,
          },
          {
            key: 2,
            route: `assets/images/level5/img2.jpg`,
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
                  updateLevel={route.isUpLevel ? updateLevel : undefined}
                />
              </div>
            ))}
          </div>
        )}
        <div className="col-12 flex justify-content-center">
          {isComplete && (
            <div className="m-2 p-3 sm:p-4 border-2 border-green-500 text-green-700 text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl">
                ¡Felicidades! Has completado todos los niveles.
              </h2>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default NivelMaperImage;
