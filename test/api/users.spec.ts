import { Spec } from '../index';
import { makeRequest } from '../helpers';
import { equal, ok } from 'assert';
import { IUser } from '../../app/models/user.model';

export const apiUsersSpecs: Spec = {};

apiUsersSpecs[`POST api/users: should return status 400 if payload without required fields`] = done => {
    makeRequest('/api/users', 'POST', {}, res => {
        equal(res.status, 400);
        done();
    });
};

apiUsersSpecs[`POST api/users: should return status 201 or 400 and error that email already taken, if payload is valid`] = done => {
    const payload: IUser = {
        name: 'Test',
        email: 'test@email.com',
        address: 'Test address',
        password: '12345678',
        role: 'buyer',
        description: 'About test user',
        currency: 'usd'
    };
    makeRequest('/api/users', 'POST', payload, res => {
        console.log(res.data);
        if (res.status === 201) {
            equal(res.status, 201);
            ok(res.data._id);
            done();
            return;
        }
        if (res.status === 400) {
            ok(res.data.errors.email === 'This email already signed up');
            done();
        }
    });
};