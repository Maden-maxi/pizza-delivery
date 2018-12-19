import { environment } from '../config/environment';
import { request } from 'http';
import { StringDecoder } from "string_decoder";
import { jsonParse } from '../app/modules/shared/json-parse';

export function makeRequest(path: string, method: string, payload: any, callback: (res) => any) {
    // Configure the request details
    const adaptedMethod = method.toUpperCase();
    const stringPayload = JSON.stringify(payload);
    const requestDetails = {
        'protocol' : 'http:',
        'hostname' : 'localhost',
        'port' : environment.APP_HTTP_PORT,
        'method' : adaptedMethod,
        'path' : path,
        'headers' : {
            'Content-Type' : 'application/json',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    };
    let buffer = '';
    const decoder = new StringDecoder('utf-8');

    // Send the request
    const req = request(requestDetails,(res) => {
        res.on('data', data => buffer += decoder.write(data));
        res.on('end', () => {
            buffer += decoder.end();
            const response = jsonParse(buffer);
            callback({status: res.statusCode, data: response});
        });
        res.on('error', (error) => {
            callback({error});
        });
    });

    req.write(stringPayload);
    req.end();
}