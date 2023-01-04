import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GameObject } from 'UnityEngine';

export default class TagExample extends ZepetoScriptBehaviour {

    Start() {
        let findObj = GameObject.FindGameObjectWithTag("customTag");
        if (findObj != null) {
            console.log(`name : ${findObj.name}`);
        }
    }
}