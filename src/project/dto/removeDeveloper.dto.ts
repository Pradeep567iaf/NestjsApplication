import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RemoveDeveloperDto {
  @ApiProperty({
    description: 'Enter developer id',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Enter project id',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  projectid: string;
}