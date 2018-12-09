import { Route } from '../../modules/router/route';

export class NotFoundController extends Route {
    get(data, callback) {
        callback(404, `Not found`);
    }
    post(data, callback) {
        callback(404, `Not found`);
    }
    put(data, callback) {
        callback(404, `Not found`);
    }
    delete(data, callback) {
        callback(404, `Not found`);
    }
}
