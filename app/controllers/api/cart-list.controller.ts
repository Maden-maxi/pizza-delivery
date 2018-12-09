import { Route } from '../../modules/router/route';
import { ProductModel } from '../../models/product.model';

export class CartListController extends Route {
    path = 'api/cart';
    authRequired = ['all'];
    async post(data, callback) {
        const productModel = new ProductModel();
        console.log(data.payload, data.query);
        const value = await productModel.readByIds(data.payload.ids);
        callback(200, value, 'json');
    }
}