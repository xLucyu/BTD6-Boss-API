import { LeaderboardBody } from "../types/leaderboard";
import { Body } from "../types/main";
import { getApiData } from "../services/fetchURLData";

export class BossLeaderboard {
  
  async getAllLeaderboards(currentBossLB: Body, baseURL: string): Promise<void> {

    const difficulties = ["standard", "elite"];
    const playerModes = [2, 3, 4];

    for (const difficulty of difficulties) {
      for (const player of playerModes) {
        console.log(`${baseURL}/${currentBossLB.id}/leaderboard/${difficulty}/${player}`);
      }
    }

  }

}
