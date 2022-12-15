import { UserEntity } from 'src/user/user.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return UserEntity;
  }
  beforeInsert(event: InsertEvent<UserEntity>) {
    console.log('Before Insert User');
    event.entity.address = 'ludhiana';
  }
}
