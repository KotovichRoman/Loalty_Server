import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
