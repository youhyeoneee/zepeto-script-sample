import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class QRMobile extends ZepetoScriptBehaviour {

    Start() {
        console.log("QR Mobile console log");
        console.warn("QR Mobile console warning");
        console.error("QR Mobile console error");
    }

}