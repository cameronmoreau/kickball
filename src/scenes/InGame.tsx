import React, { useCallback, useState } from "react";
import AppContainer from "../components/AppContainer";
import KickingTable from "../components/KickingTable";
import PositionsTable from "../components/PositionsTable";
import { useKickballState } from "../state";
import Button from "../ui/Button";
import Tabs from "../ui/Tabs";

const InGame: React.FC = () => {
  const { positions, setPositions } = useKickballState();
  const [tab, setTab] = useState<string>("Kicking");
  const [selected, setSelected] = useState<Set<number>>(new Set());

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

  // TODO: better swap
  const onPlayerSwap = useCallback(() => {
    const [a, b] = Array.from(selected);
    const temp = [...positions];

    const tp = {
      name: positions[a].name,
      gender: positions[a].gender,
      imageUrl: positions[a].imageUrl,
      kickingPosition: positions[a].kickingPosition,
    };

    temp[a].name = positions[b].name;
    temp[a].gender = positions[b].gender;
    temp[a].imageUrl = positions[b].imageUrl;
    temp[a].kickingPosition = positions[b].kickingPosition;

    temp[b] = {
      ...positions[b],
      ...tp,
    };

    setPositions(temp);
    setSelected(new Set());
  }, [selected, positions, setPositions]);

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
        tab === "Pitching" && (
          <div className="border-t p-2 border-gray-200 bg-white">
            <Button onClick={onPlayerSwap} disabled={selected.size !== 2}>
              Swap
            </Button>
          </div>
        )
      }
    >
      {tab === "Kicking" && <KickingTable positions={positions} />}
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
