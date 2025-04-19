import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { GuardGuard } from 'src/guard/guard.guard';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(GuardGuard)
  @ApiBearerAuth('access-token')  
  @ApiOperation({ summary: 'Create a new comment with master ratings' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comment successfully created' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    return this.commentService.create(createCommentDto, req);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Comment ID' })
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Comment ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        star: { type: 'number', example: 4 },
        masterId: { type: 'string', example: 'master-id-002' },
        userId: { type: 'string', example: 'user-id-456' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Comment ID' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
