import { Scheduler } from "./services/scheduler";
import { getCurrentBossLB } from "./utils/getCurrentBossLB";
import { BossLeaderboard } from "./utils/handleLeaderboardFormatting";

const scheduler = new Scheduler();
const lbHandler = new BossLeaderboard();
const baseURL = "https://data.ninjakiwi.com/btd6/bosses";

async function startService() {

  const currentBossLB = await getCurrentBossLB(baseURL); 
  if (!currentBossLB) return;

  lbHandler.getAllLeaderboards(currentBossLB, baseURL);
}

scheduler.startScheduler(async () => {
  console.log("will be used later for function below");
}, 30);

startService();
