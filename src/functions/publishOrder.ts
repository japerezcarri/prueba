'use strict';

import {Order} from "../order_model";
import { client } from "../index";

const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
let orderIn: Order;
export async function publishOrder(req: any, res: any) {
    try {
        const topicName = 'prueba';
        orderIn = req.body;
        if(orderIn.orderDesc && orderIn.orderId && orderIn.storeAdress && orderIn.userAdress){
            orderIn.createdAt= new Date();
        }
        client.set(orderIn.orderId, orderIn.storeAdress)
        const dataBuffer = Buffer.from(JSON.stringify(orderIn));
        const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
        let responseContent = '';
    
        const promise = await new Promise((resolve, reject) => {
            if (messageId) {
                responseContent = `Message ${messageId} published`;
                resolve(responseContent);
            } else {
                reject('ERROR');
            }
        });
        res.send(promise);
    } catch(e) {
        console.log(e.toString());
        res.status(500).send(e);
    }
}
