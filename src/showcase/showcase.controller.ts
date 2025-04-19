import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ShowcaseService } from './showcase.service';
import { CreateShowcaseDto } from './dto/create-showcase.dto';
import { UpdateShowcaseDto } from './dto/update-showcase.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Showcases')
@Controller('showcase')
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new showcase' })
  @ApiBody({type:CreateShowcaseDto})
  create(@Body() createShowcaseDto: CreateShowcaseDto) {
    return this.showcaseService.create(createShowcaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all showcases' })
  findAll(@Query() query:{page:string,limit:string,search:string}) {
    let page = Number(query.page)||10
    let limit = Number(query.limit)||10
    let search = query.search||""
    return this.showcaseService.findAll(page,limit,search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get showcase by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Showcase ID' })
  findOne(@Param('id') id: string) {
    return this.showcaseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update showcase by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nameUz: { type: 'string', example: 'Updated Showcase' },
        nameRU: { type: 'string', example: 'Обновлённый шоукейс' },
        nameEng: { type: 'string', example: 'Updated Showcase' },
        descriptionUz: { type: 'string', example: 'Обновленное описание на узбекском' },
        descriptionRU: { type: 'string', example: 'Обновленное описание на русском' },
        descriptionEng: { type: 'string', example: 'Updated description in English' },
        image: { type: 'string', example: 'http://example.com/updated-image.jpg' },
        link: { type: 'string', example: 'http://example.com/updated-link' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateShowcaseDto: UpdateShowcaseDto) {
    return this.showcaseService.update(id, updateShowcaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete showcase by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Showcase ID' })
  remove(@Param('id') id: string) {
    return this.showcaseService.remove(id);
  }
}
