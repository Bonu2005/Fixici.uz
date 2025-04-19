import {
  Controller,
  Get,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({type:CreateAuthDto})
  register(@Body() body: any) {
    return this.authService.register(body);
  }
  


@Post('login')
@ApiOperation({ summary: 'Login user' })
@ApiBody({type:LoginAuthDto})
login(@Body() loginAuthDto: any, @Req() req: Request) {
  return this.authService.login(loginAuthDto, req);
}

  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to phone' })
  @ApiBody({ schema: { example: { phoneNumber: '+998901234567' } } })
  sendOtp(@Body('phoneNumber') phoneNumber: string) {
    return this.authService.sendOtp(phoneNumber);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({
    schema: {
      example: {
        phoneNumber: '+998901234567',
        otp: '123456',
      },
    },
  })
  verify(@Body('phoneNumber') phoneNumber: string, @Body('otp') otp: string) {
    return this.authService.verify(phoneNumber, otp);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiBody({ schema: { example: { password: 'newPassword123' } } })
  resetPassword(@Body('password') password: string, @Req() req: Request) {
    return this.authService.resetpassword(password, req);
  }

  @Get('refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Post('send-otp-reset')
  @ApiOperation({ summary: 'Send OTP for password reset' })
  sendOtpReset(@Req() req: Request) {
    return this.authService.sendOtpReset(req);
  }

  @Post('verify-reset')
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiBody({
    schema: {
      example: {
        otp: '123456',
      },
    },
  })
  verifyReset(@Req() req: Request, @Body('otp') otp: string) {
    return this.authService.verifyReset(req, otp);
  }
}

