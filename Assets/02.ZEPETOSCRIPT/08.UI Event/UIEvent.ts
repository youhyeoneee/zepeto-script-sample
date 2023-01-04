import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Slider, Button } from 'UnityEngine.UI';

export default class UIEvent extends ZepetoScriptBehaviour {

    public sliderUI: Slider;
    public btnUI: Button;

    Start() {
        this.btnUI.onClick.AddListener(() => {
            // Add button click event
            console.log('btnUI onClick');
        });
        
        this.sliderUI.onValueChanged.AddListener(v => {
            // Add slider event
            console.log(`[${v}] sliderUI onValueChanged`);
        });
    }
}