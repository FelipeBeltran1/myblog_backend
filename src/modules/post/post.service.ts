import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { Post } from './../../entities/posts/post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post, 'posts')
    private readonly postRepository: Repository<Post>
  ) { }

  async getMany(): Promise<Post[]> {
    return await this.postRepository.find()
  }

  async getOne(id: number) {
    const post = await this.postRepository.findOne(id);

    if(!post) throw new NotFoundException("Post does not exist");

    return post;
  }

  async createOne(dto: CreatePostDto) {
    const post = this.postRepository.create(dto as any);
    return await this.postRepository.save(post);
  }

  async editOne(id: number, dto: EditPostDto) {
    const post = await this.postRepository.findOne(id);
    if (!post) throw new NotFoundException("Post does no exist");

    const editedPost = Object.assign(post, dto);
    return await this.postRepository.save(editedPost);
    
  }

  async deleteOne(id: number) {
    return await this.postRepository.delete(id);
  }
}
