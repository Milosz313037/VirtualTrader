import { number, object, SchemaOf, setLocale } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';

setLocale(yupLocale);

export const userUpdateSelfBalanceSchema: SchemaOf<UserUpdateSelfBalanceDto> = object().shape({
    balance: number(),
});

@UseSchema(userUpdateSelfBalanceSchema)
export class UserUpdateSelfBalanceDto {
    balance: number;
}
