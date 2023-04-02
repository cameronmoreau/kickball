import { ActivePlayer, ActivePlayerOutcome } from "./types";

export function generatePositions(
  players: ActivePlayer[],
  positions: string[]
): ActivePlayerOutcome[] {
  const result: ActivePlayerOutcome[] = [];

  let kickingPosition = 1;
  let pendingPositions = [...positions];

  let pendingPlayers = players.filter((p) => p.available);
  pendingPlayers = shuffleArray(pendingPlayers);

  // Add override positions to result
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
      kickingPosition: kickingPosition++,
      recommendedPosition: player.overridePosition as string,
    });
  }

  // Add all other players to result
  while (pendingPlayers.length) {
    const player = pendingPlayers.shift() as ActivePlayer;
    let recommendedPosition: string | null = null;

    if (pendingPositions.length > 0) {
      recommendedPosition = pendingPositions.shift() as string;
    } else {
      recommendedPosition = "Bench";
    }

    result.push({
      ...player,
      kickingPosition: kickingPosition++,
      recommendedPosition,
    });
  }

  // Sort by positions with "Bench" last
  return result.sort((a, b) => {
    const pa = positions.indexOf(a.recommendedPosition);
    const pb = positions.indexOf(b.recommendedPosition);

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
