import {
  ArrowPathRoundedSquareIcon,
  CheckIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import React, { useCallback, useState } from "react";
import AppContainer from "../components/AppContainer";
import KickingTable from "../components/KickingTable";
import PositionsTable from "../components/PositionsTable";
import { useKickballState } from "../state";
import { ActivePlayerOutcome } from "../types";
import Button from "../ui/Button";
import Tabs from "../ui/Tabs";
import { shareLineup } from "../utils";

const InGame: React.FC = () => {
  const { positions, setPositions } = useKickballState();
  const [tab, setTab] = useState<string>("Kicking");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [editLineup, setEditLineup] = useState(false);

  const onSelectedChanged = useCallback(
    (idx: number, s: boolean) => {
      const temp = new Set([...Array.from(selected)]);
      if (s) {
        temp.add(idx);
      } else {
        temp.delete(idx);
      }

      setSelected(temp);
    },
    [selected]
  );

  const onPlayerSwap = useCallback(() => {
    const [a, b] = Array.from(selected);
    const temp = [...positions];

    const x = temp[a].recommendedPosition;
    const y = temp[b].recommendedPosition;

    temp[a].recommendedPosition = y;
    temp[b].recommendedPosition = x;

    setPositions(temp);
    setSelected(new Set());
  }, [selected, positions, setPositions]);

  const onMovePlayer = useCallback(
    (player: ActivePlayerOutcome, direction: "up" | "down") => {
      const offset = direction === "up" ? -1 : 1;
      const temp = [...positions];

      let pIndex = positions.findIndex((p) => p.name === player.name);
      let nIndex = positions.findIndex(
        (p) => p.kickingPosition === player.kickingPosition + offset
      );

      temp[pIndex].kickingPosition += offset;
      temp[nIndex].kickingPosition -= offset;

      setPositions(temp);
    },
    [positions, setPositions]
  );

  return (
    <AppContainer
      Header={
        <div className="bg-white">
          <Tabs
            tabs={["Kicking", "Pitching"]}
            selected={tab}
            onTabClick={setTab}
          />
        </div>
      }
      Footer={
        <div>
          {tab === "Pitching" && (
            <div className="border-t p-2 border-gray-200 bg-white">
              <Button onClick={onPlayerSwap} disabled={selected.size !== 2}>
                <ArrowPathRoundedSquareIcon className="mr-1 h-5 w-5" />
                Swap
              </Button>
            </div>
          )}
          {tab === "Kicking" && (
            <div className="border-t p-2 border-gray-200 bg-white flex justify-between">
              {editLineup ? (
                <Button onClick={() => setEditLineup(false)}>
                  <CheckIcon className="mr-1 h-5 w-5" />
                  Done
                </Button>
              ) : (
                <>
                  <Button onClick={() => setEditLineup(true)}>
                    <PencilSquareIcon className="mr-1 h-5 w-5" />
                    Edit
                  </Button>
                  <Button onClick={() => shareLineup(positions)}>
                    <PaperAirplaneIcon className="mr-1 h-5 w-5" />
                    Share Lineup
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      }
    >
      {tab === "Kicking" && (
        <KickingTable
          editLineup={editLineup}
          positions={positions}
          onMovePlayer={onMovePlayer}
        />
      )}
      {tab === "Pitching" && (
        <PositionsTable
          positions={positions}
          selectedIndexes={selected}
          onSelectChanged={onSelectedChanged}
        />
      )}
    </AppContainer>
  );
};

export default InGame;
