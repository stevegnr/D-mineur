import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";
import Cell from "../Cell/Cell";
import { styled } from "styled-components";

function GameZone() {
  const context = useContext(DmineurContext);
  const { width } = context.WidthContext;
  const { height } = context.HeightContext;
  const { bombs } = context.BombsContext;

  const qtyCells = width * height;
  const rows = [];

  let min = 1;
  let max = qtyCells;
  let bombsToBePlaced = +bombs;
  let bomb = false;

  for (let i = 0; i < height; i++) {
    const cells = [];
    for (let j = 0; j < width; j++) {
      let alea = Math.floor(Math.random() * (max - min + 1)) + min;

      if (alea <= bombsToBePlaced) {
        bombsToBePlaced--;
        bomb = true;
      }
      max--;
      cells.push(
        <Cell
          key={`cell-${i}-${j}`}
          x={j + 1}
          y={i + 1}
          bomb={bomb}
          qtyCells={qtyCells}
        />
      );
      bomb = false;
    }
    rows.push(<Row key={`row-${i}`}>{cells}</Row>);
  }
  return <Grid>{rows}</Grid>;
}

export default GameZone;

const Grid = styled.div``;

const Row = styled.div`
  display: flex;
`;
