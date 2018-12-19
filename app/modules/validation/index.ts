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
            const typeOfMin = typeof options.min === 'number';
            const typeOfMax = typeof options.max === 'number';
            if (typeOfMin && typeOfMax) {
                return options.value.trim().length >= options.min && options.value.trim().length <= options.max ? options.value.trim() : false;
            }
            if (typeOfMin) {
                return options.value.trim().length >= options.min ? options.value.trim() : false;
            }
            if (typeOfMax) {
                return options.value.trim().length <= options.max ? options.value.trim() : false;
            }
            return typeof options.value === 'string' ? options.value.trim() : false;
        default:
            return true;
    }
}