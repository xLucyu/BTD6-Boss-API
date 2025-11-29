import { Leaderboard, LeaderboardBody } from "../types/leaderboard";
import { Body } from "../types/main";
import { getApiData } from "../services/fetchURLData";
import { ScoringType, TeamScore, LBMap } from "../types/internal";

export class BossLeaderboard {
  
  async getAllLeaderboards(currentBossLB: Body, baseURL: string): Promise<LBMap[]> {

    const difficulties = ["standard", "elite"];
    const playerModes = [2, 3, 4];
    let leaderboards = [];

    for (const difficulty of difficulties) {

      const currentScoringType = difficulty === "elite" ? currentBossLB.eliteScoringType : currentBossLB.normalScoringType;

      for (const player of playerModes) {
        
        const currentURL = `${baseURL}/${currentBossLB.id}/leaderboard/${difficulty}/${player}`;
        leaderboards.push(
          this.handleFormatting(currentURL, currentScoringType).then(leaderboard => ({
            difficulty: difficulty,
            playerCount: player,
            leaderboard: leaderboard
          }))
        )
      }
    }
    return await Promise.all(leaderboards);
  }

  private async handleFormatting(url: string, currentScoringType: string): Promise<Map<string, TeamScore>> {

    let initalPage = 1;
    let position = 1;
    let scoreboard = new Map<string, TeamScore>();

    while (true) {

      const currentLeaderboardInfo = await getApiData<Leaderboard>(`${url}?page=${initalPage}`);
      if (!currentLeaderboardInfo) break;

      for (const player of currentLeaderboardInfo?.body) {

        const { actualScore, bucketedScore } = this.getScoreKey(player, currentScoringType);
        const scoreKey = bucketedScore.join("-");

        if (scoreboard.has(scoreKey)) {
          scoreboard.get(scoreKey)!.members.push({
            displayName: player.displayName,
            profile: player.profile 
          });
        } else {
          scoreboard.set(scoreKey, {
            position: position,
            members: [{
              displayName: player.displayName,
              profile: player.profile 
            }],
            scoreParts: {
              bossTier: actualScore[0],
              score: actualScore[1],
              secondScore: actualScore[2]
            }
          });
          position++
        }
      }
      initalPage++
    }
    return scoreboard
  }

  private getScoreKey(player: LeaderboardBody, currentScoringType: string): { bucketedScore: number[], actualScore: number[] } {
  
    const actualScore = [ 
      player.scoreParts[0].score,
      player.scoreParts[1].score
    ];

    let bucketedScore = [...actualScore];

    if (currentScoringType !== ScoringType.GameTime) {
      
      const rawSecondScore = player.scoreParts[2].score;
      const bucketedSecondScore = Math.floor(rawSecondScore * 2) / 2;

      actualScore.push(rawSecondScore);
      bucketedScore.push(bucketedSecondScore)
    }

    return { actualScore, bucketedScore };
  }
}
