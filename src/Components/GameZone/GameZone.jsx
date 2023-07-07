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
  const { open, setOpen } = context.OpenContext; // Les cellules ajoutées dans ce tableau seront ouvertes
  const { setBombTriggered } = context.BombTriggeredContext;
  const { setFlags } = context.FlagsContext;
  const { setEndGame } = context.EndGameContext;


  const [cells, setCells] = useState([]);
  let emptyCells = [];
  let bombsadj = 0;
  let qtyCells = 0;

  const [opened, setOpened] = useState([]);
  const [filteredOpened, setFilteredOpened] = useState([]);

  function adjCells(x, y) {
    return [
      { x: x - 1, y: y - 1 }, // Haut gauche
      { x: x, y: y - 1 }, // Haut
      { x: x + 1, y: y - 1 }, // Haut droite
      { x: x + 1, y: y }, // Droite
      { x: x + 1, y: y + 1 }, // Bas droite
      { x: x, y: y + 1 }, // Bas
      { x: x - 1, y: y + 1 }, // Bas gauche
      { x: x - 1, y: y }, // Gauche
    ];
  }

  useEffect(() => {
    setOpen([]);
    setOpened([]);
    setFlags(0);
    setEndGame('')
    // Création et remplissage de la grille
    if (gameLaunch) {
      qtyCells = width * height;
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

  //  HandleOpenCell
  function handleOpenCell(x, y, bomb, bombsadj) {
    let openingCells = [];

    if (bomb) {
      // Ouvre toutes les cases si le joueur tombe sur une bombe
      openingCells.push(...cells);
      setCells((prevCells) => {
        return prevCells.map((cell) => {
          return cloneElement(cell, { isopened: true });
        });
      });
      setBombTriggered({ x, y });
      setEndGame('💥Défaite ! 😭')
    } else if (bombsadj === 0) {
      // Ouvre toutes les cellules vides adjacentes à une cellule vide ouverte
      openingAdjCells(x, y, openingCells);
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
    if (!opened.some((cell) => cell.x === x && cell.y === y)) {
      setOpened([...opened, { x, y }]);
    }
    setFilteredOpened(
      opened.filter(
        (element) =>
          element.x >= 1 && element.x <= 10 && element.y >= 1 && element.y <= 10
      )
    );
  }
  let test = [];
  function openingAdjCells(x, y, cellTab) {
    // Ouvrir les cellules adjacentes
    adjCells(x, y).forEach((element) => {
      if (
        !cellTab.some(
          (cell) => cell.xelement === element.x && cell.yelement === element.y
        )
      ) {
        cellTab.push({ x: element.x, y: element.y });
      }

      let cellA = cells.find(
        (cell) => cell.props.x === element.x && cell.props.y === element.y
      );
      if (
        cellA &&
        cellA.props.bomb === false &&
        cellA.props.bombsadj === 0 &&
        !test.includes(cellA.key)
      ) {
        test = [...test, cellA.key];
        openingAdjCells(cellA.props.x, cellA.props.y, cellTab);
      }
    });
    setOpen([...open, ...cellTab]);
  }

  useEffect(() => {
    async function openCells() {
      open.forEach((element) => {
        if (open.some((cell) => cell.x === element.x && cell.y === element.y)) {
          handleOpenCell(element.x, element.y, element.bomb, element.bombsadj);
        }
      });
    }

    openCells();
    if (open.length > 0) {
      setOpen((prevToOpen) =>
        prevToOpen.filter((element) => {
          return !opened.some(
            (cell) => cell.x === element.x && cell.y === element.y
          );
        })
      );
    }

    if (width * height - filteredOpened.length === bombs) {
            setEndGame("🎉Victoire ! 😍");

    }
      console.log({ opened: opened.length, filtered: filteredOpened.length });
    console.log(width * height - filteredOpened.length === bombs);
    console.log(filteredOpened.sort((a, b) => a.x - b.x));
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
