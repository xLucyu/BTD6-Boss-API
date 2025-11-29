import { Storage, Bucket } from "@google-cloud/storage";
import { API, LBMap, ScoringType } from "../types/internal";
import { Body } from "../types/main";

export class GoogleStorage {

  connectToBucket(filePath: string): Bucket {

    const getStorage = new Storage({
      keyFilename: filePath
    });

    return getStorage.bucket("btd6_boss_leaderboard");
  }

  async uploadToBucket(currentBossLeaderboard: Body, bucket: Bucket, leaderboards: LBMap[]) {

    for (const leaderboard of leaderboards) {
 
      const bucketExtension = `${currentBossLeaderboard.id}/${leaderboard.difficulty}/${leaderboard.playerCount}`;

      const buildLeaderboardJSON: API = {
        id: currentBossLeaderboard.id,
        boss: currentBossLeaderboard.bossType,
        totalScores: leaderboard.leaderboard.size,
        scoringType: currentBossLeaderboard.scoringType as ScoringType,
        teams: Array.from(leaderboard.leaderboard.values())
      };
      
      const fileName = bucket.file(`${bucketExtension}/leaderboard.json`);
      await fileName.save(JSON.stringify(buildLeaderboardJSON, null, 2), {
        contentType: "application/json",
        resumable: false 
      });
    }
  }
}
