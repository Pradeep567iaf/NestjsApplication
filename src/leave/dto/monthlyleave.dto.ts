import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MonthlyLeaveDto {
  @ApiProperty({
    description: 'Enter Employee Id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
