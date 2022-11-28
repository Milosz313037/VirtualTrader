import { Coin } from '@virtual-trader/shared';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'trades' })
export class Trade extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @Column()
    exchange: number;

    @Column()
    margin: number;

    @Column()
    profit: number;

    @Column({
        type: 'enum',
        enum: Coin,
        default: Coin.Dogecoin,
    })
    role: Coin;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
