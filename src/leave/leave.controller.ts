import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  Delete,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { LeaveService } from './leave.service';
import { Role } from 'src/enum/role.enum';
import { MonthlyLeaveDto } from './dto/monthlyleave.dto';
import { UpdateLeave } from './dto/updateLeave.dto';
import { ApiTags } from '@nestjs/swagger';

export interface ApproveLeave {
  id: number;
}

@ApiTags('leave')
@Controller('leave')
export class LeaveController {
  constructor(private leaveservice: LeaveService) {}

  @Roles(Role.HR, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  AllLeave() {
    return this.leaveservice.allleave();
  }

  @Roles(Role.HR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  approveleave(@Param() param: ApproveLeave) {
    return this.leaveservice.aproveleave(param.id);
  }

  //6) get all leave count of developer in a month
  @Get('/monthly/:id')
  LeaveCount(@Body() body, @Param() param: MonthlyLeaveDto, @Request() req) {
    return this.leaveservice.CurrentMonthLeaves(param.id);
  }

  //7) create leave (no duplicate leave for same day)
  @UseGuards(JwtAuthGuard)
  @Post('/')
  Leaverequest(@Body() body, @Request() req) {
    return this.leaveservice.createleave(body, req.user.userId);
  }

  // 8) update leave (only manager can update the status)
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/')
  UpdateLeave(@Body() body: UpdateLeave) {
    return this.leaveservice.updateLeave(body);
  }
  // 9) cancel leave (after leave has been created teh employee only can cancel it)
  @Roles(Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('cancel')
  CancelLeave(@Request() req) {
    return this.leaveservice.cancelLeave(req.user);
  }
}
