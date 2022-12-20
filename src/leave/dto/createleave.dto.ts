import { ApiProduces, ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Leave } from 'src/enum/leave.enum';

export class CreateLeaveDto {
  @ApiProperty({
    description: 'Enter employee unique id',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  employeeid: number;

  @ApiProperty({
    description: 'Enter employee name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  employeename: string;

  @ApiProperty({
    description: 'Enter Reason for leave',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  Reason: string;
}
