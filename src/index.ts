import { Scheduler } from "./services/scheduler";
import { getCurrentBossLB } from "./utils/getCurrentBossLB";
import { BossLeaderboard } from "./utils/handleLeaderboardFormatting";
import { GoogleStorage } from "./services/googleStorage";

const scheduler = new Scheduler();
const lbHandler = new BossLeaderboard();
const bucket = new GoogleStorage();
const baseURL = "https://data.ninjakiwi.com/btd6/bosses";
const filePath = "serviceAccount.json";

async function startService() {
  
  let job = 1;
  try {

    console.log(`started job ${job}`)

    const googleBucket = bucket.connectToBucket(filePath);

    const currentBossLB = await getCurrentBossLB(baseURL); 
    if (!currentBossLB) return;

    const leaderboards = await lbHandler.getAllLeaderboards(currentBossLB, baseURL);

    await bucket.uploadToBucket(currentBossLB, googleBucket, leaderboards);
    
    console.log(`finished job ${job}`);
  } catch (error) {
    console.log(error);
  }
}

startService();

scheduler.startScheduler(async () => {
  startService()
}, 30);
