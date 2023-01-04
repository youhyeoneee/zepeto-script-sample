import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { EventTrigger, EventTriggerType } from 'UnityEngine.EventSystems';
import { Entry } from 'UnityEngine.EventSystems.EventTrigger';
 
export default class EventTriggerSample extends ZepetoScriptBehaviour {

    Start() {
        const trigger = this.gameObject.GetComponent<EventTrigger>();

        // Create eventsystem entry
        const entry = new Entry();

        // Specify event type & delegation
        entry.eventID = EventTriggerType.PointerClick;
        entry.callback.AddListener(() => {
            console.log("click")
        });

        // Register event entry
        trigger.triggers.Add(entry);

    }
}