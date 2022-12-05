import { boolean, mixed, number, object, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';
import { Coin } from '../../common';
import { Fiat } from '../../common';

setLocale(yupLocale);

export const ticketCreateSchema: SchemaOf<TicketCreateDto> = object().shape({
    startSaldo: number().required(),
    coin: mixed().required().oneOf(Object.values(Coin)),
    fiat: mixed().required().oneOf(Object.values(Fiat)),
    name: string().required().trim(),
    closed: boolean().required(),
});

@UseSchema(ticketCreateSchema)
export class TicketCreateDto {
    startSaldo: number;
    coin: Coin;
    fiat: Fiat;
    name: string;
    closed: boolean;
}
