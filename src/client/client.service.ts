import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CLIENT_RENEG_WINDOW } from 'tls';
import { Repository } from 'typeorm';
import { ClientDto } from './client.dto';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  async createClient(client: ClientDto): Promise<ClientEntity> {
    const user = this.clientRepo.save(client);
    return user;
  }

  async updateClient(clientid: number, clientdetail: ClientDto) {
    const client = this.clientRepo.findOne({
      where: {
        id: clientid,
      },
    });
    if (client) {
      const updateClient = this.clientRepo.update(
        {
          id: clientid,
        },
        clientdetail,
      );
      return updateClient;
    }
    throw new NotFoundException();
  }

  async GetClients() {
    const clients = await this.clientRepo.find();
    return clients;
  }

  async DeleteClient(clientid: number): Promise<ClientEntity> {
    const client = await this.clientRepo.findOne({
      where: {
        id: clientid,
      },
    });
    if (client) {
      const user = await this.clientRepo.delete({
        id: clientid,
      });
      return client;
    }
    throw new NotFoundException();
  }

  async GetClientById(clientid: number) {
    const client = await this.clientRepo.findOne({
      where: {
        id: clientid,
      },
    });
    return client;
  }
}
