import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrganizationModule } from './organization/organization.module';
import { CouponService } from './coupon/coupon.service';

@Module({
  imports: [UserModule, OrganizationModule, CouponService, PrismaModule],
})
export class AppModule {}
