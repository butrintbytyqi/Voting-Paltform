import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vote extends Document {
  @Prop({ required: true })
  pollId: number;

  @Prop({ required: true })
  selectedOption: string;

  @Prop({ required: true })
  voterId: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
