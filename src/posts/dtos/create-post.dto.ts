import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { postStatus } from "../enums/postStatus.enum";
import { postType } from "../enums/postType.enum";
import { Type } from "class-transformer";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options-dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        example: "This is a title",
        description: "The name given to the post as the topic"
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(512)
    title: string;
    
    @ApiProperty({
        enum: postType,
        description: 'Possible values: "post", "page", "story", "series"',
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType;

    @ApiProperty({
        description: 'Example: "my-url"',
        example: 'my-url',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be small lettered and uses only "-" and without space.'
    })
    @MaxLength(256)
    slug: string;

    @ApiProperty({
        enum: postStatus,
        description: 'Possible values: "draft", "scheduled", "review", "published"',
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;
    @ApiPropertyOptional({
        description: 'This is the content of the post',
        example: 'Welcome, here we go....'
    })
    @IsOptional()
    @IsString()
    content?: string;
    
    @ApiPropertyOptional({
        description: 'Make sure you serialize your JSON schema, else an error will be thrown',
        example: '{\r\n \"@context\": \"https:\/\/schema.org\",\r\n \"@type\": \"Person\"\r\n }'
    })
    @IsOptional()
    @IsJSON()
    schemas?: string;

    @ApiPropertyOptional({
        description: 'This is a feature image url for the blog post',
        example: 'https://example.com/image.jpg'
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'This is the date when the post should be published',
        example: '2022-01-01T12:00:00Z'
    })
    @IsOptional()
    @IsISO8601()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'This is an array of tags for the blog post',
        example: ['tag1', 'tag2', 'tag3']
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: string[];
    
    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: { 
                    type: 'string',
                    description: 'The key of string type for our post meta options',
                    example: 'sidebarEnabled',
                },
                value: { 
                    type: 'any',
                    description: 'The value of any type for our post meta options',
                    example: true,
                }
            },
            required: ['key', 'value']
        }
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto[];
}