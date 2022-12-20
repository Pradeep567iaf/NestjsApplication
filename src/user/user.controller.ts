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
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  SerializeOptions,
  Response,
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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiConsumes,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/userupdate.dto';

import { UserUpdateParam } from './params/userupdateparam';
import { UserDeleteParam } from './params/userdeleteparam';
import { UserWithEmail } from './dto/getuserbyemail.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @ApiResponse({
  //   status: 201,
  //   description:
  //     'request was successful and as a result, a resource has been created',
  // })
  // @ApiNotFoundResponse({
  //   description: 'No User Found !',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'failed to fetch',
  // })
  @Post('email')
  async getuser(@Body() body: UserWithEmail, @Response() res) {
    console.log(res);
    const user = await this.userService.getUserByEmail(body.email);
    return user;
  }

  // create user
  @ApiCreatedResponse({
    description: 'The user have been successfully Registered!',
  })
  @ApiUnauthorizedResponse({
    description: 'Only admin can register user',
  })
  @ApiBadRequestResponse({
    description: 'Enter the valid credentials',
  })

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  async CreateUser(@Body() body: UserDto) {
    const saltOrRounds = 10;
    console.log(body, '======');
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

  // Update User
  @ApiOkResponse({
    description: 'User Updated Successfully!',
  })
  @ApiBadRequestResponse({
    description: 'Enter the valid id to update',
  })
  @ApiUnauthorizedResponse({
    description: 'Only Admin will Update the User Details',
  })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update/:id')
  async updateuser(
    @Request() req,
    @Body() body: UserUpdateDto,
    @Param() param: UserUpdateParam,
  ) {
    return await this.userService.Updateuserbyid(param.id, body);
  }

  // Delete User
  @ApiOkResponse({
    description: 'User Deleted Successfully!',
  })
  @ApiBadRequestResponse({
    description: 'Enter the valid id to Delete User',
  })
  @ApiUnauthorizedResponse({
    description: 'Only Admin will Delete the User',
  })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id')
  async deleteuser(@Param() param: UserDeleteParam) {
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
  // @Roles(Role.Admin, Role.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async Search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
    @Query() searchuser: SearchEmployeeDto,
  ): Promise<Pagination<UserEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.search(
      {
        page,
        limit,
      },
      searchuser,
    );
  }

  @ApiOkResponse({ description: 'Profile photo uploaded Successfully' })
  @ApiBadRequestResponse({ description: 'Enter the valid user id' })
  @ApiConsumes('multipart/form-data')
  @ApiUnauthorizedResponse({
    description: 'Unauthorised Access!',
  })
  @UseGuards(JwtAuthGuard)
  @Get('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Request() req,
    @Body() Body,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    console.log(req.user.userId);
    console.log(req.user.username);
    return this.userService.uploadImage(req.user.userId, file);
  }
}
