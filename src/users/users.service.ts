import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { PaginationDto } from '../database/dto/pagination.dto';
import { PaginatedUsersResult } from './dto/paginated-users.dto';

@Injectable()
export class UsersService {
  constructor(@Inject() private readonly userRepo: UsersRepository) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { firstName, lastName, bio } = createUserInput;
    const user: User = await this.userRepo.create({
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    });

    return user;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedUsersResult> {
    const paginatedUsers: PaginatedUsersResult =
      await this.userRepo.find(paginationDto);
    return paginatedUsers;
  }
}
