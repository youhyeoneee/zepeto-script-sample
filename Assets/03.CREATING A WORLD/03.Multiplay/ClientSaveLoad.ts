import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { PlayerPrefs } from 'UnityEngine';

export default class ClientSaveLoad extends ZepetoScriptBehaviour {

    playCntKey: string = 'PlayCnt';

    Start() {
        if (PlayerPrefs.HasKey(this.playCntKey)) {
            PlayerPrefs.SetInt(this.playCntKey, PlayerPrefs.GetInt(this.playCntKey) + 1);
            console.log(`PlayCnt : ${ PlayerPrefs.GetInt(this.playCntKey) }`);
        } else {
            PlayerPrefs.SetInt(this.playCntKey, 1);
            console.log('PlayCnt : 1');
        }
    }
}