import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/enum/role.enum';

//  11) search employee by name, phone, email, role (with pagination)
export class SearchEmployeeDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  contact: number;

  @IsNotEmpty()
  @IsString()
  useremail: string;

  @IsEnum(Role)
  userrole: Role;
}
