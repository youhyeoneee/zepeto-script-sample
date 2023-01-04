import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Button, InputField, Text } from 'UnityEngine.UI';
import { ZepetoChat, MessageType, UserMessage } from 'ZEPETO.Chat';
import { Color } from 'UnityEngine';


export default class CustomChat extends ZepetoScriptBehaviour {

    public custom1ChatBtn: Button;
    public custom2ChatBtn: Button;
    public sendChatBtn: Button;
    public resultText: Text;
    public inputChatbox: InputField;

    Start() {
        // When Button click
        this.custom1ChatBtn.onClick.AddListener(() => {
            // Change text color 
            this.resultText.color = Color.magenta;
            // Send Message
            ZepetoChat.Send("1");
        });
        this.custom2ChatBtn.onClick.AddListener(() => {
            this.resultText.color = Color.blue;
            ZepetoChat.Send("2");
        });
        this.sendChatBtn.onClick.AddListener(() => {
            this.resultText.color = Color.black;
            const inputMsg = this.inputChatbox.text;
            ZepetoChat.Send(inputMsg);
        });

        // Receive message
        ZepetoChat.OnReceivedMessage.AddListener(msg => {
            const userMsg = msg as UserMessage;
            this.resultText.text = `[USER - ${userMsg.userName}] - ${userMsg.message}`;
        });
    }
}