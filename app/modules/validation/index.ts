import { ValidateOptions } from './validate-options.interface';
import { emailRegex } from './regex';

export function validate (options: ValidateOptions): boolean | any {
    if (typeof options.value === 'undefined') {
        return false;
    }
    switch (options.type) {
        case 'email':
            return emailRegex.test(options.value.trim()) ? options.value.trim() : false;
        case 'text':
            if (typeof options.min === 'number' && typeof options.max === 'number') {
                return options.value.trim().length >= options.min && options.value.trim().length <= options.max ? options.value.trim() : false;
            }
            if (typeof options.min === 'number') {
                return options.value.trim().length >= options.min ? options.value.trim() : false;
            }
            if (typeof options.max === 'number') {
                return options.value.trim().length <= options.max ? options.value.trim() : false;
            }
            return typeof options.value === 'string' ? options.value.trim() : false;
        default:
            return true;
    }
}