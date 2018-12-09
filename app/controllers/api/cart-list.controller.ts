import { Route } from '../../modules/router/route';
import { ProductModel } from '../../models/product.model';

export class CartListController extends Route {
    path = 'api/cart';
    authRequired = ['all'];
    async post(data, callback) {
        if (data.payload.ids) {
            const productModel = new ProductModel();
            const value = await productModel.readByIds(data.payload.ids);
            callback(200, value, 'json');
        } else {
            callback(400, {ids: 'ids is required'}, 'json');
        }
    }
}