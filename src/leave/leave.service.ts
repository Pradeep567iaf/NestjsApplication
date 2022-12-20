import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from 'src/enum/leave.enum';
import { DataSource, Repository } from 'typeorm';
import { UpdateLeave } from './dto/updateLeave.dto';
import { leavedto } from './leave.dto';
import { leaveEntity } from './leave.entity';

@Injectable()
export class LeaveService {
  constructor(
    private readonly datasource: DataSource,
    @InjectRepository(leaveEntity)
    private readonly leaveRespository: Repository<leaveEntity>,
  ) {}

  formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100)
      .toString()
      .substring(1)
      .replace(/(^|-)0+/g, '$1');
    return month + '/' + day + '/' + year;
  }

  async createleave(leaverequest: leavedto, userid: number) {
    const date = new Date();
    const currentDate = this.formatDate(date).toString();
    console.log(leaverequest);
    console.log(currentDate);
    const requestuser = await this.leaveRespository.findOne({
      where: {
        employeeid: leaverequest.employeeid,
      },
    });
    console.log(requestuser);
    if (requestuser) {
      if (requestuser.employeeid === userid) {
        const databaseDate = requestuser.RequestDate;
        console.log(databaseDate, '=======');

        if (currentDate === databaseDate) {
          return 'you can request only one leave per day';
        } else {
          return await this.leaveRespository.save(leaverequest);
        }
      }
    } else {
      return await this.leaveRespository.save(leaverequest);
    }
  }

  async allleave() {
    const allrequest = await this.leaveRespository.find();

    return allrequest;
  }

  async aproveleave(id: number) {
    try {
      const approveleave = await this.leaveRespository.update(id, {
        status: Leave.APPROVED,
      });
      if (approveleave.affected === 0) {
        throw new NotFoundException('No user find with id');
      } else {
        return `Leave is approved for user with Request  ${id}`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async CurrentMonthLeaves(empoyeeid: number) {
    console.log(empoyeeid, typeof empoyeeid);
    const datecount = [];
    var currentdate = new Date();
    var cur_month = currentdate.getMonth() + 1;
    var cur_year = currentdate.getFullYear();
    const employee = await this.leaveRespository.find({
      where: {
        employeeid: Number(empoyeeid),
      },
    });
    employee.map((e) => {
      if (
        Number(e.RequestDate.split('/')[0]) === cur_month &&
        Number(e.RequestDate.split('/')[2]) === cur_year
      ) {
        console.log(e.RequestDate);
        datecount.push(e);
      }
    });
    return { 'total leaves': datecount.length };
  }

  //update leave by manager only
  async updateLeave(leave: UpdateLeave) {
    const employee = await this.leaveRespository.findOne({
      where: {
        employeeid: leave.employeeid,
        employeename: leave.employeename,
        RequestDate: leave.RequestDate,
      },
    });
    const updatestatus = await this.leaveRespository.update(
      {
        employeeid: leave.employeeid,
      },
      leave,
    );
    return employee;
  }

  // cancel leave by employee only
  async cancelLeave(user: any) {
    var currentdate = new Date();
    const employee = await this.leaveRespository.findOne({
      where: {
        employeeid: user.UserId,
        employeename: user.employeename,
      },
    });

    if (
      employee &&
      this.formatDate(employee.RequestDate) === this.formatDate(currentdate)
    ) {
      const deleteleave = await this.datasource
        .getRepository('Leave')
        .createQueryBuilder('Leave')
        .softDelete()
        .where('employeeid = :id', { id: employee.employeeid })
        .execute();

      return employee;
    } else {
      return 'employee does not exist';
    }
  }
}
