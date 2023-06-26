import { useState } from "react";
import { styled } from "styled-components";
import { DmineurContext } from "../Context/Context";
import GameZone from "./GameZone/GameZone";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import SideMenu from "./SideMenu/SideMenu";

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [bombs, setBombs] = useState(10);
  const [gameLaunch, setGameLaunch] = useState(false);
  const [open, setOpen] = useState([]);
  const [bombTriggered, setBombTriggered] = useState([]);
  const [flags, setFlags] = useState(0);

  return (
    <DmineurContext.Provider
      value={{
        WidthContext: { width, setWidth },
        HeightContext: { height, setHeight },
        BombsContext: { bombs, setBombs },
        GameLaunchContext: { gameLaunch, setGameLaunch },
        OpenContext: { open, setOpen },
        BombTriggeredContext: { bombTriggered, setBombTriggered },
        FlagsContext: { flags, setFlags },
      }}>
      <Wrapper>
        <Header />
        <GameZone
          width={width}
          height={height}
        />
        <SideMenu />
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
