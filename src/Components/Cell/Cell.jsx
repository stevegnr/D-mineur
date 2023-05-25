/* eslint-disable react/prop-types */
import { styled } from "styled-components";

function Cell({ x, y, bomb }) {
  function handleCellClick() {
    console.log({ x: x, y: y, bomb: bomb });
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

    adjacentCells.forEach((element) => {
      console.log(element);
    });
  }

  return (
    <CellComponent onClick={() => handleCellClick()}>
      {bomb && "💣"}
    </CellComponent>
  );
}

export default Cell;

const CellComponent = styled.div`
  height: 30px;
  width: 30px;
  background-color: #bab3b3;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
