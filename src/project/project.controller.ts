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
import { IsNotEmpty } from 'class-validator';
import { projectParamDto } from './dto/projectupdateparam.dto';
import { RemoveDeveloperDto } from './dto/removeDeveloper.dto';
import { SearchProjectDto } from './dto/Search.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ProjectEntity } from './project.entity';

export interface AddManager {
  id: number;
  projectid: string;
}

export interface Developer {
  id: number;
}
export interface ProjectDeveloper {
  projectid: string;
}
@Controller('project')
export class ProjectController {
  constructor(private projectservice: ProjectService) {}

  @Get('/:id')
  ProjectByid(@Request() req, @Param() param) {
    return this.projectservice.Getprojectbyid(param.id);
  }

  @Get('developers/:id')
  Getdevelopers(@Request() req, @Param() param) {
    return this.projectservice.GetDevelopers(param.id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/manager')
  addmanager(@Query() query: AddManager) {
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
  @Roles(Role.Admin, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add/developer')
  AddDeveloper(@Request() req, @Body() body: AddDeveloperDto) {
    return this.projectservice.addDevelopertoproject(body);
  }

  //4) remove developer
  @Post('remove/developer')
  RemoveDeveloper(@Request() req, @Body() body: RemoveDeveloperDto) {
    return this.projectservice.RemoveDeveloper(body);
  }
  //5) get all developers working on project

  @Get('developer/all')
  ProjectDeveloper(@Request() req, @Body() body: ProjectDeveloper) {
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
  @Roles(Role.Admin,Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
