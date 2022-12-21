import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter, ZepetoCharacterCreator } from 'ZEPETO.Character.Controller'
import { Vector2, Vector3, Transform, GameObject, Quaternion, WaitForSeconds, AnimationClip, Animator } from 'UnityEngine'

export const enum CommandTypes {
    NONE,
    CREATE,
    MOVE_TO_POSITION,
    MOVE_CONTINOUSLY,
    STOP,
    JUMP,
    TELEPORT,
    REMOVE,
    SET_GESTURE,
    CANCEL_GESTURE,
    SET_MOTION_V2,
    CHECK_MOTION_V2,
    SET_STATE_MACHINE
}

export default class ZEPETOCharacterController extends ZepetoScriptBehaviour {
    
    public command: CommandTypes;
    public zepetoId: string;
    @Header("MoveToPosition")
    public position: Vector3;

    @Header("MoveContinuosly")
    public direction: Vector3;
    
    @Header("Teleport")
    public teleportSpot: Transform;
    
    @Header("Set Gesture")
    public gesture: AnimationClip;

    @Header("Set MotionV2")
    public useDoubleJump: boolean;
    public doubleJumpPower: number;
    public useLandingRoll: boolean;
    public landingRollSpeed: number;
    public useMoveTurn: boolean;
    public gravity: number;
    
    private character: ZepetoCharacter;

    Start(){
        ZepetoCharacterCreator.CreateByZepetoId(this.zepetoId, new SpawnInfo(), (character: ZepetoCharacter) => {
            this.character = character;
        })
        this.command = CommandTypes.NONE;
    }
    
    Update(){
        this.StartCoroutine(this.ContorlCharacter());
    }
    
    private *ContorlCharacter() {
        console.log(this.command);
        switch (+this.command) {
            case CommandTypes.NONE:
                console.log("SELECT COMMAND");
                break;
                
            case CommandTypes.CREATE:
                // Create by Zepeto ID
                ZepetoCharacterCreator.CreateByZepetoId(this.zepetoId, new SpawnInfo(), (character: ZepetoCharacter) => {
                    this.character = character;
                })
                this.command = CommandTypes.NONE;
                break;
                
            case CommandTypes.MOVE_TO_POSITION:    
                // 1) MoveToPosition - Move until the character reaches the target position
                this.character.MoveToPosition(this.position);
                console.log(`MoveToPosition : `, this.position);
                break;
                
            case CommandTypes.MOVE_CONTINOUSLY:  
                // 2) MoveContinuosly - Move in the specified direction (In Update) until told otherwise.
                this.character.MoveContinuously(this.direction);
                // this.character.MoveContinuously(Vector2 direction);
                console.log(`MoveContinuosly : `, this.direction);
                break;
                
            case CommandTypes.STOP:    
                // 3) StopMoving - Halt a currently active movement.
                this.character.StopMoving();
                break;
                
            case CommandTypes.JUMP:    
                // 4) Jump - Jump at the currently set up jump height 
                this.character.Jump();
                break;
                
            case CommandTypes.TELEPORT:     
                // 5) Teleport - Instantly move to a specified Transform point. 
                this.character.Teleport(this.teleportSpot.position, this.teleportSpot.rotation);    
                break;
                
            case CommandTypes.REMOVE:
                // Remove Character
                ZepetoCharacterCreator.RemoveCharacter(this.character);
                this.command = CommandTypes.NONE;       
                break;
                
            case CommandTypes.SET_GESTURE:
                // 1) SetGesture - Play a character motion based on the specified AnimationClip on loop until CancelGesture() is called.
                this.character.SetGesture(this.gesture);
                this.command = CommandTypes.NONE;
                break;
                
            case CommandTypes.CANCEL_GESTURE:
                // 2) Cancel - Stop the current AnimationClip in motion.
                this.character.CancelGesture();
                break;
                
            case CommandTypes.SET_MOTION_V2:
                // Allows adjustment of the MotionController V2 and its related parameter values.
                this.character.MotionV2.useDoubleJump = this.useDoubleJump;
                this.character.MotionV2.doubleJumpPower = this.doubleJumpPower;
                this.character.MotionV2.useLandingRoll = this.useLandingRoll;
                this.character.MotionV2.landingRollSpeed = this.landingRollSpeed;
                this.character.MotionV2.useMoveTurn = this.useMoveTurn;
                this.character.MotionV2.Gravity = this.gravity;
                break;
                
            case CommandTypes.CHECK_MOTION_V2:
                console.log(`CurrentJumpState : ${this.character.MotionV2.CurrentJumpState}`);
                console.log(`CurrentLandingState : ${this.character.MotionV2.CurrentLandingState}`);
                console.log(`CurrentMoveState : ${this.character.MotionV2.CurrentMoveState}`);
                break;
                
            case CommandTypes.SET_STATE_MACHINE:
                // The animation is no longer automatically played by the character's StateMachine.
                this.character.StateMachine.constraintStateAnimation = true;
                var stateType = Animator.StringToHash( "State" );
                this.character.ZepetoAnimator.SetInteger(stateType, 1);
                break;
        }

        yield new WaitForSeconds(5);
    }
}

