import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from '@prisma/client';
import { OrganizationDTO } from './dto/organization.dto';

@Controller('/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('/')
  async getAllOrganizations(): Promise<Organization[]> {
    return await this.organizationService.getAllOrganizations();
  }

  @Get('/:id')
  async getOrganization(@Param('id') id: number): Promise<Organization> {
    return await this.organizationService.getOrganization(id);
  }

  @Get('/:id/coupons')
  async getOrganizationCoupons(@Param('id') id: number): Promise<Organization> {
    return await this.organizationService.getOrganization(id);
  }

  @Post('/')
  async addOrganization(
    @Body() organization: OrganizationDTO,
  ): Promise<Organization> {
    return await this.organizationService.addOrganization(organization);
  }

  @Put('/:id')
  async changeOrganization(
    @Param('id') id: number,
    @Body() organization: OrganizationDTO,
  ): Promise<Organization> {
    return await this.organizationService.changeOrganization(id, organization);
  }

  @Delete('/:id')
  async deleteOrganization(
    @Param('id') id: number,
    @Body() organization: OrganizationDTO,
  ): Promise<Organization> {
    return await this.organizationService.changeOrganization(id, organization);
  }
}
