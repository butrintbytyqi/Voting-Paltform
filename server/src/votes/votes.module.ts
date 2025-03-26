import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { VoteController } from './controllers/vote.controller';
import { VoteService } from './services/vote.service';
import { VoteGateway } from './gateways/vote.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
  ],
  controllers: [VoteController],
  providers: [VoteService, VoteGateway],
  exports: [VoteService],
})
export class VotesModule {}
