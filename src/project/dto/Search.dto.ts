import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProjectEnum } from 'src/enum/projectstatus.enum';

export class SearchProjectDto {
  @IsNumber()
  managerId: number;

  @IsString()
  title: string;

  @IsEnum(ProjectEnum)
  status: ProjectEnum;
}
