import { Module } from '@nestjs/common';
import { TradesController } from './tickets.controller';
import { TradesService } from './tickets.service';

@Module({
    controllers: [TradesController],
    providers: [TradesService],
    exports: [TradesService],
})
export class TradesModule {}
