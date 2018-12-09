import { Route } from '../../modules/router/route';
import { IUser, UserModel } from '../../models/user.model';
import { BaseEntity } from '../../models/collection.model';
import { validate } from '../../modules/validation';
import { hash } from '../../modules/shared/hash';
import { CURRENCIES } from '../../../config/constants';

export class UserController extends Route {
    path = 'api/users';
    authRequired = ['get'];
    get(data, callback) {
        const userModel = new UserModel();
        userModel.read().then(value => {
            const users = value.map(user => {
                delete user.password;
                return user;
            });
            callback(200, users, 'json')
        });
    }

    /**
     * @see docs/api/users.md
     * @param data
     * @param callback
     */
    post(data, callback) {
        let errors: any = {};
        let user: IUser = {
            name: validate({type: 'text', value: data.payload.name, min: 2}),
            email: validate({type: 'email', value: data.payload.email}),
            address: validate({type: 'text', value: data.payload.address, min: 10}),
            password: validate({type: 'text', value: data.payload.password, min: 8, max: 16}),
            role: data.payload.role === 'buyer' || data.payload.role === 'seller' ? data.payload.role : false,
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
                    case 'email':
                        errors = {
                            ...errors,
                            [key]: 'Email is not valid'
                        };
                        break;
                    case 'address':
                        errors = {
                            ...errors,
                            [key]: 'Address must contains more then 10 letters'
                        };
                        break;
                    case 'password':
                        errors = {
                            ...errors,
                            [key]: 'Password must contains more then 8 and less then 16 letters'
                        };
                        break;
                    case 'role':
                        errors = {
                            ...errors,
                            [key]: 'Role must be seller or buyer'
                        };
                        break;
                    case 'currency':
                        errors = {
                            ...errors,
                            [key]: 'Currency must be ' + CURRENCIES.map(c => c.code).join(', ')
                        };
                        break;
                }
            }
        });
        const userIsValid = !Object.keys(errors).length;
        if (userIsValid) {
            user = {
                ...user,
                cart: [],
                password: hash(user.password),
                ...new BaseEntity()
            };
            const userModel = new UserModel();
            userModel.readByEmail(user.email).then((value) => {
                console.log(value);
                if (!value) {
                    userModel.create(user).then(value => callback(201, {_id: value.insertedId,...user}, 'json'));
                } else {
                    errors.email = 'This email already signed up';
                    callback(400, {errors}, 'json');
                }
            });
        } else {
            callback(400, {errors}, 'json');
        }

    }
}