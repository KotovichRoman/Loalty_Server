import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';
import { hashWithSHA256 } from 'src/util/hashing-password.util';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmailAndPassword(loginUserDto: LoginUserDto): Promise<any> {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        email: loginUserDto.email,
        password: hashWithSHA256(loginUserDto.password),
      },
      select: {
        id: true,
        email: true,
        login: true,
        role: true,
      },
    });
  }

  async createUser(registrationUserDto: RegistrationUserDto): Promise<any> {
    return await this.prisma.user.create({
      data: {
        email: registrationUserDto.email,
        login: registrationUserDto.login,
        password: hashWithSHA256(registrationUserDto.password),
        role: Role.User,
      },
    });
  }
}
