import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../core/decorator/public.decorator';
import { LoginDto } from './dto/LoginDto';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login.email, login.password);
  }
}
