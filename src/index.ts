import {publishOrder} from "./functions/publishOrder";
export const redis=require('redis');


export const client=redis.createClient();
client.on('connect', function(){
   console.log('Conected to redis');
});

function middleware(req:any,res:any,next:any){
  if(req.body ===null){
    return res.status(500).end();
  }
  next(req,res);
}


exports.publishOrder=(req:any,res:any)=>middleware(req,res,publishOrder);;


