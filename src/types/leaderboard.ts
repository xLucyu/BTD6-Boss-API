export interface ScoreParts {
  type: string;
  score: number;
  name: string;
}

export interface LeaderboardBody {
  displayName: string;
  score: number;
  scoreParts: ScoreParts[]
  submissionTime: number;
  profile: string;
}

export interface Leaderboard {
  error: string | null;
  success: boolean;
  body: LeaderboardBody[];
  next: string;
  prev: string;
  maxPages: number;
}
