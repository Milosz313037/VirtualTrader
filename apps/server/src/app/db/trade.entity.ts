import { Action } from '@virtual-trader/shared';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'trades' })
export class Trade extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: Action,
    })
    action: Action;

    @Column()
    exchange: number;

    @Column()
    quantity: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
