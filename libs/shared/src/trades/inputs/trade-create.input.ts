import { mixed, number, object, SchemaOf, setLocale } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';
import { Coin } from '../../common';

setLocale(yupLocale);

export const tradeCreateSchema: SchemaOf<TradeCreateDto> = object().shape({
    quantity: number().required(),
    exchange: number().required(),
    margin: number().required(),
    coin: mixed().required().oneOf(Object.values(Coin)),
});

@UseSchema(tradeCreateSchema)
export class TradeCreateDto {
    quantity: number;
    exchange: number;
    margin: number;
    coin: Coin;
}
