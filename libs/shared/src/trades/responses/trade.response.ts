import { Action } from '../../common';

export interface TradeProfileResponse {
    id: string;
    action: Action;
    exchange: number;
    quantity: number;
    createdAt: Date;
}
