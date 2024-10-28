import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    // Injecting usersService
    private readonly usersService: UsersService,
  ) {}
  public findAll(userId: string) {
    const user = this.usersService.findUserById(userId)
    return [
        { 
            user: user,
            title: 'post', 
            content: 'post content' 
        },
        { 
            user: user,
            title: 'post 2', 
            content: 'post content 2' 
        },
    ];
  }
}
