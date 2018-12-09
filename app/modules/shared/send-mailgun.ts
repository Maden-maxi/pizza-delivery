import { request } from 'https';
import { StringDecoder } from 'string_decoder';
import { environment } from '../../../config/environment';
import { jsonParse } from './json-parse';
import { validate } from '../validation';

export function sendMailgun(email, msg, callback) {
    const emailIsValid = validate({type: 'email', value: email});
    msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
    if(emailIsValid && msg) {
        // Configure the request payload
        const payload = {
            'from' : `Excited User <mailgun@${environment.MAILGUN_DOMAIN}>`,
            'to' : email,
            'subject': 'Order',
            'text' : msg
        };
        const stringPayload = JSON.stringify(payload);

        // Configure the request details
        const requestDetails = {
            'protocol' : 'https:',
            'hostname' : environment.MAILGUN_HOST,
            'method' : 'POST',
            'path' : environment.MAILGUN_PATH,
            'auth' : environment.MAILGUN_PASSWORD,
            'headers' : {
                'Content-Type' : 'application/json',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };

        const req = request(requestDetails,function(res) {
            // Grab the status of the sent request
            const status =  res.statusCode;
            // Callback successfully if the request went through
            if(status == 200 || status == 201){
                callback(false);
            } else {
                // callback({status, message: res.statusMessage, requestDetails, payload})
            }
            res.on('error', function (err) {
                callback(err);
            });
            const decoder = new StringDecoder('utf-8');
            let buffer = '';
            res.on('data', function (data) {
                buffer += decoder.write(data)
            });
            res.on('end', function () {
                buffer += decoder.end();
                const response = jsonParse(buffer);
                callback({status, message: res.statusMessage, requestDetails, payload, response});
            });
        });

        // Bind to the error event so it doesn't get thrown
        req.on('error',function(e) {
            callback(e);
        });

        // Add the payload
        req.write(stringPayload);

        // End the request
        req.end();

    } else {
        callback(400, {error: 'Mail is required and message'})
    }
}