// import { Sandbox, SandboxOptions, SandboxPlayer } from 'ZEPETO.Multiplay';
// import { Player, Transform, Vector3 } from 'ZEPETO.Multiplay.Schema';
// import { DataStorage } from 'ZEPETO.Multiplay.DataStorage';
//
// export default class extends Sandbox {
//
//     onCreate(options: SandboxOptions) {
//         // Room 객체가 생성될 때 호출됩니다.
//         // Room 객체의 상태나 데이터 초기화를 처리 합니다.
//         this.onMessage("OnChangedState", (client, message) => {
//             const player = this.state.players.get(client.sessionId);
//             player.state = message.state;
//         });
//
//         this.onMessage("OnChangedTransform", (client, message) => {
//             const player = this.state.players.get(client.sessionId);
//             const transform = new Transform();
//             transform.position = new Vector3();
//             transform.position.x = message.position.x;
//             transform.position.y = message.position.y;
//             transform.position.z = message.position.z;
//
//             transform.rotation = new Vector3();
//             transform.rotation.x = message.rotation.x;
//             transform.rotation.y = message.rotation.y;
//             transform.rotation.z = message.rotation.z;
//
//             player.transform = transform;
//         });
//     }
//
//     async onJoin(client: SandboxPlayer) {
//
//         // schemas.json 에서 정의한 player 객체를 생성 후 초기값 설정.
//         console.log(`[OnJoin] sessionId: ${client.sessionId}, HashCode: ${client.hashCode}, userId: ${client.userId}`);
//
//         const player = new Player();
//         player.sessionId = client.sessionId;
//
//         if (client.hashCode) {
//             player.zepetoHash = client.hashCode;
//         }
//
//         if (client.userId) {
//             player.userId = client.userId;
//         }
//
//         // [DataStorage] 입장한 Player의 DataStorage Load
//         const storage: DataStorage = client.loadDataStorage();
//
//         let visitCnt = await storage.get("VisitCount") as number;
//         if (visitCnt == null) {
//             visitCnt = 0;
//         }
//
//         console.log(`[OnJoin] ${client.sessionId}'s visiting count : ${visitCnt}`);
//
//         // [DataStorage] Player의 방문 횟수를 갱신한다음 Storage Save
//         await storage.set("VisitCount", ++visitCnt);
//
//         // client 객체의 고유 키값인 sessionId 를 사용해서 Player 객체를 관리.
//         // set 으로 추가된 player 객체에 대한 정보를 클라이언트에서는 players 객체에 add_OnAdd 이벤트를 추가하여 확인 할 수 있음.
//         this.state.players.set(client.sessionId, player);
//
//     }
//
//     onLeave(client: SandboxPlayer, consented?: boolean){
//         this.state.players.delete(client.sessionId);
//     }
// }