import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Vector3, GameObject, Transform } from 'UnityEngine'

export default class Properties extends ZepetoScriptBehaviour {

    public floatValue: float;
    public strValue: string;

    public gameOject: GameObject;
    public transformValue: Transform;    

    @SerializeField()
    private vectorValue: Vector3;
    
    Start() 
    {
        console.log(typeof(this.floatValues));
        console.log(`floatValue : ${this.floatValue}`);
        console.log(`strValue : ${this.strValue}`);
        
        console.log(`${this.floatValues.length}`)
    }

    Update() {
        console.log(`floatValue : ${this.floatValue}`);
        console.log(`strValue : ${this.strValue}`);
    
        // Rotate Cube_A
        var transform = this.gameOject.GetComponent<Transform>();
        transform.Rotate(this.vectorValue);
    
        // Rotate Cube_B
        this.transformValue.Rotate(this.vectorValue);
    }
}