import { Controller, Body, Get, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import { Post } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';
import { CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   *
   * @param user - The current user
   * Retrieves the current user from the request context
   * @returns
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    return user;

  }
}
