export interface ValidateOptions {
    type: 'email' | 'text' | 'number';
    value: any;
    max?: number;
    min?: number;
}