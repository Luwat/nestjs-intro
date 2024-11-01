import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-meta-options-dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: "enum",
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  slug: string;

  @Column({
    type: "enum",
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;

  @Column({
    type: "text",
    nullable: true,
  })
  content?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  schemas?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  publishOn?: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  tags?: string[];

//   Work on it in the next session
  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post,
  {
    cascade: true,
    eager: true
  })
  metaOptions?: MetaOption;
}
