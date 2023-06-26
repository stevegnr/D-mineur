/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";
import { styled } from "styled-components";

function SideMenu() {
  const context = useContext(DmineurContext);
  const { bombs } = context.BombsContext;

  const { flags } = context.FlagsContext;

  const diff = bombs - flags - 1; // -1 car par défaut ajoute 1 ??? A corriger

  return (
    <StyledSideMenu>
      💣{diff} {diff < 0 && "🤪"}
      {diff === 0 && "😎"}
    </StyledSideMenu>
  );
}

export default SideMenu;

const StyledSideMenu = styled.div`
  position: absolute;
  right: -75px;
  top: 50%;
  transform: translateY(-50%);
  font-size: larger;
`;
