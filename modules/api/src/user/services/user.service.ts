
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOneLogin(username: string): Promise<User | undefined> {
    return await this.userRepository
        .createQueryBuilder('u')
        .addSelect('u.password')
        .where('u.username = :user', {user: username})
        .getOne();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository
        .createQueryBuilder('u')
        .where('u.username = :user', {user: username})
        .getOne();
  }

  async findOneById(userId: number): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('u')
      .where('u.id = :user', {user: userId})
      .getOne();
  }

  async saveNew(createUser) {
    const userToSave = {...new User(), ...createUser};

    const result = await this.userRepository.save(userToSave)
    .catch(err => ({error: err}));
    const {password, ...toSend} = result;
    return toSend;
  }
}
