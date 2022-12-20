import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserDeleteParam {
  @ApiProperty({
    description: 'Enter User Id ',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
