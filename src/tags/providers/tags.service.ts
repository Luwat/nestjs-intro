import { Body, Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>
    ) {}

    public async create(@Body() createTagDto: CreateTagDto) {
        const tag = this.tagsRepository.create(createTagDto);
        return await this.tagsRepository.save(tag);
    }
}
