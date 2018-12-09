import { RouterOptions } from './router-options';
import { Route } from './route';
import { NotFoundController } from '../../controllers/errors/not-found.controller';
import { MethodNotAllowedController } from '../../controllers/errors/method-not-allowed.controller';
import { NotAuthorizedController } from '../../controllers/errors/not-authorized.controller';

export class Router {
    routes: Route[];
    notFoundRoute: NotFoundController;
    methodNotAllowed: MethodNotAllowedController;
    notAuthorized: NotAuthorizedController;
    constructor(options: RouterOptions) {
        this.routes = options.routes;
        this.notFoundRoute = options.notFoundRoute;
        this.methodNotAllowed = options.methodNotAllowed;
        this.notAuthorized = options.notAuthorized;
    }
    getRoute(url: string): Route {
        const route = this.routes.filter(
            route => typeof route.path === 'string' ? url === route.path : url.match(route.path)
        );
        console.log(route);
        if (route.length) {
            return route[0];
        }

        return this.notFoundRoute;
    }
    addRoute(route: Route) {
        this.routes = [...this.routes, route];
    }
    removeRoute(path: string | RegExp) {
        this.routes = this.routes.filter(route => route.path.toString() !== path.toString());
    }
}