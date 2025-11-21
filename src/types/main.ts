export interface Body {
  id: string;
  name: string;
  bossType: string; 
  bossTypeURL: string;
  start: number;
  end: number;
  totalScores_standard: number;
  totalScores_elite: number;
  scoringType: string;
  normalScoringType: string;
  eliteScoringType: string;
  leaderboard_standard_players_1: string;
  leaderboard_elite_players_1: string;
  metadataStandard: string;
  metadataElite: string;
}

export interface Main {
  error: string | null;
  success: boolean;
  body: Body[];
}
