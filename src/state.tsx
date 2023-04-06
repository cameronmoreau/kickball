import { createContext, ReactElement, useContext, useState } from "react";
import { PLAYERS } from "./data";
import { usePersistentState } from "./localStorage";
import { ActivePlayer, ActivePlayerOutcome } from "./types";

interface State {
  players: ActivePlayer[];
  setPlayers: (players: ActivePlayer[]) => void;
  positions: ActivePlayerOutcome[];
  setPositions: (positions: ActivePlayerOutcome[]) => void;
}

export const StateContext = createContext<State>({} as any);

const StateProvider = ({ children }: { children: ReactElement }) => {
  const [players, setPlayers] = usePersistentState<ActivePlayer[]>(
    "players",
    PLAYERS.map((p) => ({ ...p, available: true }))
  );
  const [positions, setPositions] = usePersistentState<ActivePlayerOutcome[]>(
    "positions",
    []
  );

  return (
    <StateContext.Provider
      value={{ players, setPlayers, positions, setPositions }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useKickballState = () => {
  return useContext(StateContext);
};

export default StateProvider;
