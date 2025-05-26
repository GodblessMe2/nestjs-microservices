import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UsersRepository } from './users.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({...createUserDto, password: await bcrypt.hash(createUserDto.password, 10)});
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    return user;
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
