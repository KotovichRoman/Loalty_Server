import {
  Body,
  Controller,
  Post,
  Get,
  Header,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id/qr')
  @Header('Content-Type', 'image/png')
  async getQRByCarId(
    @Param('id') carId: number,
    @Res() res: Response,
  ): Promise<void> {
    const imageBuffer = await this.userService.generateCarQR(carId);
    res.send(imageBuffer);
  }

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return await this.userService.getUserByEmailAndPassword(loginUserDto);
  }

  @Post('/registration')
  async registrationUser(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<any> {
    await this.userService.createUser(registrationUserDto);
    return { message: 'User has been created succesfully' };
  }
}
