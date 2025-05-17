import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}