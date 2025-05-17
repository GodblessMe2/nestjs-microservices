import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Create a new user
   * @param createUserDto - The user data to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
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
