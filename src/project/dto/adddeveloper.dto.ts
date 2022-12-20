import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddDeveloperDto {
  @ApiProperty({
    description: 'Add developer id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Add project id',
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  projectid: string;
}
