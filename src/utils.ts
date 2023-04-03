import { ActivePlayerOutcome } from "./types";

export const orderPositionsForKicking = (positions: ActivePlayerOutcome[]) =>
  positions.sort((a, b) => a.kickingPosition - b.kickingPosition);

export const shareLineup = (positions: ActivePlayerOutcome[]) => {
  const text =
    "Kicker Lineup\n" +
    orderPositionsForKicking(positions).map(
      (p) => `#${p.kickingPosition} - ${p.name}`
    );

  window.navigator.share({
    title: "Kickball Lineup",
    text,
  });
};
