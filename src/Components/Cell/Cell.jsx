/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { styled } from "styled-components";

function Cell({ x, y, bomb, bombsAdj }) {
  return (
    <CellComponent />
  );
}

export default Cell;

const CellComponent = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.opened ? "" : "#bab3b3")};
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: bold;
  color: ${(props) => {
    switch (props.bombsAdj) {
      case 0:
        return "lightgray";

      case 1:
        return "green";

      case 2:
        return "blue";

      case 3:
        return "red";
      case 4:
        return "purple";

      case 5:
        return "darkblue";

      case 6:
        return "brown";

      case 7:
        return "darkslategrey";

      case 8:
        return "white";
    }
  }};
`;
