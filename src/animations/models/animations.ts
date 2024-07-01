import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Animations {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  source: string;

  @Field()
  author: string;
}
