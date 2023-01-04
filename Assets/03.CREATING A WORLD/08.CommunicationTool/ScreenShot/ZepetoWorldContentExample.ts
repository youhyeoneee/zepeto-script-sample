import { Camera, RenderTexture } from 'UnityEngine';
import { Button, Text } from 'UnityEngine.UI';
import { SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { WorldService, ZepetoWorldContent } from 'ZEPETO.World';

export default class ZepetoWorldContentExample extends ZepetoScriptBehaviour {

    // ZepetoWorldContent ScreenShot UI
    public cameraRenderButton: Button;
    public saveToCameraRollButton: Button;
    public shareButton: Button;
    public createFeedButton: Button;
    public logText: Text;

    // Render Camera
    private camera: Camera;

    // Render Texture
    public renderTexture: RenderTexture;

    Start() {
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.camera = ZepetoPlayers.instance.LocalPlayer.zepetoCamera.camera;
        });

        this.cameraRenderButton.onClick.AddListener(() => {
            this.camera.targetTexture = this.renderTexture;
            this.camera.Render();
            this.camera.targetTexture = null;
        });

        this.saveToCameraRollButton.onClick.AddListener(() => {
            ZepetoWorldContent.SaveToCameraRoll(this.renderTexture, (result: boolean) => {
                this.logText.text = `Save Result : ${result}`;
            });
        });

        this.shareButton.onClick.AddListener(() => {
            ZepetoWorldContent.Share(this.renderTexture, (result: boolean) => {
                this.logText.text = `Share Result : ${result}`;
            });
        });

        this.createFeedButton.onClick.AddListener(() => {
            ZepetoWorldContent.CreateFeed(this.renderTexture, "[CONTENT]", (result: boolean) => {
                this.logText.text = `CreateFeed Result : ${result}`;
            });
        });
    }
}