import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationModule } from './organization/organization.module';
import { CouponService } from './coupon/coupon.service';
import { ScoreService } from './score/score.service';

@Module({
  imports: [
    UserModule,
    OrganizationModule,
    CouponService,
    ScoreService,
    PrismaModule,
  ],
})
export class AppModule {}
