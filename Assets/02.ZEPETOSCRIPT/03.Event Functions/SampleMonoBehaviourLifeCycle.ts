import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Collider, Collider2D, Collision, Collision2D } from 'UnityEngine';

export default class SampleMonoBehaviourLifeCycle extends ZepetoScriptBehaviour {

    Awake() {
        console.log('Awake.');
    }
    OnEnable() {
        console.log('OnEnable.');
    }
    Start() {
        console.log('Start.');
    }

    Update() {
        console.log('OnUpdate.');
    }
    FixedUpdate() {
        console.log('FixedUpdate.');
    }
    LateUpdate() {
        console.log('LateUpdate.');
    }

    OnDisable() {
        console.log('OnDisable.');
    }
    OnDestroy() {
        console.log('OnDestroy.');
    }

    OnTriggerEnter(coll: Collider) {
        console.log(`OnTriggerEnter ${coll.gameObject.name}.`);
    }
    OnTriggerExit(coll: Collider) {
        console.log(`OnTriggerExit ${coll.gameObject.name}.`);
    }
    OnTriggerStay(coll: Collider) {
        console.log(`OnTriggerStay ${coll.gameObject.name}.`);
    }

    OnTriggerEnter2D(coll: Collider2D) {
        console.log(`OnTriggerEnter2D ${coll.gameObject.name}.`);
    }
    OnTriggerExit2D(coll: Collider2D) {
        console.log(`OnTriggerExit2D ${coll.gameObject.name}.`);
    }
    OnTriggerStay2D(coll: Collider2D) {
        console.log(`OnTriggerStay2D ${coll.gameObject.name}.`);
    }

    OnCollisionEnter(coll: Collision) {
        console.log(`OnCollisionEnter ${coll.gameObject.name}.`);
    }
    OnCollisionExit(coll: Collision) {
        console.log(`OnCollisionExit ${coll.gameObject.name}.`);
    }
    OnCollisionStay(coll: Collision) {
        console.log(`OnCollisionStay ${coll.gameObject.name}.`);
    }

    OnCollisionEnter2D(coll: Collision2D) {
        console.log(`OnCollisionEnter2D ${coll.gameObject.name}.`);
    }
    OnCollisionExit2D(coll: Collision2D) {
        console.log(`OnCollisionExit2D ${coll.gameObject.name}.`);
    }
    OnCollisionStay2D(coll: Collision2D) {
        console.log(`OnCollisionStay2D ${coll.gameObject.name}.`);
    }

    OnGUI() {
        console.log('OnGUI.');
    }
    OnMouseDown() {
        console.log('OnMouseDown.');
    }
    OnMouseDrag() {
        console.log('OnMouseDrag.');
    }
    OnMouseUp() {
        console.log('OnMouseUp.');
    }
    OnMouseEnter() {
        console.log('OnMouseEnter.');
    }
    OnMouseExit() {
        console.log('OnMouseExit.');
    }
    OnMouseOver() {
        console.log('OnMouseOver.');
    }
    OnMouseUpAsButton() {
        console.log('OnMouseUpAsButton.');
    }

    OnAnimatorIK(layerIndex: number) {
        console.log(`OnAnimatorIK ${layerIndex}.`);
    }

    OnApplicationFocus() {
        console.log('OnApplicationFocus.');
    }
    OnApplicationPause() {
        console.log('OnApplicationPause.');
    }
    OnApplicationQuit() {
        console.log('OnApplicationQuit.');
    }

}