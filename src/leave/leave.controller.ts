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
import {
  ApiProperty,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateLeaveDto } from './dto/createleave.dto';

export interface ApproveLeave {
  id: number;
}

@ApiTags('leave')
@Controller('leave')
export class LeaveController {
  constructor(private leaveservice: LeaveService) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiResponse({
    status: 200,
    description: 'fetch all employee leaves successfully',
  })
  @Roles(Role.HR, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  AllLeave() {
    return this.leaveservice.allleave();
  }

  // @Roles(Role.HR)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Put(':id')
  // approveleave(@Param() param: ApproveLeave) {
  //   return this.leaveservice.aproveleave(param.id);
  // }

  //6) get all leave count of developer in a month
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiResponse({
    status: 201,
    description: 'fetch all leaves count of Employee  Monthly',
  })
  @Roles(Role.HR, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/monthly/:id')
  LeaveCount(@Body() Body: MonthlyLeaveDto, @Request() req) {
    return this.leaveservice.CurrentMonthLeaves(Body.id);
  }

  //7) create leave (no duplicate leave for same day)

  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiResponse({
    status: 200,
    description: 'Requested leave successfully',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  Leaverequest(@Body() body: CreateLeaveDto, @Request() req) {
    return this.leaveservice.createleave(body, req.user.userId);
  }

  // 8) update leave (only manager can update the status)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiResponse({
    status: 200,
    description: 'Leave Request Updated',
  })
  @Roles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/')
  UpdateLeave(@Body() body: UpdateLeave) {
    return this.leaveservice.updateLeave(body);
  }
  // 9) cancel leave (after leave has been created the employee only can cancel it)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Access',
  })
  @ApiResponse({
    status: 200,
    description: 'Request Leave Cancelled',
  })
  @Roles(Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('cancel')
  CancelLeave(@Request() req) {
    return this.leaveservice.cancelLeave(req.user);
  }
}
