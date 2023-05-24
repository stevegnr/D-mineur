import GameZone from "./GameZone/GameZone";
import Menu from "./Menu/Menu";
import { DmineurContext } from "../Context/Context";
import { useState } from "react";

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [bombs, setBombs] = useState(10);
  return (
    <DmineurContext.Provider
      value={{
        WidthContext: { width, setWidth },
        HeightContext: { height, setHeight },
        BombsContext: { bombs, setBombs },
      }}>
      <Menu />
      <GameZone />
    </DmineurContext.Provider>
  );
}

export default App;
