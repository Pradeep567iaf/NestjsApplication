import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Leave } from "src/enum/leave.enum";

export class UpdateLeave {
  @IsNumber()
  @IsNotEmpty()
  employeeid: number;

  @IsNotEmpty()
  @IsString()
  employeename: string;
  
  @IsNotEmpty()
  @IsDate()
  RequestDate: string;

  @IsEnum(Leave)
  status: Leave;
  //   @IsEnum(ProjectEnum)
  //   status: ProjectEnum;
}