import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Physics, RaycastHit, Input, Camera } from 'UnityEngine';

export default class RaycastSample extends ZepetoScriptBehaviour {

    Update() {
        this.MouseControl();
    }
    
    MouseControl() {
        if (Input.GetMouseButtonDown(0)) {
            let ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    
            // Please note that In order to retain the RaycastHit information as an output parameter it must be wrapped in a $ref tag. 
            // Because we require the out qualifier as a parameter, we create a reference without actually creating an object.          
            let ref = $ref<RaycastHit>();
    
            if(Physics.Raycast(ray, ref, 1000)) {
                // To check the returned Raycast hit data, please remember to unwrap the reference by using $unref
                let hitInfo = $unref(ref);
    
                console.log(`Detect Hit!`);
                console.log(`hitInfo.collider.name : ${hitInfo.collider.name}`);
            } else {
                console.log(`Failed to Detect Collision`);
            }
        }
    }

}