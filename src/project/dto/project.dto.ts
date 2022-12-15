import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  technologies: [];

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  developers: [];

  @IsNotEmpty()
  @IsNumber()
  managerid: number;

  @IsNotEmpty()
  @IsString()
  tester: string;

  @IsNotEmpty()
  @IsNumber()
  clientid: number;
}
