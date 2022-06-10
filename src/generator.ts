import { ActivePlayer, ActivePlayerOutcome } from "./types";

export function generatePositions(
  players: ActivePlayer[],
  positions: string[]
): ActivePlayerOutcome[] {
  const result: ActivePlayerOutcome[] = [];

  let pendingPositions = [...positions];

  let pendingPlayers = players.filter((p) => p.available);
  pendingPlayers = shuffleArray(pendingPlayers);

  const overridedPendingPlayers = pendingPlayers.filter(
    (p) => !!p.overridePosition
  );

  while (overridedPendingPlayers.length) {
    const player = overridedPendingPlayers.shift() as ActivePlayer;
    const posIdx = pendingPositions.indexOf(player.overridePosition as string);

    pendingPositions.splice(posIdx, 1);
    pendingPlayers = pendingPlayers.filter((p) => p.name !== player.name);

    result.push({
      ...player,
      recomendedPosition: player.overridePosition as string,
    });
  }

  while (pendingPlayers.length) {
    const player = pendingPlayers.shift() as ActivePlayer;
    let recomendedPosition: string | null = null;

    if (pendingPositions.length > 0) {
      recomendedPosition = pendingPositions.shift() as string;
    } else {
      recomendedPosition = "Bench";
    }

    result.push({
      ...player,
      recomendedPosition,
    });
  }

  return result.sort((a, b) => {
    const pa = positions.indexOf(a.recomendedPosition);
    const pb = positions.indexOf(b.recomendedPosition);

    return pa === -1 ? 0 : pa - pb;
  });
}

function shuffleArray<T>(arr: T[]): T[] {
  const array = [...arr];

  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
