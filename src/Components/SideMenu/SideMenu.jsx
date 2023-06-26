import { useContext } from "react";
import { DmineurContext } from "../../Context/Context";

function SideMenu() {
  const context = useContext(DmineurContext);
  const { bombs } = context.BombsContext;

  const { flags } = context.FlagsContext;

  const diff = bombs - flags - 1; // -1 car par défaut ajoute 1 ??? A corriger

  return (
    <div>
      💣{diff} {diff < 0 && "🤪"}
      {diff === 0 && "😎"}
    </div>
  );
}

export default SideMenu;
