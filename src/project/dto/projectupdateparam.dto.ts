import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class projectParamDto {
  @ApiProperty({
    description: 'Enter project id',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
