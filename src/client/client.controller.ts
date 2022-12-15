import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { Delete, Get, Post, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ClientDto } from './client.dto';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';
import { Role } from 'src/enum/role.enum';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  create(@Body() body: ClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(body);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  fetch() {
    return this.clientService.GetClients();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  Delete(@Param() param) {
    return this.clientService.DeleteClient(param.id);
  }
  
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:id')
  Update(@Param() param, @Body() body: ClientDto) {
    return this.clientService.updateClient(param.id, body);
  }
}
