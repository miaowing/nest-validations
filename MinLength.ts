import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class MinLength implements PipeTransform<any> {
    private readonly min: number;
    private readonly message: string;
    private readonly validator: Validator;

    constructor(min: number, message?: string) {
        this.message = message || '';
        this.validator = new Validator();
        this.min = min;
    }

    async transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return value;
        }
        if (!this.validator.minLength(value, this.min)) {
            const { data } = metadata;
            const defaults = data ? `${data} is invalid` : 'Validation failed';
            throw new BadRequestException(this.message || defaults);
        }
        return value;
    }
}
