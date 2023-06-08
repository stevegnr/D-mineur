/* eslint-disable react/prop-types */
import { useContext } from "react";
import { styled } from "styled-components";
import { DmineurContext } from "../../Context/Context";

function Menu() {
  const context = useContext(DmineurContext);
  const { width, setWidth } = context.WidthContext;
  const { height, setHeight } = context.HeightContext;
  const { bombs, setBombs } = context.BombsContext;
  const { setGameLaunch } = context.GameLaunchContext;

  return (
    <StyledMenu>
      <label htmlFor="width">Cases en largeur : </label>
      <input
        type="number"
        name="width"
        id="width"
        min={5}
        max={200}
        placeholder="Cases en largeur"
        onChange={(e) => setWidth(e.target.value)}
        defaultValue={width}
      />
      <label htmlFor="height">Cases en hauteur : </label>
      <input
        type="number"
        name="height"
        id="height"
        min={5}
        max={200}
        placeholder="Cases en hauteur"
        onChange={(e) => setHeight(e.target.value)}
        defaultValue={height}
      />
      <label htmlFor="bombs">Bombes : </label>
      <input
        type="number"
        name="bombs"
        id="bombs"
        min={5}
        max={width * height}
        placeholder="Bombes"
        onChange={(e) => setBombs(e.target.value)}
        defaultValue={bombs}
      />
      <button onClick={() => setGameLaunch(true)}>Go !</button>
    </StyledMenu>
  );
}

export default Menu;

const StyledMenu = styled.div`
  font-family: "VT323", monospace;
  display: flex;
  gap: 10px;
`;
