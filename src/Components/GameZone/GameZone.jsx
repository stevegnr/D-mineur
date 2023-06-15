/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { cloneElement, useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";

function GameZone({ height, width }) {
  const context = useContext(DmineurContext);

  const { bombs } = context.BombsContext;
  const { gameLaunch, setGameLaunch } = context.GameLaunchContext;
  const { toOpen, setToOpen } = context.OpenContext; // Les cellules ajoutées dans ce tableau seront ouvertes puis supprimées de ce tableau
  const [opened, setOpened] = useState([]); // Les cellules ouvertes sont ajoutées dans ce tableau

  const [cells, setCells] = useState([]);
  let emptyCells = [];
  let bombsadj = 0;

  function adjCells(x, y) {
    return [
      { x: x - 1, y: y }, // Gauche
      { x: x + 1, y: y }, // Droite
      { x: x, y: y - 1 }, // Haut
      { x: x, y: y + 1 }, // Bas
      { x: x - 1, y: y - 1 }, // Bas droite
      { x: x - 1, y: y + 1 }, // Haut gauche
      { x: x + 1, y: y - 1 }, // Haut droite
      { x: x + 1, y: y + 1 }, // Bas droite
    ];
  }

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

        adjCells(xelement, yelement).forEach((el) => {
          const { x, y } = el;
          const adjacentCell = generatedCells.find(
            (cell) =>
              cell.props.x === x && cell.props.y === y && cell.props.bomb
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
    }
  }, [gameLaunch]);

  function handleOpenCell(x, y, bomb, bombsadj) {
    if (opened.some((cell) => cell.x === x && cell.y === y)) {
      console.log("Déjà ouverte");
    } else {
      setOpened([...opened, { x, y }]);
      let openingCells = [];

      if (bomb) {
        // Ouvre toutes les cases si le joueur tombe sur une bombe
        openingCells.push(...cells);
      } else if (bombsadj === 0) {
        // Ouvre toutes les cellules vides adjacentes à une cellule vide ouverte
        openingCells.push(...adjCells(x, y));
        setToOpen([...toOpen, ...adjCells(x, y)]);
      }

      // Dans tous les cas, ouvrir la case sélectionnée
      openingCells.push({ x, y });
      // Mise à jour de cells
      setCells((prevCells) => {
        return prevCells.map((cell) => {
          for (const element of openingCells) {
            if (cell.props.x === element.x && cell.props.y === element.y) {
              return cloneElement(cell, { isopened: true });
            }
          }
          return cell;
        });
      });
    }
  }

  useEffect(() => {
    async function openCells() {
      toOpen.forEach((element) => {
        // if (
        //   toOpen.some((cell) => cell.x === element.x && cell.y === element.y)
        // ) {
          handleOpenCell(element.x, element.y, element.bomb, element.bombsadj);
        // }
      });
    }

    openCells();
    if (toOpen.length > 0) {
      setToOpen((prevToOpen) =>
        prevToOpen.filter((element) => {
          return !toOpen.includes(element); // Exclure les cellules déjà traitées
        })
      );
    }
  }, [toOpen]);

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
