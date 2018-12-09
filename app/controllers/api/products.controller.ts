import { Route } from '../../modules/router/route';
import { ProductModel } from '../../models/product.model';
import { validate } from '../../modules/validation';

export class ProductsController extends Route {
    path = /^api\/products\/([a-z0-9]+)/;
    params = ['_id'];
    authRequired = ['all'];
    get(data, callback) {
        const {_id} = data.params;
        const productModel = new ProductModel();
        productModel.readOne(_id).then(value => {
            callback(200, value, 'json');
        });
    }
    put(data, callback) {
        let errors = {};
        const {_id} = data.params;
        let product: any = {
            title: validate({type: 'text', value: data.payload.title, min: 2}),
            description: validate({type: 'text', value: data.payload.description, min: 10}),
            price: data.payload.price ? data.payload.price : 0
        };
        Object.keys(product).forEach(key => {
            if (!product[key]) {
                switch (key) {
                    case 'title':
                        errors = {
                            ...errors,
                            [key]: 'Title must contains more then 2 letters'
                        };
                        break;
                    case 'description':
                        errors = {
                            ...errors,
                            [key]: 'Description must contains more then 10 letters'
                        };
                        break;
                }
            }
        });
        const productIsValid = !Object.keys(errors).length;
        if (productIsValid) {
            product = {
                ...product,
                updatedAt: Date.now()
            };
            const productModel = new ProductModel();
            productModel.update(_id, product).then(value => {
                callback(200, value, 'json');
            })
        } else {
            callback(400, {errors}, 'json');
        }
    }
    delete(data, callback) {
        const {_id} = data.params;
        const productModel = new ProductModel();
        productModel.delete(_id).then(value => {
            callback(200, value, 'json');
        });
    }
}