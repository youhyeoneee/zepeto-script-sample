import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoIWPButton } from 'ZEPETO.IWP';

export default class IWPTest extends ZepetoScriptBehaviour {

    public zepetoIWPButton: ZepetoIWPButton;

    Start() {
        this.zepetoIWPButton.SetItemId("item_01");
    }
}