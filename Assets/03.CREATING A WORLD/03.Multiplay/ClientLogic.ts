import { Room, RoomData } from 'ZEPETO.Multiplay';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldMultiplay } from 'ZEPETO.World';

interface MessageModel {
    str: string,
    isTest: boolean
}

export default class ClientLogic extends ZepetoScriptBehaviour {

    private multiplay: ZepetoWorldMultiplay;

    Start() {

        this.multiplay = this.gameObject.GetComponent<ZepetoWorldMultiplay>();
        this.multiplay.RoomJoined += (room: Room) => {

            // [room.Send] 
            // Send "action" message to server
            room.Send("action", "action message");

            // Send "message" message to server
            room.Send("message", "hello");

            // Send "echo" message to server
            room.Send("echo", 1234);

            // Send RoomData "posData" message to server
            const posData = new RoomData();
            posData.Add("x", this.transform.position.x);
            posData.Add("y", this.transform.position.y);
            posData.Add("z", this.transform.position.z);
            room.Send("position", posData.GetObject());

            // Send Custom object "MessageModel" to server
            let message = {str:'test', isTest: true} as MessageModel;
            room.Send("channel_object", message);


            // [room.AddMessageHandler]
            // Add server message listener type by "echo"
            room.AddMessageHandler("echo", (message: string) => {
                // Print server message
                console.log(message);
            });

            // Add server message listener type by "action-taken"
            room.AddMessageHandler("action-taken", (message: string) => {
                // print server message
                console.log(message);
            });

            // Add server message listener type by "fire"
            room.AddMessageHandler("fire", (message: string) => {
                // Print server message
                console.log(message);
            });
        };
    }
}