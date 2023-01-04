import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { SpawnInfo, ZepetoPlayers, LocalPlayer } from 'ZEPETO.Character.Controller';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Player, State, Vector3 } from 'ZEPETO.Multiplay.Schema';
import { WorldService } from 'ZEPETO.World';
import { Transform } from 'UnityEngine';


export default class NewTypescript extends ZepetoScriptBehaviour {

    private room: Room;
    
    OnJoinPlayer(sessionId: string, player: Player) {
    
        // Grab the user id specified from logging into zepeto through the editor. 
        const userId = WorldService.userId;
        const isLocal = this.room.SessionId === player.sessionId;
    
        // Use the sessionID as a unique ID to create a zepeto character. 
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, userId, new SpawnInfo(), isLocal);
    }
    
    OnLeavePlayer(sessionId: string, player: Player) {
    
        // Use the sessionID as a unique ID to delete a zepeto character. 
        ZepetoPlayers.instance.RemovePlayer(sessionId);
    }
    
    Start(){
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {

            // Initialize LocalPlayer ..
        });

        ZepetoPlayers.instance.OnAddedPlayer.AddListener((player_id: string) => {

            // Initialize Each Player ..
        });

        ZepetoPlayers.instance.OnRemovedPlayer.AddListener((player_id: string) => {

            // Release Each Player ..        
        });
        
        const player_id = "ttt";
        const transform: Transform = this.transform;
        const player: Player = new Player();

        const target = ZepetoPlayers.instance.GetPlayer(player_id);

        // 1) Move
        target.character.MoveToPosition(transform.position);

        // 2) Jump
        // if ((player.state === CharacterState.JumpIdle) || (player.state === CharacterState.JumpMove)){
        //     target.character.Jump();
        // }

        // 3) Teleport
        target.character.Teleport(transform.position, transform.rotation);
    }

}