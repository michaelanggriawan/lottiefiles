import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class AddAnimationDto {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  file: FileUpload;

  @Field()
  @IsNotEmpty()
  author: string;
}
