import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetAnimationArgs {
  @Field()
  @IsNotEmpty()
  id: number;
}
