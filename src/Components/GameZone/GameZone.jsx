/* eslint-disable react/prop-types */
import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";
import { styled } from "styled-components";

function GameZone({height, width}) {
  const context = useContext(DmineurContext);
  const { bombs } = context.BombsContext;

  const qtyCells = width * height;
  let cells = [];

  let min = 1;
  let max = qtyCells;
  let bombsToBePlaced = +bombs;
  let bomb = false;
  let x = 1;
  let y = 1;

  for (let i = 0; i < qtyCells; i++, y++) {
    let alea = Math.floor(Math.random() * (max - min + 1)) + min;
    if (x >= width) {
      x = 1;
    }
    if (alea <= bombsToBePlaced) {
      bombsToBePlaced--;
      bomb = true;
    }
    max--;
    cells.push(
      <Cell
        key={`cell-${x}-${y}`}
        x={x}
        y={y}
        bomb={bomb}
      />
    );
    bomb = false;
  }

  console.log(cells);
  console.log({ width: width, height: height });
  return (
    <Grid
      width={width}
      height={height}>
      {cells}
    </Grid>
  );
}

export default GameZone;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows: repeat(${props => props.height}, 1fr);
`;
