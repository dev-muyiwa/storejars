import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { PaginationDto } from '../database/dto/pagination.dto';
import { PaginatedResult } from '../database/base.repository';
import { Inject } from '@nestjs/common';
import { PaginatedUsersResult } from './dto/paginated-users.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject() private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUsersResult, { name: 'getUsers' })
  async findAll(
    @Args('paginationInput') pagination: PaginationDto,
  ): Promise<PaginatedUsersResult> {
    return this.usersService.findAll(pagination);
  }
}
