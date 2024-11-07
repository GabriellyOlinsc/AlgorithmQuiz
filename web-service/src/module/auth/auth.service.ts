import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if(!user){
      throw new NotFoundException('User not found');
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const payload = { id: user.id, username: user.name, role: user.role };
      const token  = await this.jwtService.signAsync(payload);
      return {token}
    } else {
      throw new UnauthorizedException('Senha incorreta');
    }
  }
}
