import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectEnum } from 'src/enum/projectstatus.enum';

export class ProjectUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  technologies: [];

  @IsNotEmpty()
  @IsNumber()
  managerid: number;

  @IsNotEmpty()
  @IsString()
  tester: string;

  @IsNotEmpty()
  @IsNumber()
  clientid: number;

  @IsEnum(ProjectEnum)
  status: ProjectEnum;
}
