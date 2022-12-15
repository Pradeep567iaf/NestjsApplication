import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';
import { ProjectUpdateDto } from './dto/projectupdate.dto';
import { ProjectEntity } from './project.entity';
import { Role } from 'src/enum/role.enum';
import { AddDeveloperDto } from './dto/adddeveloper.dto';
import { RemoveDeveloperDto } from './dto/removeDeveloper.dto';
import { Developer, ProjectDeveloper } from './project.controller';
import { SearchProjectDto } from './dto/Search.dto';
import { IPaginationOptions, paginateRaw, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProjectService {
  constructor(
    private readonly datasource: DataSource,
    private readonly userService: UserService,
    private readonly clientService: ClientService,

    @InjectRepository(ProjectEntity)
    private readonly projectrepo: Repository<ProjectEntity>,
  ) {}

  async createproject(clientproject: ProjectDto, developerid: number) {
    try {
      const developer = await this.datasource
        .getRepository(UserEntity)
        .findOne({
          where: {
            id: developerid,
          },
          relations: ['projects'],
        });

      if (developer) {
        const newPost = await this.projectrepo.create({
          ...clientproject,
        });

        newPost.developers = [developer];
        await this.projectrepo.save(newPost);
        return newPost;
      }
      return 'developor with this id not found';
    } catch (err) {
      console.log(err);
    }
  }

  async Getprojectbyid(projectid: string) {
    const project = await this.datasource
      .getRepository('ProjectEntity')
      .createQueryBuilder('p')
      .leftJoinAndSelect('UserEntity', 'u', 'u.projectsId = p.id')
      .where('p.id = :id', { id: projectid })
      .getOne();

    return project;
  }

  async GetDevelopers(projectid: number) {
    const developers = await this.userService.Getuserbyid(projectid);

    return developers;
  }

  async addDevelopertoproject(projectUserData: AddDeveloperDto) {
    const { id, projectid } = projectUserData;
    const project = await this.projectrepo.findOne({
      where: {
        id: projectid,
      },
    });
    const user = await this.userService.Getuserbyid(id);
    const developerlist = [];
    project.developers.map((e) => {
      developerlist.push(e.id);
    });
    console.log(developerlist);
    if (developerlist.includes(user.id)) {
      return 'developer is already exist in project';
    } else {
      if (user.role.toString() === 'employee') {
        project.developers = [...project.developers, user];
        return await this.projectrepo.save(project);
      }
      return 'verify role before adding developer';
    }
  }

  async AddManager(userid: number, projectid: string) {
    try {
      const user = await this.userService.Getuserbyid(userid);

      if (user) {
        if (user.role.toString() === 'project manager') {
          const updateproject = await this.projectrepo.update(projectid, {
            managerid: userid,
          });

          const project = await this.projectrepo.findOne({
            where: {
              id: projectid,
            },
          });
          return project;
        } else {
          return 'User Role is not project manager';
        }
      }
      throw new NotFoundException();
    } catch (err) {}
  }

  // Project update
  async projectUpdate(project: ProjectUpdateDto, projectid: string) {
    const manager = await this.userService.getManagerById(project.managerid);
    const client = await this.clientService.GetClientById(project.clientid);

    if (manager && manager.role === Role.MANAGER && client) {
      console.log(manager);
      console.log(client);
      const query = await this.projectrepo.update(
        {
          id: projectid,
        },
        project,
      );
      return query;
    } else {
      return 'check your input before updation';
    }
  }

  //Remove Developer from project
  async RemoveDeveloper(user: RemoveDeveloperDto) {
    const { id, projectid } = user;
    const project = await this.projectrepo.findOne({
      where: {
        id: projectid,
      },
      relations: ['developers'],
    });
    const developer = await this.userService.Getuserbyid(id);
    // console.log(project);
    // console.log(developer);
    const deletedeveloper = [];
    project.developers.map((e, i) => {
      if (e.id === id) {
        deletedeveloper.push(i);
      }
    });
    project.developers.splice(deletedeveloper[0], 1);
    console.log(project);
    // const updatedProject = this.projectrepo.update(
    //   {
    //     id: projectid,
    //   },
    //   project,
    // );
    return project;
  }

  //Project Developer
  async projectDeveloper(project: ProjectDeveloper) {
    const projectdata = await this.projectrepo.findOne({
      where: {
        id: project.projectid,
      },
    });
    return projectdata.developers;
  }

  // async searchproject(search: SearchProjectDto) {
  //   const { managerId, title, status } = search;
  //   const where: FindOptionsWhere<ProjectEntity> = {};
  //   if (managerId) {
  //     where.managerid = managerId;
  //   }
  //   console.log(where);
  //   if (title) {
  //     where.title = title;
  //   }
  //   if (status) {
  //     where.status = status;
  //   }
  //   const project = await this.projectrepo.findOne({
  //     where,
  //   });
  //   return project;
  // }

  async searchproject(
    options: IPaginationOptions,
    searchuser: SearchProjectDto,
  ): Promise<Pagination<ProjectEntity>> {
    console.log(searchuser, '=====');
    const { managerId, title, status } = searchuser;
    if (managerId) {
      const queryBuilder = this.projectrepo
        .createQueryBuilder('ProjectEntity')
        .where('ProjectEntity.managerid = :managerid', {
          managerid: managerId,
        });
      return paginateRaw(queryBuilder, options);
    }
    if (title) {
      const queryBuilder = this.projectrepo
        .createQueryBuilder('ProjectEntity')
        .where('ProjectEntity.title = :title', {
          title: title,
        });
      return paginateRaw(queryBuilder, options);
    }
    if (status) {
      const queryBuilder = this.projectrepo
        .createQueryBuilder('ProjectEntity')
        .where('ProjectEntity.status = :status', {
          status: status,
        });
      return paginateRaw(queryBuilder, options);
    }

    throw new NotFoundException();
  }
}
