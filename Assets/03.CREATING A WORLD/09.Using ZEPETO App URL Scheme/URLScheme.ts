import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { WorldService } from 'ZEPETO.World';

export default class URLScheme extends ZepetoScriptBehaviour {

    Start() {
        let customValue = WorldService.GetCustomParamValue("key_1") as string;
        console.log(customValue);
    }

}