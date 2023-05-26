/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DmineurContext } from "../../Context/Context";

function Cell({ x, y, bomb, cells }) {
  const [opened, setOpened] = useState(false);
  const [bombIcon, setBombIcon] = useState("💣");
  const context = useContext(DmineurContext);

  const { openAll, setOpenAll } = context.OpenAllContext;
  const { closeAll } = context.CloseAllContext;
  const {emptyCells, setEmptyCells} = context.EmptyCellsContext

  useEffect(() => {
    if (closeAll) {
      setOpened(false);
    }
  }, [closeAll]);

  useEffect(() => {
    if (openAll) {
      setOpened(true);
    }
  }, [openAll]);

  let bombs = 0;

  const adjacentCells = [
    { x: x - 1, y: y, position: "gauche" }, // Gauche
    { x: x + 1, y: y, position: "droite" }, // Droite
    { x: x, y: y - 1, position: "haut" }, // Haut
    { x: x, y: y + 1, position: "bas" }, // Bas
    { x: x - 1, y: y - 1, position: "haut gauche" }, // Diagonale supérieure gauche
    { x: x - 1, y: y + 1, position: "bas gauche" }, // Diagonale inférieure gauche
    { x: x + 1, y: y - 1, position: "haut droite" }, // Diagonale supérieure droite
    { x: x + 1, y: y + 1, position: "bas droite" }, // Diagonale inférieure droite
  ];

  cells.forEach((element) => {
    let xelem = element.props.x;
    let yelem = element.props.y;
    let bombelem = element.props.bomb;
    adjacentCells.forEach((el) => {
      if (xelem === el.x && yelem === el.y) {
        if (bombelem) {
          bombs++;
        }
      }
    });
    if (bombs === 0  ) {
      if (!emptyCells.includes(`${x}-${y}`)) {
        setEmptyCells([...emptyCells, `${x}-${y}`]);
      }
    }
  });

  function opening() {
    if (bomb === true) {
      setBombIcon("💥");
      setOpenAll(true);
    } else if (bombs === 0) {
      console.log("Ouvrir les cases vides adjacentes");
      console.log({ x: x, y: y, bomb: bomb });
      console.log({ emptyCells});
    }
    setOpened(true);
  }
  return (
    <CellComponent
      bombs={bombs}
      onClick={() => opening()}
      opened={opened}>
      {/* {opened ? (bomb ? bombIcon : bombs) : ""} */}
      {bomb ? bombIcon : bombs}
    </CellComponent>
  );
}

export default Cell;

const CellComponent = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.opened ? "" : "#bab3b3")};
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: bold;
  color: ${(props) => {
    switch (props.bombs) {
      case 0:
        return "lightgray";

      case 1:
        return "green";

      case 2:
        return "blue";

      case 3:
        return "red";
      case 4:
        return "purple";

      case 5:
        return "darkblue";

      case 6:
        return "brown";

      case 7:
        return "darkslategrey";
      case 8:
        return "white";
    }
  }};
`;
