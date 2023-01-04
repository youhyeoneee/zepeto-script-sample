import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GetLeaderboardResponse, LeaderboardAPI } from 'ZEPETO.Script.Leaderboard';

export default class GetLeaderboardExample extends ZepetoScriptBehaviour {

    public leaderboardId: string;

    Start() {
        LeaderboardAPI.GetLeaderboard(this.leaderboardId, this.OnResult, this.OnError);
    }
    
    OnResult(result: GetLeaderboardResponse) {
        console.log(`result.isSuccess: ${result.isSuccess}`);

        if (result.leaderboard) {
            console.log(`id: ${result.leaderboard.id}, name: ${result.leaderboard.name}`);
        }
    }

    OnError(error: string) {
        console.error(error);
    }
}