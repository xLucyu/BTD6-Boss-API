export enum ScoringType {
  GameTime = "Game Time",
  LeastCash = "Least Cash",
  LeastTiers = "Least Tiers"
}

export interface ScoreParts {
  bossTier: number;
  score: number | string;
  secondScore?: number;
}

export interface Member {
  displayName: string;
  profile: string;
}

export interface TeamScore {
  position: number;
  members: Member[];
  scoreParts: ScoreParts;
}

export interface API {
  id: string;
  boss: string;
  totalScores: number;
  scoringType: ScoringType;
  teams: TeamScore[];
}


// used when filtering the leaderboards
export interface LBMap {
  difficulty: string;
  playerCount: number;
  leaderboard: Map<string, TeamScore>;
}
