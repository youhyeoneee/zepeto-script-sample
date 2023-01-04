import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { AnalyticsType, ZepetoAnalyticsComponent } from 'ZEPETO.Analytics';
import { Button } from 'UnityEngine.UI';

export default class CustomEvent extends ZepetoScriptBehaviour {

    public zepetoAnalytics: ZepetoAnalyticsComponent;
    public myButton: Button;

    Start() {
        this.myButton.onClick.AddListener(() => {

            // When the button is clicked, a random event is fired to Google Analytics
            const ga = this.zepetoAnalytics.Analytics(AnalyticsType.GoogleAnalytics);

            interface CustomEvent {
                param_01 : string;
                param_02 : number;
            }

            const _event : CustomEvent = {
                param_01 : "param_string_val_01",
                param_02 : 3,
            }
            ga.LogEvent<CustomEvent>("custom_sub_param", _event);
        });
    }
}