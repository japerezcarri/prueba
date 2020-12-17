"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.redis = void 0;
var publishOrder_1 = require("./functions/publishOrder");
exports.redis = require('redis');
exports.client = exports.redis.createClient();
exports.client.on('connect', function () {
    console.log('Conected to redis');
});
function middleware(req, res, next) {
    if (req.body === null) {
        return res.status(500).end();
    }
    next(req, res);
}
exports.publishOrder = function (req, res) { return middleware(req, res, publishOrder_1.publishOrder); };
;
