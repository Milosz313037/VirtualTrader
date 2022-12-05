import { boolean, SchemaOf, setLocale } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';
import { TicketCreateDto, ticketCreateSchema } from './ticket-create.input';

setLocale(yupLocale);

export const ticketUpdateSchema: SchemaOf<TicketUpdateDto> = ticketCreateSchema.shape({
    closed: boolean().required(),
});

@UseSchema(ticketUpdateSchema)
export class TicketUpdateDto extends TicketCreateDto {
    closed: boolean;
}
