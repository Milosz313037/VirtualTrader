import { Coin, Fiat } from '@virtual-trader/shared';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'trades' })
export class Trade extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startSaldo: number;

    @Column({
        type: 'enum',
        enum: Coin,
        default: Coin.Dogecoin,
    })
    coin: Coin;

    @Column({
        type: 'enum',
        enum: Fiat,
        default: Fiat.Zloty,
    })
    fiat: Fiat;

    @Column()
    name: string;

    @Column({
        default: false,
    })
    closed: boolean;
}
