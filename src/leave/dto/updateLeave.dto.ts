import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Leave } from 'src/enum/leave.enum';

export class UpdateLeave {
  @ApiProperty({
    description: 'Enter Employee Id',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  employeeid: number;

  @ApiProperty({
    description: 'Enter Employee Name',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  employeename: string;

  @ApiProperty({
    description: 'Enter Request Date',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  RequestDate: string;

  @ApiProperty({
    enum: [Leave.APPROVED, Leave.PENDING, Leave.REFUSED],
    default: Leave.PENDING,
    type: String,
  })
  @IsEnum(Leave)
  status: Leave;
}
