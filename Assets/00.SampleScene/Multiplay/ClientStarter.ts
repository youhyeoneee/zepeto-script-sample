import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Player, State, Vector3 } from 'ZEPETO.Multiplay.Schema';
import { CharacterState, SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import * as UnityEngine from 'UnityEngine';

export default class ClientStarter extends ZepetoScriptBehaviour {
    
    public multiplay: ZepetoWorldMultiplay;
    private room: Room;
    
    //  접속된 플레이어 관리 : sessionId - Player
    private currentPlayers: Map<string, Player> = new Map<string, Player>();
    
    Start() {    
        
        // RoomCreaterd 이벤트 리스너
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
        };
        
        // RoomJoined 이벤트 리스너
        this.multiplay.RoomJoined += (room: Room) => {
            room.OnStateChange += this.OnStateChange;
        };
        
        this.StartCoroutine(this.SendMessageLoop(0.1));
    }
    
    // Send the local character transform to the server at the scheduled Interval Time.
    private *SendMessageLoop(tick: number) {
        while(true) {
            yield new UnityEngine.WaitForSeconds(tick);
            
            if ((this.room != null) && (this.room.IsConnected)) {
                const hasPlayer = ZepetoPlayers.instance.HasPlayer(this.room.SessionId);
                
                if (hasPlayer) {
                    const myPlayer = ZepetoPlayers.instance.GetPlayer(this.room.SessionId);
                    if (myPlayer.character.CurrentState != CharacterState.Idle) {
                        this.SendTransform(myPlayer.character.transform);
                    }
                }
            }
        }
    }
    private OnStateChange(state: State, isFirst: boolean) {
        
        // When the first OnStateChange event is received, a state full snapshot is received.
        if (isFirst) {

            // [CharacterController] (Local) Called when the Player instance is fully loaded in Scene
            ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
               const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
               myPlayer.character.OnChangedState.AddListener((cur, prev) => {
                   this.SendState(cur);
               });
            });

            // [CharacterController] Called when the Player instance is fully loaded in Scene
            ZepetoPlayers.instance.OnAddedPlayer.AddListener((sessionId: string) => {
                const isLocal = this.room.SessionId === sessionId;
                if (!isLocal) {
                    const player: Player = this.currentPlayers.get(sessionId);

                    // Called whenever the state of the [RoomState] player instance is updated.
                    player.OnChange += (ChangeValues) => this.OnUpdatePlayer(sessionId, player);
                }
            });
        }
        
        let join = new Map<string, Player>();
        let leave = new Map<string, Player>(this.currentPlayers);
            
        // Schema 내 RooState에 저장되어 있는 플레이어 정보들 조회
        state.players.ForEach((sessionId: string, player: Player) => {
            if (!this.currentPlayers.has(sessionId)) {
                // 지금 입장한 플레이어 등록
                join.set(sessionId, player);
            }
            
            leave.delete(sessionId);
        });

        // [RoomState] Create a player instance that entered the Room
        join.forEach((player: Player, sessionId: string) => {
            this.OnJoinPlayer(sessionId, player);
        });

        // [RoomState] Remove exited player instance from Room
        leave.forEach((player: Player, sessionId: string) => {
            this.OnLeavePlayer(sessionId, player);
        });
    }
    
    private OnJoinPlayer(sessionId: string, player: Player) {
        console.log(`[OnJoinPlayer] players - sessionId : ${sessionId}`);
        this.currentPlayers.set(sessionId, player);
        
        const spawnInfo = new SpawnInfo();
        const position = new UnityEngine.Vector3(0, 0, 0);
        const rotation = new UnityEngine.Vector3(0, 0, 0);
        
        spawnInfo.position = position;
        spawnInfo.rotation = UnityEngine.Quaternion.Euler(rotation);
        
        const isLocal = this.room.SessionId === sessionId;
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionId, player.userId, spawnInfo, isLocal);
        
    }

    private OnLeavePlayer(sessionId: string, player: Player) {
        console.log(`[OnRemove] players - sessionId ${sessionId}`);
        this.currentPlayers.delete(sessionId);
        
        ZepetoPlayers.instance.RemovePlayer(sessionId);
    }
    
    private OnUpdatePlayer(sessoinId: string, player: Player) {
        const position = this.ParseVector3(player.transform.position);
        
        const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(sessoinId);
        zepetoPlayer.character.MoveToPosition(position);
        
        if ((player.state === CharacterState.JumpIdle) || (player.state === CharacterState.Jump)) {
            zepetoPlayer.character.Jump();
        }
    }
    
    private SendState(state: CharacterState) {
        const data = new RoomData();
        data.Add("state", state);
        this.room.Send("OnChangedState", data.GetObject());
    }
    
    private SendTransform(transform: UnityEngine.Transform) {
        const data = new RoomData();
        
        const pos = new RoomData();
        pos.Add("x", transform.localPosition.x);
        pos.Add("y", transform.localPosition.y);
        pos.Add("z", transform.localPosition.z);
        data.Add("position", pos.GetObject());
        
        const rot = new RoomData();
        rot.Add("x", transform.localEulerAngles.x);
        rot.Add("y", transform.localEulerAngles.y);
        rot.Add("z", transform.localEulerAngles.z);
        data.Add("rotation", rot.GetObject());

        this.room.Send("OnChangedTransform", data.GetObject());
    }
    
    private ParseVector3(vector3: Vector3): UnityEngine.Vector3 {
        return new UnityEngine.Vector3(vector3.x, vector3.y, vector3.z);
    }
    
}