import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options-dto';
import { MetaOptionsService } from './providers/meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(
        /**
         * Inject service
         */
        private readonly metaOptionsService: MetaOptionsService
    ) {}
    @Post()
    public createMetaOption(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
        return this.metaOptionsService.create(createPostMetaOptionsDto)
    }
}