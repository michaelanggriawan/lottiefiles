import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetAnimationsArgs {
  @Field({ nullable: true })
  searchTerm?: string;
}
