import { Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour, ZepetoScriptableObject } from 'ZEPETO.Script';
// Import scriptable object type definition
import PlayerScriptObjectDef from './playerDefine/PlayerScriptObjectDef'; 

export default class ScriptableObjectSample extends ZepetoScriptBehaviour {

    public player: ZepetoScriptableObject;
    // Generic type call
    public enemy: ZepetoScriptableObject<PlayerScriptObjectDef>; 

    Awake() {
        // Direct access by name
        console.log(`play name : ${this.player["name"]}`);
        console.log(`play hp : ${this.player["hp"]}`);
        console.log(`play position : (${this.player["position"].x}, ${this.player["position"].y}, ${this.player["position"].z})`);
        console.log(`play rotation : (${this.player["rotation"].x}, ${this.player["rotation"].y}, ${this.player["rotation"].z})`);

        // Generic data call
        let monsterState = this.enemy.targetObject;
        console.log(`enemy name : ${monsterState.name}`);
        console.log(`enemy hp : ${monsterState.hp}`);
        console.log(`enemy position : (${monsterState.position.x}, ${monsterState.position.y}, ${monsterState.position.z})`);
        console.log(`enemy rotation : (${monsterState.rotation.x}, ${monsterState.rotation.y}, ${monsterState.rotation.z})`);

        // Type casting
        let playerPosition = this.player["position"] as Vector3;
        console.log(`player position : (${playerPosition.x}, ${playerPosition.y}, ${playerPosition.z})`);

        // Generic type can access class member
        console.log(`enemy position : (${monsterState.position.x}, ${monsterState.position.y}, ${monsterState.position.z})`);
    }
}