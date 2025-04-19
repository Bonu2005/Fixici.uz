import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneralInfoService } from './general-info.service';
import { CreateGeneralInfoDto } from './dto/create-general-info.dto';
import { UpdateGeneralInfoDto } from './dto/update-general-info.dto';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('General Information')
@Controller('general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Create general information' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'example@mail.com' },
        links: { type: 'string', example: 'http://example.com' },
        phone: { type: 'string', example: '+1234567890' },
      },
      required: ['email', 'links', 'phone'],
    }
  })
  create(@Body() createGeneralInfoDto: CreateGeneralInfoDto) {
    return this.generalInfoService.create(createGeneralInfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all general information' })
  findAll() {
    return this.generalInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get general information by ID' })
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update general information by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'newmail@mail.com' },
        links: { type: 'string', example: 'http://newlink.com' },
        phone: { type: 'string', example: '+0987654321' },
      },
      required: [],
    }
  })
  update(@Param('id') id: string, @Body() updateGeneralInfoDto: UpdateGeneralInfoDto) {
    return this.generalInfoService.update(id, updateGeneralInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete general information by ID' })
  remove(@Param('id') id: string) {
    return this.generalInfoService.remove(id);
  }
}
