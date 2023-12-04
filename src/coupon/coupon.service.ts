import { Injectable } from '@nestjs/common';
import { Coupon } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  public async getCoupon(id: number): Promise<Coupon> {
    return await this.prisma.coupon.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}
