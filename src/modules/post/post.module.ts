import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import {Post} from './../../entities/posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post], 'posts')
  ],
  controllers: [PostController],
  providers: [PostService]
})

export class PostModule {}
