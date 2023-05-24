import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";

function Menu() {
  const context = useContext(DmineurContext);
  const {width, setWidth} = context.WidthContext;
  const {height, setHeight} = context.HeightContext;
  const {setBombs} = context.BombsContext;

  return (
    <div>
      <label htmlFor="width">Cases en largeur : </label>
      <input
        type="number"
        name="width"
        id="width"
        min={5}
        max={200}
        placeholder="Cases en largeur"
        onChange={(e) => setWidth(e.target.value)}
        defaultValue={10}
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
        defaultValue={10}
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
        defaultValue={10}
      />
    </div>
  );
}

export default Menu;
