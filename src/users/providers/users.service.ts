import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

<<<<<<< HEAD
/**
 * Class that connects to the users endpoint
 */
@Injectable()
export class UsersService {

  /**
   * Circular injection service
   * @param authService 
   */
=======
@Injectable()
export class UsersService {
>>>>>>> b17cdfed2ff6042cb908072e2dfa5a50d5576ed1
  constructor(
    // Injecting auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
<<<<<<< HEAD

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
=======
  public isAuth = this.authService.isAuth();

>>>>>>> b17cdfed2ff6042cb908072e2dfa5a50d5576ed1
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
<<<<<<< HEAD
  
  /**
   * The method to get user by id
   * @param id 
   * @returns 
   */
=======

>>>>>>> b17cdfed2ff6042cb908072e2dfa5a50d5576ed1
  public findUserById(id: string) {
    return { id: 1, name: 'John Doe', email: 'john@example.com' };
  }
}
