import { UserModel } from '../../models/user.model';
import { Route } from '../../modules/router/route';
import { validate } from '../../modules/validation';
import { CURRENCIES } from '../../../config/constants';

export class UsersController extends Route {
    path = /^api\/users\/([a-z0-9]+)/;
    params = ['_id'];
    authRequired = ['all'];
    get (data, callback) {
        const {_id} = data.params;
        const userModel = new UserModel();
        userModel.readOne(_id).then(value => {
            const user = value;
            delete user.password;
            callback(200, user, 'json')
        });
    }
    put(data, callback) {
        const {_id} = data.params;
        let errors = {};
        let user: any = {
            name: validate({type: 'text', value: data.payload.name, min: 2}),
            address: validate({type: 'text', value: data.payload.address, min: 10}),
            description: data.payload.description,
            currency: CURRENCIES.some(c => c.code === data.payload.currency) ? data.payload.currency : false
        };
        Object.keys(user).forEach(key => {
            if (!user[key]) {
                switch (key) {
                    case 'name':
                        errors = {
                            ...errors,
                            [key]: 'Name must contains more then 2 letters'
                        };
                        break;
                    case 'address':
                        errors = {
                            ...errors,
                            [key]: 'Address must contains more then 10 letters'
                        };
                        break;
                }
            }
        });
        const userIsValid = !Object.keys(errors).length;
        if (userIsValid) {
            user = {
                ...user,
                updatedAt: Date.now()
            };
            const userModel = new UserModel();
            userModel.update(_id, user).then(value => callback(200, value, 'json'));
        } else  {
            callback(400, {errors}, 'json');
        }

    }
    delete(data, callback) {
        const {_id} = data.params;
        const userModel = new UserModel();
        userModel.delete(_id).then(value => callback(200, value, 'json'));
    }
}