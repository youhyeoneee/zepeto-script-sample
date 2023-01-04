import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { UnityEvent } from 'UnityEngine.Events';
import { Input } from 'UnityEngine';

export default class Event extends ZepetoScriptBehaviour {

    private mEvent: UnityEvent;

    Start() {
        this.mEvent = new UnityEvent();
        this.mEvent.AddListener(() => this.Ping());
    }

    Update() {
        if ((Input.anyKeyDown) && (this.mEvent != null)) {
            this.mEvent.Invoke();
        }
    }

    Ping() {
        console.log('Ping');
    }
}