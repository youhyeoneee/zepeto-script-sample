// import { Sandbox, SandboxOptions, SandboxPlayer } from 'ZEPETO.Multiplay';
//
// export default class extends Sandbox {
//
//     onCreate(options: SandboxOptions) {
//         this.onMessage("SetPrivate", (client: SandboxPlayer, value: boolean) => {
//             console.log(`Try Set Private : ${value}`);
//             this.setPrivateRoom(client, value);
//         });
//     }
//
//     async setPrivateRoom(client: SandboxPlayer, value: boolean) {
//         await this.setPrivate(value);
//         client.send("Log", `Room Set Private : ${this.private}`);
//     }
// }