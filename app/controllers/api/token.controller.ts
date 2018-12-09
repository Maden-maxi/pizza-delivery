import { Route } from '../../modules/router/route';
import { IToken, TokenModel } from '../../models/token.model';
import { validate } from '../../modules/validation';
import { environment } from '../../../config/environment';
import { UserModel } from '../../models/user.model';
import { hash } from '../../modules/shared/hash';

export class TokenController extends Route {
    path = 'api/tokens';
    authRequired = ['put', 'get', 'delete'];
    post(data, callback) {
        let errors: any = {};
        const email = validate({type: 'email', value: data.payload.email});
        const password = validate({type: 'text', min: 8, value: data.payload.password});
        if (!email) {
            errors.email = 'Email is invalid';
        }
        if (!password) {
            errors.passowrd = 'Password must contain more then 7 symbols';
        }

        if (!Object.keys(errors).length) {
            const userModel = new UserModel();

            userModel.readByEmail(email).then(user => {
                if (user) {
                    const hashedPassword = hash(password);
                    console.log(hashedPassword, user.password);
                    if (user.password === hashedPassword) {
                        let token: IToken = {
                            user,
                            email,
                            expires: parseInt(environment.APP_TOKEN_EXPIRES, 10) + Date.now()
                        };
                        const tokenModel = new TokenModel();
                        tokenModel.create(token).then(value => {
                            callback(200, {token: value.insertedId, ...token}, 'json');
                        });
                    } else {
                        errors.credentials = 'Credentials is not matched';
                        callback(403, {errors}, 'json');
                    }
                } else {
                    errors.credentials = 'Credentials is not matched';
                    callback(403, {errors}, 'json');
                }
            });

        } else {
            callback(400, {errors}, 'json');
        }
    }
    put(data, callback) {
        const _id = data.payload.token;
        if (_id) {
            const tokenModel = new TokenModel();
            tokenModel.readOne(_id).then(token => {
                if (token.expires > Date.now()) {
                    tokenModel.update(_id, {expires: parseInt(environment.APP_TOKEN_EXPIRES, 10) + Date.now()}).then(value => {
                        callback(200, value.value, 'json');
                    })
                } else {
                    callback(400, {
                        errors: {
                            expired: 'The token has already expired, and cannot be extended.'
                        }
                    })
                }
            });
        } else {
            callback(400, {errors: {token: 'Token is required'}})
        }
    }
    get (data, callback) {
        const {token} = data.payload;
        const tokenModel = new TokenModel();
        tokenModel.readOne(token).then(value => {
            callback(200, value, 'json');
        })
    }
    delete(data, callback) {
        const token = data.payload;
        const shop = new TokenModel();
        shop.delete(token._id).then(value => {
            callback(200, value, 'json');
        })
    }
}