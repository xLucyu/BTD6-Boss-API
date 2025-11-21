import { Main, Body } from "../types/main";
import { getApiData } from "../services/fetchURLData";

export async function getCurrentBossLB(bossURL: string): Promise<Body | null> {

    const activeBossList = await getApiData<Main>(bossURL);

    if (!activeBossList) return null;

    const bossListBody = activeBossList.body;

    for (let index = 0; index < bossListBody.length; index++) {
        if (bossListBody[index].totalScores_standard === 0 && bossListBody[index].totalScores_elite === 0) continue;
        return bossListBody[index];
    }
    return null;
}
