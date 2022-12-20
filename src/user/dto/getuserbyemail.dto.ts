import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserWithEmail {
  @ApiProperty({
    description: 'Enter Email',
    default: 'testuser@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
