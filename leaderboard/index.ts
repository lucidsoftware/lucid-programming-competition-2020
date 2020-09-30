import * as leaderboard from './leaderboard';
import * as balloonQueue from './balloonQueue';

exports.handler = async (event, context, callback) => {

    try {
        callback(null,{
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": { 'content-type': 'text/html'},
            "body": await leaderboard.getHtml((event && event.queryStringParameters && event.queryStringParameters.school) || '')
        });
    } catch(e) {
        callback(e);
    }
};

exports.queue = async (event, context, callback) => {
    try {
        callback(null,{
            "isBase64Encoded": false,
            "statusCode": 200,
            "headers": { 'content-type': 'text/html'},
            "body": await balloonQueue.getHtml((event && event.queryStringParameters && event.queryStringParameters.school) || '')
        });
    } catch(e) {
        callback(e);
    }
}