import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    // Injecting the service
    private readonly postsService: PostsService,
  ) {}

// get all user's posts by userId
  @Get('/:userId?')
  public getPosts(@Param() userId: string) {
    return this.postsService.findAll(userId)
  }

  @ApiOperation({
    summary: "Creates a new blog post"
  })
  @ApiResponse({
    status: 201,
    description: "Returns status code 201 if blog post is created successfully"
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @ApiOperation({
    summary: "Updates the content of blog post"
  })
  @ApiResponse({
    status: 201,
    description: "A 200 response if blog post is updated successfully"
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto)
  }

  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id)
  }
}
