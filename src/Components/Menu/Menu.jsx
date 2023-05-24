import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";

function Menu() {
  const context = useContext(DmineurContext);
  const {setWidth} = context.WidthContext;
  const {setHeight} = context.HeightContext;
  const {setBombs} = context.BombsContext;

  return (
    <div>
      <label htmlFor="width">Cases en largeur : </label>
      <input
        type="number"
        name="width"
        id="width"
        min={10}
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
        min={10}
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
        min={10}
        max={20000}
        placeholder="Bombes"
        onChange={(e) => setBombs(e.target.value)}
        defaultValue={10}
      />
    </div>
  );
}

export default Menu;
