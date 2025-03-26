import { Controller, Post, Body, UseGuards, Req, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { VoteService } from '../services/vote.service';
import { Vote } from '../schemas/vote.schema';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() voteData: { pollId: number; selectedOption: string },
    @Req() request,
  ): Promise<Vote> {
    // Extract user ID from JWT token payload
    const voterId = request.user.userId;
    
    return this.voteService.create({
      ...voteData,
      voterId,
    });
  }

  @Get('poll/:pollId')
  async getVotesByPoll(@Param('pollId') pollId: number) {
    return this.voteService.findByPollId(pollId);
  }

  @Get('poll/:pollId/counts')
  async getVoteCounts(@Param('pollId') pollId: number) {
    return this.voteService.getVoteCountsByOption(pollId);
  }
}
