/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";
import { styled } from "styled-components";

function GameZone({ height, width }) {
  const context = useContext(DmineurContext);

  const { bombs } = context.BombsContext;
  const { gameLaunch, setGameLaunch } = context.GameLaunchContext;
  const [cells, setCells] = useState([]);
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
              cells={generatedCells}
            />
          );
          bomb = false;
        }
        setGameLaunch(!gameLaunch);
        setCells(generatedCells);
      }
  }, [gameLaunch])
  


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
