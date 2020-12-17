import {Order} from '../order_model';

export async function subscribePushNotifications(req: any, res: any) {
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString();
        console.log("message", message);
        //
        const CastedData: Order = JSON.parse(message);
        console.log(CastedData);
        res.status(200).send( CastedData);
    } catch(e) {
        console.log("Error:", e);
        res.status(500).send(e.toString());
    }
}
