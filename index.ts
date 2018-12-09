import { environment } from './config/environment';
import { readFileSync } from 'fs';
import { PATH_TO_HTTPS_CERT, PATH_TO_HTTPS_KEY } from './config/constants';
import { controllers } from './app/controllers';
import { Router } from './app/modules/router';
import { NotFoundController } from './app/controllers/errors/not-found.controller';
import { Server } from './app/modules/server';
import { Workers } from './app/modules/workers';
import { MethodNotAllowedController } from './app/controllers/errors/method-not-allowed.controller';
import { NotAuthorizedController } from './app/controllers/errors/not-authorized.controller';

export const app = new Server({
    name: environment.APP_ENV,
    httpPort: environment.APP_HTTP_PORT,
    httpsPort: environment.APP_HTTPS_PORT,
    httpsServerOptions: {
        key: readFileSync(PATH_TO_HTTPS_KEY),
        cert: readFileSync(PATH_TO_HTTPS_CERT)
    },
    router: new Router({
        routes: controllers,
        notFoundRoute: new NotFoundController(),
        methodNotAllowed: new MethodNotAllowedController(),
        notAuthorized: new NotAuthorizedController()
    })
});

app.init().then(() => Workers.init());