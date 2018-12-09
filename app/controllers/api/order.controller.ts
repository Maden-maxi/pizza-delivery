import { Route } from '../../modules/router/route';
import { stripeCheckout } from '../../modules/shared/stripe-pay';
import { sendMailgun } from '../../modules/shared/send-mailgun';
import { OrderModel } from '../../models/order.model';

export class OrderController extends Route {
    path = 'api/order';
    authRequired = ['all'];
    async post(data, callback) {

        stripeCheckout(data.payload, function (response) {
            if (response.status === 200 || response.status === 201) {
                let msg = data.payload.description.map(item => `
                ${item.title}: ${item.count} * ${item.price} = ${item.price * item.count} \r\n
                `).join('');
                sendMailgun(data.payload.email, msg, function (mailResponse) {

                    if (mailResponse.status === 200) {
                        const orderModel = new OrderModel();
                        orderModel.create(response.data).then(function () {
                            callback(201, response.data);
                        });
                    } else {
                        callback(response.status, mailResponse, 'json');
                    }
                });

            } else {
                callback(400, response, 'json');
            }

        });
    }
}