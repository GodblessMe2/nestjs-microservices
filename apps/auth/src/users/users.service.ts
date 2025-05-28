import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserDto } from '../dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({...createUserDto, password: await bcrypt.hash(createUserDto.password, 10)});
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
    } catch (err) {
      return; // If no user is found, we can proceed with creation
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return user;
  }

  async getUser( getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }

  // async findAll(): Promise<UserDocument[]> {
  //   return this.userRespository.findAll();
  // }
  // async findOne(id: string): Promise<UserDocument> {
  //   return this.userRespository.findOne(id);
  // }
  // async update(id: string, updateUserDTO: UpdateUserDTO): Promise<UserDocument> {
  //   return this.userRespository.update(id, updateUserDTO);
  // }
  // async remove(id: string): Promise<void> {
  //   return this.userRespository.remove(id);
  // }
}
