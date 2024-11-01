import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'Example: "my-url"',
    example: 'my-url',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be small lettered and uses only "-" and without space.',
  })
  @MaxLength(512)
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(512)
  featuredImageUrl?: string;
}
