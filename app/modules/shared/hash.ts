import { createHmac } from 'crypto';
import { environment } from '../../../config/environment';

export function hash(str) {
    return typeof(str) == 'string' && str.length > 0
        ?
        createHmac('sha256', environment.APP_HASH_SECRET).update(str).digest('hex')
        :
        false;
}