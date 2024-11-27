import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  RequestTimeoutException,
  HttpStatus
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider'

/**
 * Class that connects to the users endpoint
 */
@Injectable()
export class UsersService {
  /**
   * Circular injection service
   * @param authService
   */
  constructor(
    /**
     * Inject auth service
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Inject userRepository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /**
     * Inject config service
     */
    private readonly configService: ConfigService,

    /**
     * Inject profile configuration
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject create many provider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * Inject Create User Provider
     */
    private readonly createUserProvider: CreateUserProvider
  ) {}

  public createUser = async (createUserDto: CreateUserDto) => {
    return this.createUserProvider.createUser(createUserDto)
  };

  /**
   * Checks if user is authenticated
   */
  public isAuth = this.authService.isAuth();

  /**
   * The method to get all the users
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    throw new HttpException({
      status: HttpStatus.MOVED_PERMANENTLY,
      error: "Users does not exist"
    },
    HttpStatus.MOVED_PERMANENTLY,
    {
      cause: new Error(),
      description: "Error Occurred because endpoint has been moved permanently",
      
    }
  )
  }

  /**
   * The method to get user by id
   * @param id
   * @returns
   */

  public async findUserById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({ id })
    } catch (error) {
      throw new RequestTimeoutException(
        'The request timed out, please try again later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User with id does not exist.');
    }
    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyProvider.createManyUsers(createManyUsersDto)
  }
}
