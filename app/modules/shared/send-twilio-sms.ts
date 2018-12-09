import { stringify } from 'querystring';
import { request } from 'https';
import { environment } from '../../../config/environment';

export function sendTwilioSms(phone, msg, callback) {
    // Validate parameters
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
    if(phone && msg){

        // Configure the request payload
        const payload = {
            'From' : environment.TWILIO_FROM_PHONE,
            'To' : '+1'+phone,
            'Body' : msg
        };
        const stringPayload = stringify(payload);


        // Configure the request details
        const requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.twilio.com',
            'method' : 'POST',
            'path' : '/2010-04-01/Accounts/' + environment.TWILIO_ACCOUNT_SID+'/Messages.json',
            'auth' : environment.TWILIO_ACCOUNT_SID + ':' + environment.TWILIO_AUTH_TOKEN,
            'headers' : {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringPayload)
            }
        };

        // Instantiate the request object
        const req = request(requestDetails,function(res) {
            // Grab the status of the sent request
            const status =  res.statusCode;
            // Callback successfully if the request went through
            if(status == 200 || status == 201){
                callback(false);
            } else {
                callback('Status code returned was ' + status);
            }
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
        callback('Given parameters were missing or invalid');
    }
}