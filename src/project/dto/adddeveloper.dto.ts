import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddDeveloperDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  projectid: string;
}
