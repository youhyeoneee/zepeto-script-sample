import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GetAllLeaderboardsResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class GetAllLeaderboardExample extends ZepetoScriptBehaviour {

    Start() {
        LeaderboardAPI.GetAllLeaderboards(this.OnResult, this.OnError);
    }

    OnResult(result: GetAllLeaderboardsResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);

        if (result.leaderboards) {
            for (let i = 0; i < result.leaderboards.length; ++i) {
                const leaderboard = result.leaderboards[i];
                console.log(`i: ${i}, id: ${leaderboard.id}, name: ${leaderboard.name}`);
            }
        }
    }

    OnError(error: string) {
        console.error(error);
    }
}