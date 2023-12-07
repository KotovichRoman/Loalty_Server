import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddScoreDTO } from './dto/add-score.dto';
import { Score } from '@prisma/client';

@Injectable()
export class ScoreService {
  constructor(private prisma: PrismaService) {}

  public async addScore(
    userId: number,
    organizationId: number,
    addScoreDTO: AddScoreDTO,
  ): Promise<Score> {
    const currentScore = await this.prisma.score.findFirst({
      where: {
        userId: userId,
        organizationId: organizationId,
      },
    });

    return await this.prisma.score.update({
      where: {
        id: currentScore.id,
      },
      data: {
        count: currentScore.count + addScoreDTO.count,
      },
    });
  }
}
