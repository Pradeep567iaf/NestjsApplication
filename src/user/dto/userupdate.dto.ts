import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class UserUpdateDto {
  @ApiProperty({
    description: 'Enter user name',
    default: 'Peter',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Enter Designation',
    default: 'Web designer',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  Designation: string;

  @ApiProperty({
    description: 'Enter Email',
    default: 'testuser@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  //   @ApiProperty({
  //     description: 'Enter Password with minimum six character',
  //     default: '123456',
  //     type: String,
  //     minLength: 6,
  //   })
  //   @IsNotEmpty()
  //   @IsString()
  //   password: string;

  @ApiProperty({
    enum: [Role.Employee, Role.Admin, Role.CLIENT, Role.HR, Role.MANAGER],
    default: Role.Employee,
    type: [String],
  })
  @IsArray()
  role: Role[];

  @ApiProperty({
    description: 'Enter address',
    default: 'Near lake colony,Malbourne Australia',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Enter Contact Number',
    default: 123456789,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^\+[1-9]\d{1,14}$/)
  contact_number: number;
}
