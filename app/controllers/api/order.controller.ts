import { Route } from '../../modules/router/route';
import { stripeCheckout } from '../../modules/shared/stripe-pay';
import { sendMailgun } from '../../modules/shared/send-mailgun';
import { OrderModel } from '../../models/order.model';
import { BaseEntity } from '../../models/collection.model';

export class OrderController extends Route {
    path = 'api/orders';
    authRequired = ['all'];
    async post(data, callback) {

        if (data.payload.email && data.payload.amount && data.payload.description) {
            stripeCheckout(data.payload, function (response) {
                if (response.status === 200 || response.status === 201) {
                    let msg = data.payload.description.map(item => `
                ${item.title}: ${item.count} * ${item.price} = ${item.price * item.count} \r\n
                `).join('');
                    const orderModel = new OrderModel();
                    const order = {
                        ...response.data,
                        ...new BaseEntity()
                    };
                    orderModel.create(order).then(function () {
                        sendMailgun(data.payload.email, msg, function (mailResponse) {
                            callback(201, response.data, 'json');
                        });
                    });


                } else {
                    callback(400, response, 'json');
                }

            });
        } else {
            callback(400, {
                errors: {
                    error: 'email, amount and description is required'
                }
            }, 'json');
        }

    }
    async get(data, callback) {
        const orderModel = new OrderModel();
        orderModel.read(data.payload).then(value => {
            callback(200, value, 'json');
        });
    }
}