import { Route } from '../../modules/router/route';

export class NotAuthorizedController extends Route {
    get(data, callback) {
        callback(403, 'Not Authorized.');
    }
    post(data, callback) {
        callback(403, 'Not Authorized.');
    }
    put(data, callback) {
        callback(403, 'Not Authorized.');
    }
    delete(data, callback) {
        callback(403, 'Not Authorized.');
    }
}