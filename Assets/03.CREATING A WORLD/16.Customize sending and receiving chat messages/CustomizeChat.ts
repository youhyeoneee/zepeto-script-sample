import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoChat, MessageType, UserMessage } from 'ZEPETO.Chat';
import { Text } from 'UnityEngine.UI';

export default class CustomizeChat extends ZepetoScriptBehaviour {
    
    public msgText: Text;
    
    Start() {
        // Send message
        ZepetoChat.Send("Hello World");
        
        // Receive message
        ZepetoChat.OnReceivedMessage.AddListener(msg => {
            const userMsg = msg as UserMessage;
            this.msgText.text = `[USER - ${userMsg.userName}] - ${userMsg.message}`;
        });
    }

}