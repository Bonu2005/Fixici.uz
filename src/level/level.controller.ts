import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { ApiOperation, ApiBody, ApiTags, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorators/role.guard';
import { GuardGuard } from 'src/guard/guard.guard';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new level' })
  @ApiBody({type:CreateLevelDto})
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ' })
  @ApiOperation({ summary: 'Get all levels with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, example: ' ' })
  @ApiResponse({ status: 200, description: 'List of levels returned successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  findAll(@Query() query:{page:string,limit:string,search:string})
 {
  let page = Number(query.page)||1
  let limit = Number(query.limit)||10
  let search = query.search||""
    return this.levelService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get level by ID' })
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN","SUPER_ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update a level by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Updated Уровень 1' },
        nameRU: { type: 'string', example: 'Updated Уровень 1' },
        nameEng: { type: 'string', example: 'Updated Level 1' },
      },
      required: [],
    },
  })
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(id, updateLevelDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Role("ADMIN")
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete level by ID' })
  remove(@Param('id') id: string) {
    return this.levelService.remove(id);
  }
}
