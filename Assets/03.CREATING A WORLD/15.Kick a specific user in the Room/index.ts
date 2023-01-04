// import { Sandbox, SandboxOptions, SandboxPlayer } from 'ZEPETO.Multiplay';
// import { DataStorage, loadDataStorage } from 'ZEPETO.Multiplay.DataStorage';
// import { UserInfo } from 'ZEPETO.Multiplay.Schema';
//
// export default class extends Sandbox {
//
//     onCreate(options: SandboxOptions) {
//         this.onMessage("Kick", (client: SandboxPlayer, message: string) => {
//             this.tryKick(client, message);
//         });
//     }
//
//     onJoin(client: SandboxPlayer) {
//         const user = new UserInfo();
//         user.sessionId = client.sessionId;
//         user.userId = client.userId;
//
//         this.state.UserInfos.set(client.userId, user);
//     }
//
//     async tryKick(client: SandboxPlayer, userId: string) {
//         let player: SandboxPlayer;
//         if (userId == null) {
//             player = client;
//         } else {
//             const kickPlayerSessionId: string = this.state.UserInfos.get(userId).sessionId;
//             player = this.loadPlayer(kickPlayerSessionId);
//         }
//
//         console.log(`try kick : ${player.userId}`);
//         await this.kick(player);
//
//         this.broadcast("Log", `kick : ${player.userId}`);
//     }
// }