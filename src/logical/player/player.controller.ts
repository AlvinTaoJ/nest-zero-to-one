import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PlayerService } from './player.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { LoginDTO, RegisterInfoDTO } from './player.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('player')
@Controller('player')
export class PlayerController {
  constructor(private readonly authService: AuthService, private readonly playerService: PlayerService) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  async login(@Body() loginParmas: LoginDTO) {
    // console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(loginParmas.username, loginParmas.password);
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: `账号或密码不正确`,
        };
      default:
        return {
          code: 600,
          msg: `查无此人`,
        };
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.playerService.register(body);
  }
}
