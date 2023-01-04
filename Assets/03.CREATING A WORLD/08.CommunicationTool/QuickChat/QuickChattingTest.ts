import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { QuickMessage, WorldMultiplayChatContent, ZepetoWorldContent } from 'ZEPETO.World';

export default class QuickChattingTest extends ZepetoScriptBehaviour {
    
    Start() {
        ZepetoWorldContent.GetQuickMessageList(quickMessageList => {
            quickMessageList.forEach((quickMessage: QuickMessage, index: number, array: QuickMessage[]) => {
                console.log(`id = ${quickMessage.id}, message = ${quickMessage.message}`);               
            });
        }, err => {
            console.log(`QuickMessage Error: ${err}`);
        });
    }

    private OnClickQuickMessageButton(quickId: string) {
        WorldMultiplayChatContent.instance.SendQuickMessage(quickId);
    }
}