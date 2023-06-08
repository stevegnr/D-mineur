/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DmineurContext } from "../../Context/Context";
import styled from "styled-components";

function Cell({ x, y, bomb, bombsadj, opened }) {
  const context = useContext(DmineurContext);
  const { open, setOpen } = context.OpenContext;
  const [bombIcon, setBombIcon] = useState("💣");

  useEffect(() => {
    if (open.x === x && open.y === y && bomb) {
      setBombIcon("💥");
    }
  }, [open]);

  return (
    <CellComponent
      bombsadj={bombsadj}
      opened={opened}
      onClick={() => setOpen({ x: x, y: y, bomb: bomb, bombsadj: bombsadj })}>
      {opened ? (bomb ? bombIcon : bombsadj) : ""}
    </CellComponent>
  );
}

export default Cell;

const CellComponent = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.opened ? "#e3dede" : "#bab3b3")};
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-weight: bold;
  color: ${(props) => {
    switch (props.bombsadj) {
      case 0:
        return "#e3dede";

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
