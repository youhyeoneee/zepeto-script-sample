import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Transform } from "UnityEngine";

export default class AttributeTest extends ZepetoScriptBehaviour {

    // public Property that does not need to be Serialized
    @NonSerialized()
    public strValue:string;
    
    // Property that should not be exposed on the Inspector
    @HideInInspector()
    public strValue2:string;
    
    // private Property that needs to be Serialized
    @SerializeField()
    private strValue3:string;
    
    // Addition of header above Property  
    @Header("Header Title")
    public stringProperty: string;
    
    // Addition of spaces between Property
    @Space(10)
    public numberProperty: number;
    
    // Addition of tooltip that appears when the mouse is positioned on the Property
    @Tooltip("This is Tooltip")
    public transformProperty: Transform;

}