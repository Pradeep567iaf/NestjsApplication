import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddManagerDto {
  @ApiProperty({
    description: 'Add manager id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    description: 'Add project id',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  projectid: string;
}
