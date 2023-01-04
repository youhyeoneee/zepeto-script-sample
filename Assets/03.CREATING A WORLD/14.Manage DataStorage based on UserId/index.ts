// import { Sandbox, SandboxOptions, SandboxPlayer } from 'ZEPETO.Multiplay';
// import { DataStorage, loadDataStorage } from 'ZEPETO.Multiplay.DataStorage';
// import { UserInfo } from 'ZEPETO.Multiplay.Schema';
//
// interface TargetData {
//     lastJoinRoom: string;
//     lastJoinTime: string;
// }
//
// export default class extends Sandbox {
//
//     onCreate(options: SandboxOptions) {
//         this.onMessage("TargetData", (client: SandboxPlayer, targetData: TargetData) => {
//             this.saveTargetData(client, targetData);
//         });
//
//         this.onMessage("GetTargetData", (client: SandboxPlayer, userId: string) => {
//             this.loadTargetData(client, userId);
//         });
//
//     }
//
//     onJoin(client: SandboxPlayer) {
//         const user = new UserInfo();
//         user.sessionId = client.sessionId;
//         user.userId = client.userId;
//         this.state.UserInfos.set(client.userId, user);
//     }
//
//     onLeave(client: SandboxPlayer, consented?: boolean) {
//         this.state.UserInfos.delete(client.userId);
//     }
//
//     async saveTargetData(client: SandboxPlayer, targetData: TargetData) {
//         console.log(`save target data (${client.userId})\n ${JSON.stringify(targetData)}`);
//         const playerStorage: DataStorage = client.loadDataStorage();
//         const result = await playerStorage.set("targetData", targetData);
//         client.send("Log", `Save Result : ${result}`);
//     }
//
//     async loadTargetData(client: SandboxPlayer, userId: string) {
//         console.log(`load target data (${userId})`);
//         const userStorage: DataStorage = await loadDataStorage(userId);
//         const targetData = await userStorage.get<TargetData>("targetData");
//         console.log(JSON.stringify(targetData));
//
//         if (targetData) {
//             client.send("TargetData", targetData);
//         } else {
//             const empty: TargetData = {
//                 lastJoinRoom: "",
//                 lastJoinTime: "",
//             }
//
//             client.send("TargetData", empty);
//         }
//     }
// }