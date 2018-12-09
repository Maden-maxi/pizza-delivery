import { Route } from '../../modules/router/route';
import { validate } from '../../modules/validation';
import { BaseEntity } from '../../models/collection.model';
import { ProductModel } from '../../models/product.model';

export class ProductController extends Route {
    path = 'api/products';
    authRequired = ['all'];
    get(data, callback) {
        const productModel = new ProductModel();
        productModel.read().then(value => {
            callback(200, value, 'json');
        })
    }
    post(data, callback) {
        let errors = {};
        let product = {
            userId: validate({type: 'text', value: data.payload.userId, min: 2}),
            title: validate({type: 'text', value: data.payload.title, min: 2}),
            description: validate({type: 'text', value: data.payload.description, min: 10}),
            price: data.payload.price ? data.payload.price : 0
        };
        Object.keys(product).forEach(key => {
            if (!product[key]) {
                switch (key) {
                    case 'userId':
                        errors = {
                            ...errors,
                            [key]: 'User id is required'
                        };
                        break;
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
               ...new BaseEntity()
           };
           const productModel = new ProductModel();
           productModel.create(product).then(value => {
               callback(201, {...product, _id: value.insertedId}, 'json');
           })
        } else {
            callback(400, {errors}, 'json');
        }

    }
}