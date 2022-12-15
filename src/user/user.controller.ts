import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
  UnauthorizedException,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/role.enum';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SearchEmployeeDto } from './dto/searchuser.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('email')
  async getuser(@Body() body) {
    const user = this.userService.getUserByEmail(body.email);
    return user;
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async CreateUser(@Body() body) {
    const saltOrRounds = 10;
    body.password = await bcrypt.hash(body.password, saltOrRounds);
    const user = await this.userService.CreateUser(body);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async viewuser(@Request() req, @Param() param) {
    if (req.user.roles === Role.Admin) {
      return this.userService.Getuserbyid(param.id);
    } else if (req.user.roles === Role.HR) {
      return this.userService.Getuserbyid(param.id);
    } else if (req.user.userId === Number(param.id)) {
      return this.userService.Getuserbyid(param.id);
    }
    throw new UnauthorizedException();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update/:id')
  async updateuser(@Request() req, @Body() body, @Param() param) {
    return await this.userService.Updateuserbyid(param.id, body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteuser(@Param() param) {
    return this.userService.Deleteuserbyid(param.id);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('')
  // async Getuser(@Query() query: {contact:number,id:number,email:string,name:string}){
  //     console.log(query)
  //     return this.userService.searchuser(query.id,query.name,query.email,query.contact)

  // }

  // @Get('')
  // async findadd(@Paginate() query:PaginateQuery): Promise<Paginated<UserEntity>>{
  //     try{
  //         console.log(query)
  //         return await this.userService.findall(query)

  //     }
  //     catch(err){
  //         console.log(err)
  //     }

  // }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  // ): Promise<Pagination<UserEntity>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.userService.paginate({
  //     page,
  //     limit,
  //     route: 'http://localhost:3000/user',
  //   });
  // }

  //  11) search employee by name, phone, email, role (with pagination)
  // @Get('')
  // Search(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  //   // @Query() searchquery: SearchEmployeeDto,
  // ): Promise<Paginated<UserEntity>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.userService.paginate({
  //     page,
  //     limit,
  //   });
  //   //  return this.userService.Search(query);
  // }
  @Roles(Role.Admin, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async Search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query() searchuser: SearchEmployeeDto,
  ): Promise<Pagination<UserEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate(
      {
        page,
        limit,
      },
      searchuser,
    );
  }
}
