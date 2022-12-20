import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from 'src/enum/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ProjectService } from './project.service';
import { QueryParams } from './searchparam';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ProjectDto } from './dto/project.dto';
import { AddDeveloperDto } from './dto/adddeveloper.dto';
import { ProjectUpdateDto } from './dto/projectupdate.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { projectParamDto } from './dto/projectupdateparam.dto';
import { RemoveDeveloperDto } from './dto/removeDeveloper.dto';
import { SearchProjectDto } from './dto/Search.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ProjectEntity } from './project.entity';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGetParam } from 'src/user/params/usergetparam';
import { AddManagerDto } from './dto/addmanager.dto';

// export interface AddManager {
//   id: number;
//   projectid: string;
// }

export class Developer {
  @ApiProperty({
    description: 'enter project id',
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class ProjectDeveloperDto {
  @ApiProperty({
    description: 'Enter project id',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  projectid: string;
}

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projectservice: ProjectService) {}

  // get project by id
  @ApiOkResponse({ description: 'Project Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @Get('/:id')
  ProjectByid(@Request() req, @Param() param: projectParamDto) {
    return this.projectservice.Getprojectbyid(param.id);
  }

  //get developer by id
  @ApiOkResponse({ description: 'Developer Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'forbidden response',
  })
  @Get('developers/:id')
  Getdevelopers(@Request() req, @Param() param: UserGetParam) {
    return this.projectservice.GetDevelopers(param.id);
  }

  // add manager to project
  @ApiOkResponse({ description: 'Manager Added' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'forbidden response',
  })
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/manager')
  addmanager(@Query() query: AddManagerDto) {
    return this.projectservice.AddManager(query.id, query.projectid);
  }

  // 1) create project
  @Post('/:id')
  CreateProject(
    @Body() body: ProjectDto,
    @Request() req,
    @Param() param: Developer,
  ) {
    return this.projectservice.createproject(body, param.id);
  }
  //2) update project

  @Put('/:id')
  updateProject(
    @Body() body: ProjectUpdateDto,
    @Param() param: projectParamDto,
  ) {
    return this.projectservice.projectUpdate(body, param.id);
  }
  //3) add developer to project
  @ApiOkResponse({ description: 'Developer Added' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'forbidden response',
  })
  @Roles(Role.Admin, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/developer')
  AddDeveloper(@Request() req, @Query() query: AddDeveloperDto) {
    return this.projectservice.addDevelopertoproject(query);
  }

  //4) remove developer
  @ApiOkResponse({ description: 'Developer removed' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'forbidden response',
  })
  @Post('remove/developer')
  RemoveDeveloper(@Request() req, @Body() body: RemoveDeveloperDto) {
    return this.projectservice.RemoveDeveloper(body);
  }
  //5) get all developers working on project
  @ApiOkResponse({ description: 'Developers Found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server error',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiForbiddenResponse({
    description: 'forbidden response',
  })
  @Get('developer/all')
  ProjectDeveloper(@Request() req, @Body() body: ProjectDeveloperDto) {
    return this.projectservice.projectDeveloper(body);
  }

  // 10) search project by project manager, title, status with pagination take the
  //limit of 1 initially
  // @Get('')
  // Search(@Query() query: SearchProjectDto) {
  //   return query;
  // }

  //11) search employee by name, phone, email, role (with pagination)

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('')
  // searchproject(@Query() query: SearchProjectDto) {
  //   return this.projectservice.searchproject(query);
  // }
  // @Roles(Role.Admin,Role.MANAGER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async Search(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query() searchproject: SearchProjectDto,
  ): Promise<Pagination<ProjectEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.projectservice.searchproject(
      {
        page,
        limit,
      },
      searchproject,
    );
  }
}
