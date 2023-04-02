export interface Player {
  name: string;
  gender: "male" | "female";
  imageUrl?: string;
}

export interface ActivePlayer extends Player {
  overridePosition?: string;
  available: boolean;
}

export interface ActivePlayerOutcome extends ActivePlayer {
  recommendedPosition: string;
  kickingPosition: number;
}

export type GameState = "setup" | "active";
export type ActiveState = "kicking" | "pitching";
