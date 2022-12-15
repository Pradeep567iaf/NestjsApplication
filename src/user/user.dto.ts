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
import { isInt16Array } from 'util/types';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  Designation: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  role: Role[];

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^\+[1-9]\d{1,14}$/)
  contact_number: number;
}
