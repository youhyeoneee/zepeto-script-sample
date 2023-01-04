import { Camera, GameObject, RenderTexture } from 'UnityEngine';
import { Button, RawImage } from 'UnityEngine.UI';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import {VideoResolutions, WorldService, WorldVideoRecorder} from 'ZEPETO.World';
import {SpawnInfo, ZepetoPlayers} from "ZEPETO.Character.Controller";

export default class WorldVideoRecorderExample extends ZepetoScriptBehaviour {
    
    // WorldVideoRecorder Video UI 
    public startRecordingButton: Button;
    public stopRecordingButton: Button;
    public saveVideoButton: Button;
    public shareVideoButton: Button;
    public createFeedButton: Button;
    public getThumbnailButton: Button;
    public thumbnailImage: RawImage;
    
    // Target Texture 
    public targetTexture: RenderTexture;

    // VideoPlayer Object 
    private videoPlayerObject: GameObject;

    // Recorder Camera 
    private recorderCamera: Camera;


    Awake() {
        this.videoPlayerObject = new GameObject();
    }

    Start() {
        
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.recorderCamera = ZepetoPlayers.instance.LocalPlayer.zepetoCamera.camera;
        });
        
        this.startRecordingButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.StartRecording(this.recorderCamera, VideoResolutions.W1280xH720, 15)) {
                return;
            }

            this.StartCoroutine(this.CheckRecording());
        });

        this.stopRecordingButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.IsRecording()) {
                return;
            }

            WorldVideoRecorder.StopRecording();
        });

        this.saveVideoButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.IsRecording()) {
                WorldVideoRecorder.SaveToCameraRoll(result => { console.log(`${result}`) });
            }
        });

        this.shareVideoButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.IsRecording()) {
                WorldVideoRecorder.Share(result => { console.log(`${result}`) });
            }
        });

        this.createFeedButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.IsRecording()) {
                WorldVideoRecorder.CreateFeed("[contents]", result => { console.log(`${result}`) });
            }
        });

        this.getThumbnailButton.onClick.AddListener(() => {
            if (false == WorldVideoRecorder.IsRecording()) {
                this.thumbnailImage.texture = WorldVideoRecorder.GetThumbnail();
            }
        });
    }

    *CheckRecording() {
        while (WorldVideoRecorder.IsRecording()) {
            yield null;
        }

        let videoPlayer = WorldVideoRecorder.AddVideoPlayerComponent(this.videoPlayerObject, this.targetTexture);

        if (videoPlayer == null) {
            return;
        }
        
        videoPlayer.Play();
    }
}