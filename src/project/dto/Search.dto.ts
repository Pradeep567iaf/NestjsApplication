import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ProjectEnum } from 'src/enum/projectstatus.enum';

export class SearchProjectDto {
  @IsNumber()
  mid: number;

  @IsString()
  projecttitle: string;

  @IsEnum(ProjectEnum)
  projectstatus: ProjectEnum;
}
