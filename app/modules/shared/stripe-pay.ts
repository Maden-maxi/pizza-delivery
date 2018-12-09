import { request } from 'https';
import { environment } from '../../../config/environment';
import { StringDecoder } from "string_decoder";
import { jsonParse } from './json-parse';
import { stringify } from 'querystring';

export function stripeCheckout(data, callback) {
    const mockToken = 'tok_visa';

    // Configure the request payload
    const payload = {
        amount: data.amount * 100, // r
        currency: 'usd', // r
        source: mockToken,
        description: JSON.stringify( data.description )
    };
    const stringPayload = stringify(payload);

    // Configure the request details

    const requestDetails = {
        'protocol' : 'https:',
        'hostname' : 'api.stripe.com',
        'method' : 'POST',
        'path' : '/v1/charges',
        'auth' : environment.STIPE_AUTH_TOKEN,
        'headers' : {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    };

    const req = request(requestDetails, function (res) {
        // Grab the status of the sent request
        const status =  res.statusCode;
        /*
        // Callback successfully if the request went through

        if(status == 200 || status == 201){
            callback(false);
        } else {
            // callback({status, message: res.statusMessage, requestDetails, payload})
        }*/
        res.on('error', function (error) {
            callback({error});
        });
        const decoder = new StringDecoder('utf-8');
        let buffer = '';
        res.on('data', function (data) {
            buffer += decoder.write(data)
        });
        res.on('end', function () {
            buffer += decoder.end();
            const response = jsonParse(buffer);

            callback( {status, data: response});

        });
    });

    // Bind to the error event so it doesn't get thrown
    req.on('error',function(error) {
        callback({error});
    });

    // Add the payload
    req.write(stringPayload);

    // End the request
    req.end();
}