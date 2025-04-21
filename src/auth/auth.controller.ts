import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminAuthDto, CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';
import { GuardGuard } from 'src/guard/guard.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';


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
  
  
  @Post('registerAdmin')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Register a new Admin' })
  @ApiBody({type:AdminAuthDto})
  registerAdmin(@Body() body: any) {
    return this.authService.registerAdmin(body);
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
  

  @Get('me')
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get me' })
  me(@Req() req: Request) {
    return this.authService.me(req);  
  }

  @Get('myOrders')
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get myOrders' })
  myOrders(@Req() req: Request) {
    return this.authService.myOrders(req);  
  }
  
  @Get('myBasket')
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get myBasket' })
  myBasket(@Req() req: Request) {
    return this.authService.myBasket(req);  
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

