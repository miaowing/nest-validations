import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class IsNumber implements PipeTransform<any> {
    private readonly message: string;
    private readonly validator: Validator;

    constructor(message?: string) {
        this.message = message || '';
        this.validator = new Validator();
    }

    async transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return value;
        }
        if (!this.validator.isNumber(value)) {
            const { data } = metadata;
            const defaults = data ? `${data} is invalid` : 'Validation failed';
            throw new BadRequestException(this.message || defaults);
        }
        return value;
    }
}
