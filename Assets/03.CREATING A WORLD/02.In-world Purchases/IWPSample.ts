import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class IWPSample extends ZepetoScriptBehaviour {

    OnPurchaseComplete(item) {
        console.log("OnPurchaseComplete");
        console.log(`item.itemId : ${item.itemId}, item.name : ${item.name}, item.description : ${item.description}, item.price : ${item.price}`);
    }

    OnPurchaseFailed(error) {
        console.log(`OnPurchaseFailed : ${error.message}`);
    }
}