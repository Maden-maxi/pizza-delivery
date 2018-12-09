import { Route } from './route';
import { NotFoundController } from '../../controllers/errors/not-found.controller';
import { MethodNotAllowedController } from '../../controllers/errors/method-not-allowed.controller';
import { NotAuthorizedController } from '../../controllers/errors/not-authorized.controller';

export interface RouterOptions {
    routes: Route[];
    notFoundRoute: NotFoundController;
    methodNotAllowed: MethodNotAllowedController;
    notAuthorized: NotAuthorizedController;
}