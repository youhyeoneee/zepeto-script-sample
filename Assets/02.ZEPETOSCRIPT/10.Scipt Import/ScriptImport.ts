import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Text } from 'UnityEngine.UI';
// Import custom script from path
import ExtraComponent from './lib/ExtraComponent';

export default class ScriptImport extends ZepetoScriptBehaviour {

    public resultUI: Text;
    private extComponent: ExtraComponent;

    Start() {
        // Add script component
        this.gameObject.AddComponent<ExtraComponent>();
        this.extComponent = this.gameObject.GetComponent<ExtraComponent>();
    }

    Update() {
        // Get value by method call
        const count = this.extComponent.GetCount();

        if (count > 10) {
            // Set value by method call
            this.extComponent.SetCount(0);
        }

        // Get public property
        const resultString = this.extComponent.stringProperty;

        // Print result
        console.log(`result : ${resultString}`);
        this.resultUI.text = resultString;
    }
}