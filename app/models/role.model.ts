import { TokenModel } from './token.model';

export class RoleModel {
    email: string;
    type: string;
}

export function authenticate(token, email, callback) {
    const [type, credentials] = token.split(' ');
    if (type === 'Bearer') {
        // search token in DB
        const tokenModel = new TokenModel();
        tokenModel.verify(credentials, email).then(verified => {
            callback(verified);
        });

    } else {
        callback(false);
    }

}