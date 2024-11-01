import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: false
    })
    metaValue: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
    @OneToOne(() => Post, (post) => post.metaOptions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    post: Post;
}