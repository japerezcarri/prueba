import {Order} from '../order_model';

export async function subscribePushNotifications(req: any, res: any) {
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString();
        console.log("message", message);
        //
        const CastedData: Order = JSON.parse(message);
        
        res.status(200).send( CastedData.orderDesc);
    } catch(e) {
        console.log("Error:", e);
        res.status(500).send(e.toString());
    }
}
