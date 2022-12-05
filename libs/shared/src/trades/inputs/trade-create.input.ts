import { mixed, number, object, SchemaOf, setLocale } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';
import { Action } from '../../common';

setLocale(yupLocale);

export const tradeCreateSchema: SchemaOf<TradeCreateDto> = object().shape({
    action: mixed().required().oneOf(Object.values(Action)),
    exchange: number().required(),
    quantity: number().required(),
});

@UseSchema(tradeCreateSchema)
export class TradeCreateDto {
    action: Action;
    exchange: number;
    quantity: number;
}
