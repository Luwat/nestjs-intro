import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostDto } from '../dtos/get-post.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

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
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Inject Tag service
     */
    private readonly tagsService: TagsService,

    /**
     * Injecting paginationProvider
     */
    private readonly paginationProvider: PaginationProvider,
    /**
     * Inject create Post provider
     */
    private readonly createPostProvider: CreatePostProvider,
  ) {}
  public async create(createPostsDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostsDto, user);
  }

  public async update(patchPostDto: PatchPostDto) {
    let tags = undefined;
    let post = undefined
    
    // Find tags
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      /**
       * Throw exception
       */
      throw new RequestTimeoutException(
        'Unable to get tags from the database. Please try again later.',
      );
    }

    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException("Tags do not match the provided tags in the request.");
    }

    // Find the post
    try {
      
      await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });

    } catch (error) {
      /**Throw exception */
      throw new RequestTimeoutException(
        'Unable to get post from the database. Please try again later.',
      );
    }

    if (!post) {
      throw new BadRequestException("Post does not exist. Check the ID and try again.");
    }
    // Update post
    post.title = patchPostDto.title ?? post.title;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.status = patchPostDto.status ?? post.status;
    post.content = patchPostDto.content ?? post.content;
    post.schemas = patchPostDto.schemas ?? post.schemas;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    // Assign new tags
    post.tags = tags;
    // Save the post and return
    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to update post. Please try again later.',
      );
    }
    return post;
  }
  public async findAll(postQuery: GetPostDto, userId: string): Promise<Paginated<Post>> {
    const posts = await this.paginationProvider.paginateQuery({
      limit: postQuery.limit,
      page: postQuery.page,
    }, this.postsRepository)

    return posts;
  }

  public async delete(id: number) {
    // delete post
    await this.postsRepository.delete(id);
    return { delete: true, id };
  }
}
