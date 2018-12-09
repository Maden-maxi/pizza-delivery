import { Route } from '../../modules/router/route';

export class MethodNotAllowedController extends Route {
    get(data, callback) {
        callback(405, 'Method not allowed.');
    }
    post(data, callback) {
        callback(405, 'Method not allowed.');
    }
    put(data, callback) {
        callback(405, 'Method not allowed.');
    }
    delete(data, callback) {
        callback(405, 'Method not allowed.');
    }
}