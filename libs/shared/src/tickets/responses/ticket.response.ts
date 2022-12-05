import { Coin } from '../../common';
import { Fiat } from '../../common';

export interface TicketProfileResponse {
    id: string;
    startSaldo: number;
    coin: Coin;
    fiat: Fiat;
    name: string;
    closed: boolean;
}
