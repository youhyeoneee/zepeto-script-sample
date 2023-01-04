import { GameObject, SpriteRenderer, Texture2D, Transform } from 'UnityEngine';
import { Button, RawImage, Text, Toggle } from 'UnityEngine.UI';
import { LocalPlayer, SpawnInfo, ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { OfficialContentType, WorldService, ZepetoWorldContent, Content } from 'ZEPETO.World';

export default class LoadGesture extends ZepetoScriptBehaviour {

    @SerializeField() private _contentsParent: Transform;
    @SerializeField() private _prefThumb: GameObject;
    @SerializeField() private _quitButton: Button;
    @SerializeField() private _typeToggleGroup: Toggle[];

    private _poseContents: Content[];
    private _gestureContents: Content[];

    private _poseObj: GameObject[] = [];
    private _gestureObj: GameObject[] = [];

    private _myCharacter: ZepetoCharacter;

    private Start() {
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId,new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            this._myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            // In order to take a thumbnail with my character, You need to request the content after the character is created.
            this.ContentRequest();
        });

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
        this._quitButton.onClick.AddListener(()=>{
            this.StopGesture();
        });
    }

    // Receive content from the server
    private ContentRequest() {
        // Gesture Type Request
        ZepetoWorldContent.RequestOfficialContentList(OfficialContentType.Gesture, contents => {
            this._gestureContents = contents;
            for (let i = 0; i <  this._gestureContents.length; i++) {
                if (!this._gestureContents[i].IsDownloadedThumbnail) {
                    // Take a thumbnail photo using my character
                    this._gestureContents[i].DownloadThumbnail(this._myCharacter,() => {
                        this.CreateThumbnailObject(i,OfficialContentType.Gesture);
                    });
                } else {
                    this.CreateThumbnailObject(i,OfficialContentType.Gesture);
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
                        this.CreateThumbnailObject(i,OfficialContentType.Pose)
                    });
                } else{
                    this.CreateThumbnailObject(i,OfficialContentType.Pose);
                }
            }
        });
    }

    // Creating Thumbnail Objects
    private CreateThumbnailObject(gestureIndex: number, gestureType: OfficialContentType) {
        let content;
        if (gestureType == OfficialContentType.Gesture) {
            content = this._gestureContents[gestureIndex];
        } else if (gestureType == OfficialContentType.Pose) {
            content = this._poseContents[gestureIndex];
        }
        const newThumb: GameObject = GameObject.Instantiate(this._prefThumb, this._contentsParent) as GameObject;

        // Button Listener for each thumbnail
        newThumb.GetComponent<Button>().onClick.AddListener(() => {
            this.LoadAnimation(gestureIndex, gestureType);
        });
        newThumb.GetComponentInChildren<RawImage>().texture = content.Thumbnail as Texture2D;
        newThumb.GetComponentInChildren<Text>().text = content.Title;

        if (gestureType == OfficialContentType.Pose) {
            this._poseObj.push(newThumb)
        } else (gestureType == OfficialContentType.Gesture) 
            this._gestureObj.push(newThumb);
    }

    private LoadAnimation(gestureIndex: number, gestureType: OfficialContentType){
        let content;
        if (gestureType == OfficialContentType.Gesture) {
            content = this._gestureContents[gestureIndex];
        }
        else if (gestureType == OfficialContentType.Pose) {
            content = this._poseContents[gestureIndex];
        }

        // Verify animation load
        if (!content.IsDownloadedAnimation) {
            // If the animation has not been downloaded, download it.
            content.DownloadAnimation(() => {
                // Play animation clip
                this._myCharacter.SetGesture(content.AnimationClip);
            });
        } else {
            this._myCharacter.SetGesture(content.AnimationClip);
        }
    }

    private StopGesture() {
        this._myCharacter.CancelGesture();
    }

    // Category Toggle UI Set
    private SetCategoryUI(category: OfficialContentType) {
        if (category == OfficialContentType.All) {
            this._gestureObj.forEach(Obj => Obj.SetActive(true));
            this._poseObj.forEach(Obj => Obj.SetActive(true));
        } else if (category == OfficialContentType.Gesture) {
            this._gestureObj.forEach(Obj => Obj.SetActive(true));
            this._poseObj.forEach(Obj => Obj.SetActive(false));
        } else if (category == OfficialContentType.Pose) {
            this._gestureObj.forEach(Obj => Obj.SetActive(false));
            this._poseObj.forEach(Obj => Obj.SetActive(true));
        }
    }
}