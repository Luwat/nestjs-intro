import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject users DataSource
     */
    private readonly usersDataSource: DataSource,
  ) {}

  public async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    // instantiate query runner
    const queryRunner = this.usersDataSource.createQueryRunner();
    try {
      // Connect query runner to dataSource
      await queryRunner.connect();
      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'We are unable to connect to the database',
        {
          description: String(error),
        },
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // if successful, commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccessful, rollback transaction
      await queryRunner.rollbackTransaction();

      //throw new exception error
      throw new ConflictException('Failed to create many users', {
        description: String(error),
      });
    } finally {
      try {
        // release query runner connection after transaction
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Failed to release query runner connection',
          {
            description: String(error),
          },
        );
      }
    }

    return newUsers;
  }
}
