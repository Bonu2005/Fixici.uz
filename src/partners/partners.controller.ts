import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Partners')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new partner' })
  @ApiBody({type:CreatePartnerDto })
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all partners' })
  findAll(@Query() query:{page:string,limit:string,search:string}) {
    let page = Number(query.page)||1
    let limit = Number(query.limit)||10
    let search = query.search||""
    return this.partnersService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get partner by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update partner by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Navoiy Updated' },
        nameRU: { type: 'string', example: 'Навоий Обновлено' },
        nameEng: { type: 'string', example: 'Navoi Updated' },
        image: { type: 'string', example: 'https://example.com/updated_image.jpg' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete partner by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Partner ID' })
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
