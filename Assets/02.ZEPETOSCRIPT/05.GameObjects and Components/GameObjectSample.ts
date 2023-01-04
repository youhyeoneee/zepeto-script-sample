import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { GameObject, Object, Transform, Animator, Light } from 'UnityEngine';

export default class GameObjectSample extends ZepetoScriptBehaviour {

    Start() {
        // GameObject Create
        const tempObj = new GameObject();
        const obj = Object.Instantiate(tempObj);

        // GameObject Destroy
        Object.Destroy(obj);

        // GetComponent with Generic
        const myTransform = this.GetComponent<Transform>();

        // AddComponent with Generic
        const animator = this.gameObject.AddComponent<Animator>();
    }
}