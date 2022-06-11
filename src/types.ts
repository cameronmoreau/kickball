export interface Player {
  name: string;
  gender: "male" | "female";
}

export interface ActivePlayer extends Player {
  overridePosition?: string;
  available: boolean;
}

export interface ActivePlayerOutcome extends ActivePlayer {
  recommendedPosition: string;
}
