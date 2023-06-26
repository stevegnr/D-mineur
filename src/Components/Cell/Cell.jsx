/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { DmineurContext } from "../../Context/Context";
import styled from "styled-components";

function Cell({ x, y, bomb, bombsadj, isopened }) {
  const context = useContext(DmineurContext);
  const { open, setOpen } = context.OpenContext;
  const [bombIcon, setBombIcon] = useState("💣");
  const { bombTriggered } = context.BombTriggeredContext;


  useEffect(() => {
    if (bombTriggered.x === x && bombTriggered.y === y && bomb) {
      setBombIcon("💥");
    }
  }, [open]);

  return (
    <>
      {isopened ? (
        <CellComponent
          bombsadj={bombsadj}
          isopened={isopened}>
          {isopened ? (bomb ? bombIcon : bombsadj) : ""}
        </CellComponent>
      ) : (
        <CellComponent
          isopened={isopened}
          onClick={() =>
            setOpen([
              ...open,
              {
                x: x,
                y: y,
                bomb: bomb,
                bombsadj: bombsadj,
              },
            ])
          }>
          {isopened ? (bomb ? bombIcon : bombsadj) : ""}
        </CellComponent>
      )}
    </>
  );
}

export default Cell;

const CellComponent = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${(props) => (props.isopened ? "#e3dede" : "#bab3b3")};
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
