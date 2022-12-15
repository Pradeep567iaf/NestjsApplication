import { IsNotEmpty, IsString } from 'class-validator';

export class projectParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
