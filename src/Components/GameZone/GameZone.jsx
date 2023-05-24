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
  let acc = 0;
  let bombsToBePlaced = bombs;
  let bomb = "";

  for (let i = 0; i < width; i++) {
    const cells = [];
    for (let j = 0; j < height; j++) {
      let chanceOfBomb = (bombsToBePlaced / max) * 100;
      let alea = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log({ chanceOfBomb: chanceOfBomb, alea: alea });
      if (alea <= chanceOfBomb) {
        acc++;
        bombsToBePlaced--;
        console.log("Bomb !", acc);
        bomb += "💣";
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
    }
    rows.push(<Row key={`row-${i}`}>{cells}</Row>);
  }
  console.log(rows);
  return <Grid>{rows}</Grid>;
}

export default GameZone;

const Grid = styled.div``;

const Row = styled.div`
  display: flex;
`;
