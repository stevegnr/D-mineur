/* eslint-disable react/prop-types */
import { styled } from "styled-components";

function Cell({ x, y, bomb }) {


    return <CellComponent onClick={() => console.log({ x: x, y: y })}>{bomb && '💣'}</CellComponent>;
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
