import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import {Camera, Input, Physics, RaycastHit} from "UnityEngine";
 
export default class LayerExample extends ZepetoScriptBehaviour {
 
   Update(){
       if(Input.GetMouseButtonDown(0)){
           let ray = Camera.main.ScreenPointToRay(Input.mousePosition);
           let ref = $ref<RaycastHit>();
             
           let layerMask = 1 << 20;
             
           if (Physics.Raycast(ray, ref, 100, layerMask))
           {
               let hitInfo = $unref(ref);
               console.log(`name : ${hitInfo.collider.gameObject.name}`);
           }
       }
   }
}