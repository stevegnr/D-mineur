/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { cloneElement, useContext, useEffect, useState } from "react";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";
import { styled } from "styled-components";

function GameZone({ height, width }) {
  const context = useContext(DmineurContext);

  const { bombs } = context.BombsContext;
  const { gameLaunch, setGameLaunch } = context.GameLaunchContext;
  const { open } = context.OpenContext;

  const [cells, setCells] = useState([]);
  let cellulesVides = [];

  let opened = false;
  let bombsAdj = 0;

  useEffect(() => {
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
            x={x}
            y={y}
            bomb={bomb}
            bombsAdj={bombsAdj}
            opened={opened}
          />
        );
        bomb = false;
      }

      generatedCells.forEach((element, index) => {
        const xelement = element.props.x;
        const yelement = element.props.y;
        const bombelement = element.props.bomb;
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

        if (bombsAdjacent === 0 && !bombelement) {
          cellulesVides.push({ xelement: xelement, yelement: yelement });
        }

        const cellWithAdjBombs = cloneElement(element, {
          bombsAdj: bombsAdjacent,
        });
        generatedCells[index] = cellWithAdjBombs;
      });
      setGameLaunch(!gameLaunch);
      setCells(generatedCells);
    }
  }, [gameLaunch]);

  function handleOpenCell(x, y, bomb, bombsAdj) {
    if (bomb) {
      setCells((prevCells) =>
        prevCells.map((cell) => {
          return cloneElement(cell, { opened: true });
        })
      );
    } else if (bombsAdj === 0) {
      setCells((prevCells) =>
        prevCells.map((cell) => {
          if (cell.props.bombsAdj === 0 && !cell.props.bomb) {
            if (
              Math.abs(cell.props.x - open.x) <= 1 &&
              Math.abs(cell.props.y - open.y)
            ) {
              return cloneElement(cell, { opened: true });
            }
          }
          return cell;
        })
      );
    }
    setCells((prevCells) =>
      prevCells.map((cell) => {
        if (cell.props.x === x && cell.props.y === y) {
          return cloneElement(cell, { opened: true });
        }
        return cell;
      })
    );
  }

  useEffect(() => {
    handleOpenCell(open.x, open.y, open.bomb, open.bombsAdj);
  }, [open]);

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
