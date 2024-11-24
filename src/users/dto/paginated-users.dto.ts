import { PaginatedResult } from '../../database/base.repository';
import { Field, ObjectType } from '@nestjs/graphql';
import { User, UserDocument } from '../entities/user.entity';

@ObjectType()
export class PaginatedUsersResult extends PaginatedResult<User> {
  @Field(() => [User])
  data: UserDocument[];

  @Field()
  currentPage: number;

  @Field()
  totalPages: number;

  @Field()
  totalItems: number;

  constructor(
    data: User[],
    currentPage: number,
    totalPages: number,
    totalItems: number,
  ) {
    super(data, currentPage, totalPages, totalItems);
  }
}