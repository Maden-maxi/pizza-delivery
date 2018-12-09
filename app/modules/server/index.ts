import { createServer as createHttpServer, ServerRequest, ServerResponse, Server as HttpServer } from 'http';
import { createServer as createHttpsServer, Server as HttpsServer } from 'https';
import { parse } from 'url';
import { StringDecoder } from 'string_decoder';
import { Router } from '../router';
import { trimPath } from '../shared/trim-path';
import { jsonParse } from '../shared/json-parse';
import { authenticate } from '../../models/role.model';

export interface ServerOptions {
    httpPort: number,
    httpsPort?: number,
    name: string,
    httpsServerOptions?: {
        key: string | Buffer,
        cert: string | Buffer
    },
    defaultHeaders?: any;
    router: Router
}

export interface RequestData {
    path: string;
    query: any;
    method: string;
    headers: any;
    payload: any;
    params: any;
}


export class Server {
    private router: Router;
    private serverHandler = (request, response) => this.unifiedServer(request, response);
    private httpServer: HttpServer = createHttpServer(this.serverHandler);
    private httpsServer: HttpsServer;
    private serverOptions: ServerOptions;
    private serverInitMessage = (port) => console.log('The server is listening on port %s now in %s', port, this.serverOptions.name);
    private get httpsServerIsConfigured(): boolean {
        if (!this.serverOptions.httpsPort) {
            return false;
        }
        if (this.serverOptions.httpsServerOptions) {
            return !!this.serverOptions.httpsServerOptions.key && !!this.serverOptions.httpsServerOptions.cert;
        } else {
            return false;
        }

    }
    constructor(options: ServerOptions) {
        this.serverOptions = options;
        this.serverOptions.defaultHeaders = this.serverOptions.defaultHeaders ? this.serverOptions.defaultHeaders : {'Content-Type': 'application/json'};
        if (this.serverOptions.router) {
            this.router = this.serverOptions.router;
        }
        this.httpsServer = createHttpsServer(options.httpsServerOptions, this.serverHandler);
    }
    private unifiedServer(request: ServerRequest, response: ServerResponse) {
        const { url, method, headers } = request,
            parsedUrl = parse(url, true),
            { pathname, query } = parsedUrl,
            trimmedPath = trimPath(pathname),
            decoder = new StringDecoder('utf-8');

        let buffer = '';

        request.on('data', data => buffer += decoder.write(data));

        request.on('end', () => {
            buffer += decoder.end();
            const lowerCaseMethod = method.toLocaleLowerCase();
            const route = this.router.getRoute(trimmedPath);
            const routeParams = route.getParams(trimmedPath);
            const chosenHandler = route[lowerCaseMethod];
            const data: RequestData = {
                path: trimmedPath,
                query,
                method: lowerCaseMethod,
                headers,
                payload: jsonParse(buffer),
                params: routeParams
            };

            function runHandler() {
                chosenHandler(
                    data,
                    (
                        statusCode = 200,
                        payload = {},
                        contentType = 'json'
                    ) => {
                        let payloadString: any = payload;
                        let type = '';
                        switch (contentType) {
                            case 'json':
                                type = 'application/json';
                                payloadString = JSON.stringify(payloadString);
                                break;
                            case 'favicon':
                                type = 'image/x-icon';
                                break;
                            case 'plain':
                            case 'css':
                                type = 'text/' + contentType;
                                break;
                            case 'png':
                            case 'jpg':
                                type = 'image/' + contentType;
                                break;
                            default:
                                payloadString = payload;
                                type = 'text/html';
                        }
                        // console.log(type, payloadString, trimmedPath);
                        response.setHeader('Content-Type', type);
                        response.writeHead(statusCode);
                        response.end(payloadString);
                        // Log the requests
                        // console.log('Status code: %s.\nPayload: %s.', statusCode, payloadString);
                    });
            }

            const runNotAllowed = () => {
                this.router.methodNotAllowed[lowerCaseMethod](data, (status, payload, contentType) => {
                    const type = contentType === 'json' ? 'application/json' : 'text/html';
                    const payloadString = typeof payload === 'object' && contentType === 'html' ? JSON.stringify(payload) : payload;
                    response.setHeader('Content-Type', type);
                    response.writeHead(status);
                    response.end(payloadString);
                });
            };

            if (chosenHandler) {

                if (route.authRequired) {

                    if (route.authRequired.includes(lowerCaseMethod) || route.authRequired.includes('all')) {
                        if (headers['authorization']) {
                            const email = data.query.email || data.payload.email;
                            authenticate(headers['authorization'], email, (verified) => {
                                if (verified) {
                                    runHandler();
                                } else {
                                    this.router.notAuthorized[lowerCaseMethod](data, (status, payload, contentType) => {
                                        const type = contentType === 'json' ? 'application/json' : 'text/html';
                                        const payloadString = typeof payload === 'object' && contentType === 'html' ? JSON.stringify(payload) : payload;
                                        response.setHeader('Content-Type', type);
                                        response.writeHead(status);
                                        response.end(payloadString);
                                    });
                                }

                            });
                        } else {
                            console.log('Authorization not exists');
                            runNotAllowed();
                        }
                    } else {
                        runHandler();
                    }
                } else {
                    runHandler();
                }

            } else {
                this.router.methodNotAllowed.get(data, (status, payload, contentType) => {
                    const type = contentType === 'json' ? 'application/json' : 'text/html';
                    const payloadString = typeof payload === 'object' && contentType === 'html' ? JSON.stringify(payload) : payload;
                    response.setHeader('Content-Type', type);
                    response.writeHead(status);
                    response.end(payloadString);
                });
            }


        });

    }
    async init() {
        const httpServer = await this.httpServer.listen(
            this.serverOptions.httpPort,
            () => this.serverInitMessage(this.serverOptions.httpPort)
        );
        let httpsServer: HttpsServer;
        if (this.httpsServerIsConfigured) {
            httpsServer = await this.httpsServer.listen(
                this.serverOptions.httpsPort,
                () => this.serverInitMessage(this.serverOptions.httpsPort)
            );
        }
        return httpsServer ? {httpServer, httpsServer} : {httpServer};
    }
}