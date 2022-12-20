import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

import { SearchEmployeeDto } from './dto/searchuser.dto';
import {
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { deserializeUser } from 'passport';
import { profile } from 'console';
import { UserUpdateDto } from './dto/userupdate.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<any>,
  ) {}

  // UPLOAD IMAGE
  async uploadImage(userid: any, file: any) {
    console.log(userid);
    console.log(file);
    const user = await this.UserRepository.findOne({
      where: {
        id: userid,
      },
    });
    await this.UserRepository.update(userid, {
      photo: file.originalname,
    });

    return user;
  }

  // GET USER BY EMAIL
  async getUserByEmail(useremail: string): Promise<UserEntity | undefined> {
    const user = await this.datasource
      .getRepository(UserEntity)
      .createQueryBuilder('UserEntity')
      .where('UserEntity.email = :email', { email: useremail })
      .getOne();
    
    return user;
  }
  // END OF GET USER BY EMAIL

  // CREATE USER
  async CreateUser(user: UserDto) {
    // const create = new UserEntity();
    // create.name = user.name;
    // create.contact_number=user.contact_number
    // create.email= user.email
    // create.Designation = user.Designation
    // create.address = user.Designation
    // create.password =  user.password
    // create.role = user.role
    // await this.datasource.manager.save(user);/
    // const createuser = await this.datasource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('UserEntity')
    //   .insert()
    //   .into(UserEntity)
    //   .values(user)
    //   .execute();
    // const createuser = await this.UserRepository.save(user);
    // return createuser;
    const users = await this.datasource.getRepository(UserEntity).save(user);
    return users;
  }
  // END OF CREATE USER

  // GET USER BY ID
  async Getuserbyid(userid: number) {
    // const user = await this.datasource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('UserEntity')
    //   .where('UserEntity.id = :id', { id: userid })
    //   .getOne();

    const user = await this.UserRepository.findOne({
      where: {
        id: userid,
      },
    });

    return user;
  }
  // END OF GET USER BY ID

  // UPDATE USER BY ID
  async Updateuserbyid(userid: number, user: UserUpdateDto) {
    // const finduser = await this.datasource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('UserEntity')
    //   .where('UserEntity.id = :id', { id: userid })
    //   .getOne();
    const finduser = await this.UserRepository.findOne({
      where: {
        id: userid,
      },
    });
    if (finduser) {
      //   const updateuser = await this.datasource
      //     .getRepository(UserEntity)
      //     .createQueryBuilder('UserEntity')
      //     .update(UserEntity)
      //     .set(user)
      //     .where('id = :id', { id: userid })
      //     .execute();
      const updateuser = this.UserRepository.update(
        {
          id: userid,
        },
        user,
      );

      return updateuser;
    }

    throw new NotFoundException();
  }
  // END OF UPDATE USER BY ID

  // DELETE USER BY ID
  async Deleteuserbyid(userid: number) {
    // const userfindbyid = await this.datasource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('UserEntity')
    //   .where('UserEntity.id = :id', { id: userid })
    //   .getOne();
    const userfindbyid = await this.UserRepository.findOne({
      where: {
        id: userid,
      },
    });
    if (userfindbyid) {
      const userdelete = await this.UserRepository.delete({
        id: userid,
      });
      //   const userdelete = await this.datasource
      //     .getRepository('UserEntity')
      //     .createQueryBuilder('UserEntity')
      //     .delete()
      //     .from(UserEntity)
      //     .where('id= :id', { id: userid })
      //     .execute();
      console.log('user deleted successfully');
      return userdelete;
    }
    throw new NotFoundException();
  }
  // END OF DELETE USER BY ID

  // async searchuser(
  //   userid: number,
  //   username: string,
  //   useremail: string,
  //   contact: number,
  // ) {
  //   console.log(userid);
  //   if (userid !== undefined) {
  //     const user = await this.UserRepository.find({
  //       where: {
  //         id: userid,
  //       },
  //     });
  //     console.log(user);
  //     return user;
  //   } else if (username !== undefined) {
  //     const user = await this.UserRepository.find({
  //       where: {
  //         name: username,
  //       },
  //     });
  //     return user;
  //   } else if (useremail !== undefined) {
  //     const user = await this.UserRepository.find({
  //       where: {
  //         email: useremail,
  //       },
  //     });
  //     return user;
  //   } else if (contact !== undefined) {
  //     const user = await this.UserRepository.find({
  //       where: {
  //         contact_number: contact,
  //       },
  //     });
  //     return user;
  //   } else {
  //     throw new NotFoundException();
  //   }
  // }

  // async paginate(options: IPaginationOptions): Promise<Pagination<UserEntity>> {
  //   return paginate<UserEntity>(this.UserRepository, options);
  // }

  // async findall(query:PaginateQuery){
  //     return paginate(query,this.UserRepository,{
  //         sortableColumns:['id','name'],
  //         nullSort:'last',
  //         searchableColumns:['name','id','email','contact_number'],

  //     })
  // }

  async updatedeveloper(userid: number, projectid: any) {
    const developer = await this.UserRepository.update(
      {
        id: userid,
      },
      projectid,
    );
    return developer;
  }

  async getManagerById(managerid: number) {
    const manager = await this.UserRepository.findOne({
      where: {
        id: managerid,
      },
    });
    return manager;
  }

  // searchemployee
  // async Search(user: SearchEmployeeDto) {
  //   const { name, contact_number, email, role } = user;
  //   const where: FindOptionsWhere<UserEntity> = {};
  //   if (name) {
  //     where.name = name;
  //   }
  //   console.log(where);
  //   if (contact_number) {
  //     where.contact_number = contact_number;
  //   }
  //   if (email) {
  //     where.email = email;
  //   }
  //   if (role) {
  //     where.role = role;
  //   }

  //   const employee = await this.UserRepository.find({
  //     where,
  //   });
  //   return employee;
  // }

  async search(
    options: IPaginationOptions,
    searchuser: SearchEmployeeDto,
  ): Promise<Pagination<UserEntity>> {
    const { username, contact, useremail, userrole } = searchuser;

    const queryBuilder = this.UserRepository.createQueryBuilder('UserEntity');

    if (username) {
      queryBuilder.where('UserEntity.name = :name', {
        name: username,
      });
      queryBuilder.limit(1);
      queryBuilder.getManyAndCount();
    }
    if (contact) {
      queryBuilder.where('UserEntity.contact_number = :contact_number', {
        contact_number: contact,
      });
      queryBuilder.limit(1);
      queryBuilder.getManyAndCount();
    }
    if (useremail) {
      queryBuilder.where('UserEntity.email = :email', {
        email: useremail,
      });
      queryBuilder.limit(1);
      queryBuilder.getManyAndCount();
    }
    if (userrole) {
      queryBuilder.where('UserEntity.role = :role', {
        role: userrole,
      });
      queryBuilder.limit(1);
      queryBuilder.getManyAndCount();
    }
    return paginateRaw(queryBuilder, options);
  }
}
