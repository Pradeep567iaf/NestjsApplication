import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class leavedto {
  @IsNotEmpty()
  @IsNumber()
  employeeid: number;
  
  @IsNotEmpty()
  @IsString()
  employeename: string;

  @IsString()
  @IsNotEmpty()
  Reason: string;
}
