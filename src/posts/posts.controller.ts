<<<<<<< HEAD
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
=======
import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
>>>>>>> b17cdfed2ff6042cb908072e2dfa5a50d5576ed1
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
<<<<<<< HEAD

  @ApiOperation({
    summary: "Creates a new blog post"
  })
  @ApiResponse({
    status: 201,
    description: "Returns status code 201 if blog post is created successfully"
  })
  @Post()
  public createPost(@Body() createPost: CreatePostDto) {
    console.log(createPost)
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
=======
>>>>>>> b17cdfed2ff6042cb908072e2dfa5a50d5576ed1
}
