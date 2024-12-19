import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProvider {
    constructor(
        /**
         * Inject userRepository
         */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async findOneByGoogleId(googleId: string) {
        return await this.userRepository.findOneBy({ googleId })
    }
}
