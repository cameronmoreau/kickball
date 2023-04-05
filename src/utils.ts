import { ActivePlayerOutcome } from "./types";

export const orderPositionsForKicking = (positions: ActivePlayerOutcome[]) =>
  positions.sort((a, b) => a.kickingPosition - b.kickingPosition);

export const shareLineup = (positions: ActivePlayerOutcome[]) => {
  const text =
    "Kicker Lineup" +
    orderPositionsForKicking(positions).map(
      (p) => `\n#${p.kickingPosition} - ${p.name}`
    );

  window.navigator.share({
    title: "Kickball Lineup",
    text,
  });
};
