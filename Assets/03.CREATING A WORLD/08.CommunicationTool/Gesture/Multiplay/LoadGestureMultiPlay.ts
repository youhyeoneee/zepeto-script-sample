import { GameObject, Transform, Texture2D } from 'UnityEngine';
import { Button, RawImage, Text, Toggle } from 'UnityEngine.UI';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Content, OfficialContentType, ZepetoWorldContent, ZepetoWorldMultiplay } from 'ZEPETO.World';

interface PlayerGestureInfo {
    sessionId: string,
    gestureIndex: number,
    gestureType: OfficialContentType,
}
const CancelMotion = -1 as const;

export default class LoadGestureMultiPlay extends ZepetoScriptBehaviour {

    public multiplay: ZepetoWorldMultiplay;

    @SerializeField() private _contentsParent: Transform;
    @SerializeField() private _prefThumb: GameObject;
    @SerializeField() private _quitButton: Button;
    @SerializeField() private _typeToggleGroup: Toggle[];

    private _poseContents: Content[];
    private _gestureContents: Content[];

    private _poseObj: GameObject[] = [];
    private _gestureObj: GameObject[] = [];

    private _myCharacter: ZepetoCharacter;

    private room: Room;

    private Start() {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this._myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            // In order to take a thumbnail with my character, You need to request the content after the character is created.
            this.ContentRequest();
        });

        // For MultiPlay
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
            // Receive user's gesture information from the server
            this.room.AddMessageHandler("OnChangeGesture", (message: PlayerGestureInfo) => {
                let playerGestureInfo: PlayerGestureInfo = {
                    sessionId: message.sessionId,
                    gestureIndex: message.gestureIndex,
                    gestureType: message.gestureType
                };
                this.LoadAnimation(playerGestureInfo);
            });
        };

        // UI Listener
        this._typeToggleGroup[0].onValueChanged.AddListener(() => {
            this.SetCategoryUI(OfficialContentType.All);
        });
        this._typeToggleGroup[1].onValueChanged.AddListener(() => {
            this.SetCategoryUI(OfficialContentType.Gesture);
        });
        this._typeToggleGroup[2].onValueChanged.AddListener(() => {
            this.SetCategoryUI(OfficialContentType.Pose);
        });
        this._quitButton.onClick.AddListener(() => {
            this.StopGesture();
        });
    }

    // Receive content from the server
    private ContentRequest(){
        // Gesture Type Request
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.Gesture, contents => {
            this._gestureContents = contents;
            for (let i = 0; i <  this._gestureContents.length; i++) {
                if (!this._gestureContents[i].IsDownloadedThumbnail) {
                    // Take a thumbnail photo using my character
                    this._gestureContents[i].DownloadThumbnail(this._myCharacter,() => {
                        this.CreateThumbnailObjcet(i,OfficialContentType.Gesture);
                    });
                } else {
                    this.CreateThumbnailObjcet(i,OfficialContentType.Gesture);
                }
            }
        });

        // Pose Type Request
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.Pose, contents => {
            this._poseContents = contents;
            for (let i = 0; i < this._poseContents.length; i++) {
                if (!this._poseContents[i].IsDownloadedThumbnail) {
                    // Take a thumbnail photo using my character
                    this._poseContents[i].DownloadThumbnail(this._myCharacter,() => {
                        this.CreateThumbnailObjcet(i,OfficialContentType.Pose)
                    });
                } else {
                    this.CreateThumbnailObjcet(i,OfficialContentType.Pose);
                }
            }
        });

    }

    // Creating Thumbnail Objects
    private CreateThumbnailObjcet(gestureIndex: number, gestureType: OfficialContentType) {
        let content;
        if (gestureType == OfficialContentType.Gesture) {
            content = this._gestureContents[gestureIndex];
        }
        else if (gestureType == OfficialContentType.Pose) {
            content = this._poseContents[gestureIndex];
        }
        const newThumb : GameObject = GameObject.Instantiate(this._prefThumb,this._contentsParent) as GameObject;

        // Button Listener for each thumbnail
        newThumb.GetComponent<Button>().onClick.AddListener(() => {
            this.SendMyGesture(gestureIndex,gestureType);
        });
        newThumb.GetComponentInChildren<RawImage>().texture = content.Thumbnail as Texture2D;
        newThumb.GetComponentInChildren<Text>().text = content.Title;

        if (gestureType == OfficialContentType.Pose) {
            this._poseObj.push(newThumb);
        } else (gestureType == OfficialContentType.Gesture)
            this._gestureObj.push(newThumb);
    }

    // For MultiPlay
    // Send clicked gesture information to the server
    private SendMyGesture(gestureIndex: number, gestureType: OfficialContentType) {
        const data = new RoomData();
        data.Add("gestureIndex", gestureIndex);
        data.Add("gestureType", gestureType);
        this.room.Send("OnChangeGesture", data.GetObject());
    }

    private LoadAnimation(playerGestureInfo: PlayerGestureInfo) {
        const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(playerGestureInfo.sessionId).character;
        let content;
        if (playerGestureInfo.gestureIndex == CancelMotion) {
            zepetoPlayer.CancelGesture();
            return;
        }
        else if (playerGestureInfo.gestureType == OfficialContentType.Gesture) {
            content = this._gestureContents[playerGestureInfo.gestureIndex];
        }
        else if (playerGestureInfo.gestureType == OfficialContentType.Pose) {
            content = this._poseContents[playerGestureInfo.gestureIndex];
        }

        // Verify animation load
        if (!content.IsDownloadedAnimation) {
            // If the animation has not been downloaded, download it.
            content.DownloadAnimation(() => {
                // Play animation clip
                zepetoPlayer.SetGesture(content.AnimationClip);
            });
        } else {
            zepetoPlayer.SetGesture(content.AnimationClip);
        }
    }

    private StopGesture() {
        this.SendMyGesture(CancelMotion,OfficialContentType.Gesture);
    }

    // Category Toggle UI Set
    private SetCategoryUI(category:OfficialContentType) {
        if (category == OfficialContentType.All) {
            this._gestureObj.forEach(Obj => Obj.SetActive(true));
            this._poseObj.forEach(Obj => Obj.SetActive(true));
        } else if(category == OfficialContentType.Gesture) {
            this._gestureObj.forEach(Obj => Obj.SetActive(true));
            this._poseObj.forEach(Obj => Obj.SetActive(false));
        }  else if (category == OfficialContentType.Pose) {
            this._gestureObj.forEach(Obj => Obj.SetActive(false));
            this._poseObj.forEach(Obj => Obj.SetActive(true));
        }
    }

}