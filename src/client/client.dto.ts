import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Matches(/^\+[1-9]\d{1,14}$/)
  contact: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  project: string;
}
