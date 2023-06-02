/* eslint-disable react/prop-types */
import { cloneElement, useContext, useEffect, useState } from "react";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";
import { styled } from "styled-components";

function GameZone({ height, width }) {
  const context = useContext(DmineurContext);

  const { bombs } = context.BombsContext;
  const { gameLaunch, setGameLaunch } = context.GameLaunchContext;
  const { setOpenAll } = context.OpenAllContext;
  const { closeAll, setCloseAll } = context.CloseAllContext;
  const { setEmptyCells } = context.EmptyCellsContext;

  const [cells, setCells] = useState([]);
  let bombsAdj = 0;

  useEffect(() => {
    setEmptyCells([]);
    let cellulesVides = []
    setOpenAll(false);
    setCloseAll(true);
    setCloseAll(!closeAll);
    if (gameLaunch) {
      const qtyCells = width * height;
      let generatedCells = [];
      let min = 1;
      let max = qtyCells;
      let bombsToBePlaced = +bombs;
      let bomb = false;
      let x = 1;
      let y = 1;

      for (let i = 0; i < qtyCells; i++, x++) {
        let alea = Math.floor(Math.random() * (max - min + 1)) + min;
        if (x > width) {
          x = 1;
          y++;
        }
        if (alea <= bombsToBePlaced) {
          bombsToBePlaced--;
          bomb = true;
        }
        max--;
        generatedCells.push(
          <Cell
            key={`cell-${x}-${y}`}
            bomb={bomb}
            bombsAdj={bombsAdj}
            cellulesVides={cellulesVides}
          />
        );
        bomb = false;
      }

      generatedCells.forEach((element, index) => {
        const xelement = element.props.x;
        const yelement = element.props.y;
        let bombsAdjacent = 0;

        const adjacentCells = [
          { adjx: xelement - 1, adjy: yelement }, // Gauche
          { adjx: xelement + 1, adjy: yelement }, // Droite
          { adjx: xelement, adjy: yelement - 1 }, // Haut
          { adjx: xelement, adjy: yelement + 1 }, // Bas
          { adjx: xelement - 1, adjy: yelement - 1 }, // Haut gauche
          { adjx: xelement - 1, adjy: yelement + 1 }, // Bas gauche
          { adjx: xelement + 1, adjy: yelement - 1 }, // Haut droite
          { adjx: xelement + 1, adjy: yelement + 1 }, // Bas droite
        ];

        adjacentCells.forEach((el) => {
          const { adjx, adjy } = el;
          const adjacentCell = generatedCells.find(
            (cell) =>
              cell.props.x === adjx && cell.props.y === adjy && cell.props.bomb
          );

          if (adjacentCell) {
            bombsAdjacent++;
          }
        });

        if (bombsAdjacent === 0) {
          // setEmptyCells([...emptyCells, `${xelement}-${yelement}`]);
          // console.log(emptyCells);
          cellulesVides.push({xelement: xelement, yelement: yelement});
          console.log(cellulesVides)
        }

        const cellWithAdjBombs = cloneElement(element, {
          bombsAdj: bombsAdjacent, cellulesVides: cellulesVides
        });
        generatedCells[index] = cellWithAdjBombs;
      });
      setGameLaunch(!gameLaunch);
      setCells(generatedCells);
    }
  }, [gameLaunch]);
  return (
    <>
      <Grid
        width={width}
        height={height}>
        {cells}
      </Grid>
    </>
  );
}

export default GameZone;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-template-rows: repeat(${(props) => props.height}, 1fr);
`;
