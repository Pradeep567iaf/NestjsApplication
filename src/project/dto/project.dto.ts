import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    description: 'enter project id',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'enter project title',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Enter Technology',
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  technologies: [];

  @ApiProperty({
    description: 'Enter Developer',
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @ArrayMinSize(1)
  developers: [];

  @ApiProperty({
    description: 'Enter Manager',
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  managerid: number;

  @ApiProperty({
    description: 'Enter Tester',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  tester: string;

  @ApiProperty({
    description: 'enter client id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  clientid: number;
}
