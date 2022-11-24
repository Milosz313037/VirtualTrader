import { object, SchemaOf, setLocale, string } from 'yup';
import { UseSchema, yupLocale } from '@virtual-trader/utils';

setLocale(yupLocale);

export const userUpdateSelfSchema: SchemaOf<UserUpdateSelfDto> = object().shape({
    firstName: string().required().trim(),
    lastName: string().required().trim(),
});

@UseSchema(userUpdateSelfSchema)
export class UserUpdateSelfDto {
    firstName: string;
    lastName: string;
}
