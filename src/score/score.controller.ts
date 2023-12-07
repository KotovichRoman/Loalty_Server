import { Body, Controller, Post, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { AddScoreDTO } from './dto/add-score.dto';
import { Score } from '@prisma/client';

@Controller('/score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post('/')
  async addScore(
    @Query('userId') userId: number,
    @Query('organizationId') organizationId: number,
    @Body() addScoreDTO: AddScoreDTO,
  ): Promise<Score> {
    return await this.scoreService.addScore(
      userId,
      organizationId,
      addScoreDTO,
    );
  }
}
