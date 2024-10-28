import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    // Injecting auth service
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public isAuth = this.authService.isAuth();

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

  public findUserById(id: string) {
    return { id: 1, name: 'John Doe', email: 'john@example.com' };
  }
}
