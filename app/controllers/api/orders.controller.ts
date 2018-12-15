import { Route } from '../../modules/router/route';
import { OrderModel } from '../../models/order.model';

export class OrdersController extends Route {
    path = /^api\/orders\/([a-z0-9]+)/;
    params = ['_id'];
    authRequired = ['all'];
    async get(data, callback) {
        const {_id} = data.params;
        const orderModel = new OrderModel();
        orderModel.readOne(_id).then(value => {
            callback(200, value, 'json');
        });
    }
    async delete(data, callback) {
        const {_id} = data.params;
        const orderModel = new OrderModel();
        orderModel.delete(_id).then(value => {
            callback(200, value, 'json');
        })
    }
}