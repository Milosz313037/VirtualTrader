import { Coin } from '../../common';

export interface TradeProfileResponse {
    id: string;
    quantity: number;
    exchange: number;
    margin: number;
    profit: number;
    coin: Coin;
    createdAt: Date;
}
