import { BadRequestException, ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
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
     * Inject Tag service
     */
    private readonly tagsService: TagsService,
    ) {}
    public async create(createPostsDto: CreatePostDto, user: ActiveUserData) {
        let author = undefined;
        let tags = undefined;
        
        try {
            /**
             * Find posts by author
             */
            console.log('hello')
            author = await this.usersService.findUserById(
              user.sub,
            );
            console.log(author)
            /**
             * find tags by ids
             */
            tags = await this.tagsService.findMultipleTags(createPostsDto.tags);
            console.log(author, tags);
        } catch (error) {
            throw new RequestTimeoutException(error.message, {
                description: "Failed to create post"
            })
        }

        if (createPostsDto.tags.length !== tags.length) {
            throw new BadRequestException("Please check your tags ids.");
        }

        /**
         * Create a new post
         */
        const post = this.postsRepository.create({
          ...createPostsDto,
          author,
          tags,
        });
    
        try {
            /**
             * return post
             */
            return await this.postsRepository.save(post);
        } catch (error) {
            throw new ConflictException(error, {
                description: "Ensure that post slug is unique"
            })
        }
      }
}
