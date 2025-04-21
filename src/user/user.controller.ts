import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guard/role.guard';
import { GuardGuard } from 'src/guard/guard.guard';
import { Role } from 'src/decorators/role.guard';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all users' })
  findAll(@Query() query:{page:string,limit:string,search:string}) {
    let page = Number(query.page)||1
    let limit = Number(query.limit)||10
    let search = query.search||""
    return this.userService.findAll(page,limit,search);
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","VIEWER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string', example: 'John Doe Updated' },
        password: { type: 'string', example: 'newpassword123' },
        phoneNumber: { type: 'string', example: '+998901234568' },
        regionId: { type: 'string', example: 'region-id-001' },
        IIN: { type: 'string', example: '987654321098' },
        MFO: { type: 'string', example: '234567' },
        RS: { type: 'string', example: '987654321' },
        Bank: { type: 'string', example: 'Updated Bank' },
        OKED: { type: 'string', example: 'Updated Code' },
        ADDRESS: { type: 'string', example: '456 New St, Tashkent' },
        role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
        status: { type: 'string', enum: ['active', 'inactive'], example: 'inactive' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
