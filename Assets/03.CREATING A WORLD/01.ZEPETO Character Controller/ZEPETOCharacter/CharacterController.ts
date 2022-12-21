import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter, CharacterInfo } from 'ZEPETO.Character.Controller'
import {Quaternion, Vector3} from "UnityEngine";

export default class CharacterController extends ZepetoScriptBehaviour {
    
    Start() {
        // set character spawn location
        var spawninfo = new SpawnInfo();
        spawninfo.position = Vector3.zero;
        spawninfo.rotation = Quaternion.identity;
        
        // Enter the ZEPETO ID in [ZEPETO_ID] to load the character.
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "gamedev1", spawninfo,true);
    }
}