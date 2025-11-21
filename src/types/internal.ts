export enum ScoringType {
  GameTime = "Game Time",
  LeastCash = "Least Cash",
  LeastTiers = "Least Tiers"
}

export interface ScoreParts {
  bossTier: number;
  score: number | string;
  secondScore?: string;
}

export interface TeamScore {
  position: number;
  members: string[];
  scoreParts: ScoreParts;
}

export interface API {
  id: string;
  boss: string;
  totalScores: number;
  scoringType: ScoringType;
  teams: TeamScore[];
  nextPage?: string;
  previousPage?: string;
}
