import GameZone from "./GameZone/GameZone";
import Menu from "./Menu/Menu";
import { DmineurContext } from "../Context/Context";
import { useState } from "react";
import Header from "./Header/Header";
import { styled } from "styled-components";

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [bombs, setBombs] = useState(10);
  const [adjacentCells, setAdjacentCells] = useState([]);
  const [gameLaunch, setGameLaunch] = useState(false);
  const [openAll, setOpenAll] = useState(false);

  return (
    <DmineurContext.Provider
      value={{
        WidthContext: { width, setWidth },
        HeightContext: { height, setHeight },
        BombsContext: { bombs, setBombs },
        AdjacentCellsContext: { adjacentCells, setAdjacentCells },
        GameLaunchContext: {gameLaunch, setGameLaunch},
        OpenAllContext: { openAll, setOpenAll },
      }}>
      <Wrapper>
        <Header />
        <GameZone
          width={width}
          height={height}
        />
        <Menu />
      </Wrapper>
    </DmineurContext.Provider>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
