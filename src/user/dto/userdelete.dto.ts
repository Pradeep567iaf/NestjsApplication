import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserDeleteDto {
  @ApiProperty({
    description: 'Enter User Id ',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
