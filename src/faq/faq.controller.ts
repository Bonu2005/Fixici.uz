import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiBody({type:CreateFaqDto})
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ by ID' })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FAQ by ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string', example: 'How do I use NestJS?' },
        answer: { type: 'string', example: 'NestJS can be used by creating modules, controllers, and services in a structured manner.' },
      },
      required: [],
    }
  })
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ by ID' })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
