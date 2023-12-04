import { Controller, Get, Param } from '@nestjs/common';
import { Coupon } from '@prisma/client';
import { CouponService } from './coupon.service';

@Controller('/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('/:id')
  async getOrganization(@Param('id') id: number): Promise<Coupon> {
    return await this.couponService.getCoupon(id);
  }
}
