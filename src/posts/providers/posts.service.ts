import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting usersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    public readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async create(@Body() createPostsDto: CreatePostDto) {
    /**
     * Find posts by author
     */
    const author = await this.usersService.findUserById(
      createPostsDto.authorId,
    );
    /**
     * Create a new post
     */
    const post = this.postsRepository.create({ ...createPostsDto, author });

    /**
     * return post
     */
    return await this.postsRepository.save(post);
  }
  public async findAll(userId: string) {
    const posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true
      },
    });

    return posts;
  }

  public async delete(id: number) {
    // delete post
    await this.postsRepository.delete(id);
    return { delete: true, id };
  }
}
