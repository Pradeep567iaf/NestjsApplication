import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "src/enum/role.enum";

//  11) search employee by name, phone, email, role (with pagination)
export class SearchEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  contact_number: number;
  
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @IsEnum(Role)
  role: Role;
}