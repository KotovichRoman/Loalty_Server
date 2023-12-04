import { Injectable } from '@nestjs/common';
import { Coupon, Organization } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizationDTO } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  public async getAllOrganizations(): Promise<Organization[]> {
    return await this.prisma.organization.findMany();
  }

  public async getOrganization(id: number): Promise<Organization> {
    return await this.prisma.organization.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async getOrganizationCoupons(id: number): Promise<Coupon[]> {
    return await this.prisma.coupon.findMany({
      where: {
        organizationId: id,
      },
    });
  }

  public async addOrganization(
    organization: OrganizationDTO,
  ): Promise<Organization> {
    return await this.prisma.organization.create({
      data: {
        name: organization.name,
        rating: 0,
        ownerId: organization.ownerId,
      },
    });
  }

  public async changeOrganization(
    id: number,
    organization: OrganizationDTO,
  ): Promise<Organization> {
    return await this.prisma.organization.update({
      where: {
        id: id,
      },
      data: {
        name: organization.name,
        rating: 0,
        ownerId: organization.ownerId,
      },
    });
  }
}
