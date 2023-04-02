import React, { useCallback } from "react";
import AppContainer from "../components/AppContainer";
import PlayersTable from "../components/PlayersTable";
import { POSITIONS } from "../data";
import { generatePositions } from "../generator";
import { useKickballState } from "../state";
import { ActivePlayer } from "../types";
import Button from "../ui/Button";

interface GameSetupProps {
  onReady: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onReady }) => {
  const { players, setPlayers, setPositions } = useKickballState();

  const onAvailableChanged = useCallback(
    (player: ActivePlayer, available: boolean) => {
      const temp = [...players];
      const tp = temp.find((t) => t.name === player.name);
      tp!.available = available;
      tp!.overridePosition = undefined;
      setPlayers(temp);
    },
    [players, setPlayers]
  );

  const onOverrideChanged = useCallback(
    (player: ActivePlayer, position: string) => {
      const temp = [...players];
      temp.find((t) => t.name === player.name)!.overridePosition =
        position === "any" ? undefined : position;
      setPlayers(temp);
    },
    [players, setPlayers]
  );

  const startGame = useCallback(() => {
    setPositions(generatePositions(players, POSITIONS));
    onReady();
  }, [players, setPositions, onReady]);

  return (
    <AppContainer
      Footer={
        <div className="border-t p-2 border-gray-200 bg-white">
          <Button onClick={startGame}>Assume Positions</Button>
        </div>
      }
    >
      <PlayersTable
        players={players}
        positions={POSITIONS}
        onAvailableChanged={onAvailableChanged}
        onOverrideChanged={onOverrideChanged}
      />
    </AppContainer>
  );
};

export default GameSetup;
