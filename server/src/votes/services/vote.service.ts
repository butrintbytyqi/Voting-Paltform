import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vote } from '../schemas/vote.schema';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<Vote>,
  ) {}

  async create(voteData: { pollId: number; selectedOption: string; voterId: string }): Promise<Vote> {
    // Check if voter has already voted on this poll
    const existingVote = await this.voteModel.findOne({
      pollId: voteData.pollId,
      voterId: voteData.voterId,
    }).exec();

    if (existingVote) {
      throw new ConflictException('You have already voted on this poll');
    }

    // Create new vote
    const newVote = new this.voteModel(voteData);
    return newVote.save();
  }

  async findByPollId(pollId: number): Promise<Vote[]> {
    return this.voteModel.find({ pollId }).exec();
  }

  async getVoteCountsByOption(pollId: number): Promise<Record<string, number>> {
    const votes = await this.voteModel.find({ pollId }).exec();
    
    return votes.reduce((counts, vote) => {
      const option = vote.selectedOption;
      counts[option] = (counts[option] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
  }
}
