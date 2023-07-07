import { useContext } from 'react';
import { DmineurContext } from "../../Context/Context";
import { styled } from 'styled-components';

function Header() {
  const context = useContext(DmineurContext);
  const { endGame } = context.EndGameContext;

  return <Banner>{endGame === "" ? "💣Démineur" : endGame}</Banner>;
}

export default Header

const Banner = styled.div`
  font-family: "VT323", monospace;
  font-size: 50px;
`;