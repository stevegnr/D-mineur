/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { DmineurContext } from "../../Context/Context";

function Cell({ x, y, bomb, bombsAdj, cellulesVides }) {
  const [opened, setOpened] = useState(false);
  const [bombIcon, setBombIcon] = useState("💣");
  const context = useContext(DmineurContext);

  const { openAll, setOpenAll } = context.OpenAllContext;
  const { closeAll } = context.CloseAllContext;
  const { openEmpty, setOpenEmpty } = context.OpenEmptyContext;
  console.log(openEmpty);

  const adjacentEmptyCells = cellulesVides.filter(
    (emptyCell) =>
      emptyCell.xelement - x <= 1 &&
      emptyCell.xelement - x >= -1 &&
      emptyCell.yelement - y <= 1 &&
      emptyCell.yelement - y >= -1
  );

  console.log(adjacentEmptyCells)

  useEffect(() => {
    if (closeAll) {
      setOpened(false);
    }
  }, [closeAll]);

  useEffect(() => {
    if (openAll) {
      setOpened(true);
    }
  }, [openAll]);

  useEffect(() => {
    if (
      openEmpty &&
      bombsAdj === 0 &&
      adjacentEmptyCells.some(
        (elem) => elem.xelement === x && elem.yelement === y
      )
    ) {
      console.log("got this far");
    }
  }, [openEmpty]);

  function opening() {
    if (bomb === true) {
      setBombIcon("💥");
      setOpenAll(true);
    } else if (bombsAdj === 0) {
      setOpenEmpty({ x, y });
    }
    setOpened(true);
  }
  return (
    <CellComponent
      bombsAdj={bombsAdj}
      onClick={() => opening()}
      opened={opened}>
      {/* {opened ? (bomb ? bombIcon : bombs) : ""} */}
      {bomb ? bombIcon : bombsAdj}
    </CellComponent>
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
