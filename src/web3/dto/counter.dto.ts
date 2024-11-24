import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Counter {
  @Field(() => String)
  count: string;
}

@ObjectType()
export class TransactionResponse {
  @Field(() => String)
  hash: string;
}