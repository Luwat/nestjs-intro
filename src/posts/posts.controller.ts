import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './providers/posts.service';

@Controller('posts')
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
}
