import { BadRequestException, Inject, Injectable, forwardRef, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { HashingProvider } from 'src/auth/providers/hashing.provider'

@Injectable()
export class CreateUserProvider {
    constructor(
        /**
         * inject users repository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        /**
         * Inject hashing provider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ) {}


    public createUser = async (createUserDto: CreateUserDto) => {
        let existingUser = undefined;
    
        try {
          // check if user already exists
          existingUser = await this.usersRepository.findOne({
            where: {
              email: createUserDto.email,
            },
          });
        } catch (error) {
          // Handle exceptions
          throw new RequestTimeoutException(
            'The request timed out, please try again later',
            {
              description: 'Error connecting to the database',
            },
          );
        }
    
        // handle exceptions
        if (existingUser) {
          throw new BadRequestException(
            'The user already exists. Please check your email.',
          );
        }
    
        // Create new user
        let newUser = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        });
        
        try {
          newUser = await this.usersRepository.save(newUser);
        } catch (error) {
          throw new RequestTimeoutException(
            'The request timed out, please try again later',
            {
              description: 'Error connecting to the database',
            },
          );
        }
    
        return newUser;
      };
}
