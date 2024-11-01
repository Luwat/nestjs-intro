import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

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
    private usersRepository: Repository<User>
  ) {}


  public createUser = async (createUserDto: CreateUserDto) => {
    // check if user already exists
    const existingUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    })
    // handle exceptions
    // Create new user
    let newUser = this.usersRepository.create(createUserDto)

    newUser = await this.usersRepository.save(newUser);

    return newUser;
  }

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
    console.log(this.isAuth);
    return [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];
  }

  
  /**
   * The method to get user by id
   * @param id 
   * @returns 
   */

  public async findUserById(id: number) {
    return await this.usersRepository.findOneBy({ id })
  }
}
