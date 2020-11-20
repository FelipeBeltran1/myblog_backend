import { ApiProperty } from '@nestjs/swagger';
import {IsArray, IsBoolean, IsEnum, IsString} 
from 'class-validator'
import { EnumToString } from './../../../@common/helpers/enumsToString';
import {PostCategory} from './../../../entities/enums/states.enum'

export class CreatePostDto{
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    slug: string;

    @ApiProperty()
    @IsString()
    excerpt: string;
    
    @ApiProperty()
    @IsString()
    content: string;
    
    @ApiProperty()
    @IsEnum(PostCategory, {
        message: `Invalid option. The options avilables are ${EnumToString(PostCategory)}`
    })
    category: PostCategory;

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    tags: string[];

    @ApiProperty()
    @IsBoolean()
    status: boolean;
}