import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/core/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        enrollCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!users) {
      throw new NotFoundException('No user found.');
    }
    return { status: 200, data: users };
  }

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { status: 200, data: user };
  }

  async createUser(createUserDto: CreateUserDto, requesterRole: Role) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('This email already exists.');
    }

    if (createUserDto.role === Role.Student) {
      const existingUserByEnrollCode = await this.prisma.user.findUnique({
        where: { enrollCode: createUserDto.enrollCode },
      });

      if (existingUserByEnrollCode) {
        throw new ConflictException('Enroll code is already in use.');
      }
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userData = {
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
      role: createUserDto.role,
      ...(createUserDto.role === Role.Student && {
        enrollCode: createUserDto.enrollCode,
      }),
    };

    const createdUser = await this.prisma.user.create({
      data: userData,
    });

    return { status: 201, data: createdUser };
  }

  async deleteUser(userId: number, authId: number) {
    if (userId === authId) {
      throw new NotAcceptableException('You cant delete yourself.');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    const user = await this.prisma.user.delete({
      where: { id: userId },
    });

    return { status: 200, data: user  };
  }
}
