import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

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
    // Injecting auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

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

  public findUserById(id: string) {
    return { id: 1, name: 'John Doe', email: 'john@example.com' };
  }
}
