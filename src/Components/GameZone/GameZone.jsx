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
  let emptyCells = [];
  let [emptyCellsState, setEmptyCellsState] = useState(emptyCells);
  let bombsadj = 0;

  useEffect(() => {
    // Création et remplissage de la grille
    if (gameLaunch) {
      const qtyCells = width * height;
      let generatedCells = [];
      let min = 1;
      let max = qtyCells;
      let bombsToBePlaced = +bombs;
      let bomb = false;
      let x = 1;
      let y = 1;

      // Place aléatoirement les bombes sur la grille
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
            bombsadj={bombsadj}
            isopened={false}
          />
        );
        bomb = false;
      }

      // Vérifie les bombes sur les cases adjacentes et remplit la case avec cette valeur
      generatedCells.forEach((element, index) => {
        const xelement = element.props.x;
        const yelement = element.props.y;
        const bombelement = element.props.bomb;
        let bombsAdjacent = 0;

        const adjacentCells = [
          { adjx: xelement - 1, adjy: yelement },
          { adjx: xelement + 1, adjy: yelement },
          { adjx: xelement, adjy: yelement - 1 },
          { adjx: xelement, adjy: yelement + 1 },
          { adjx: xelement - 1, adjy: yelement - 1 },
          { adjx: xelement - 1, adjy: yelement + 1 },
          { adjx: xelement + 1, adjy: yelement - 1 },
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

        // Génère le tableau contenant toutes les cases vides de la grille
        if (bombsAdjacent === 0 && !bombelement) {
          emptyCells.push({ xelement: xelement, yelement: yelement });
        }

        const cellWithAdjBombs = cloneElement(element, {
          bombsadj: bombsAdjacent,
        });
        generatedCells[index] = cellWithAdjBombs;
      });
      setGameLaunch(!gameLaunch);
      setCells(generatedCells);
      setEmptyCellsState(emptyCells);
    }
  }, [gameLaunch]);

  function openEmptyAdjCells(cellx, celly) {
    console.log(emptyCellsState);
  }

  function handleOpenCell(x, y, bomb, bombsadj) {
    if (bomb) {
      // Ouvre toutes les cases si le joueur tombe sur une bombe
      setCells((prevCells) =>
        prevCells.map((cell) => {
          return cloneElement(cell, { isopened: true });
        })
      );
    } else if (bombsadj === 0) {
      // Ouvre toutes les cellules vides adjacentes à une cellule vide ouverte
      openEmptyAdjCells(x, y);
    }
    setCells((prevCells) =>
      prevCells.map((cell) => {
        if (cell.props.x === x && cell.props.y === y) {
          return cloneElement(cell, { isopened: true });
        }
        return cell;
      })
    );
  }

  useEffect(() => {
    handleOpenCell(open.x, open.y, open.bomb, open.bombsadj);
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
