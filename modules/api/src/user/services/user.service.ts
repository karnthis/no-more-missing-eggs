
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {UpdateUserDto} from '../../dto/user/update-user.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOneLogin(username: string): Promise<User|undefined> {
    return await this.userRepository
        .createQueryBuilder('u')
        .addSelect('u.password')
        .where('u.username = :user', {user: username})
        .getOne();
  }

  async findOne(username: string): Promise<User|undefined> {
    return this.userRepository
        .createQueryBuilder('u')
        .where('u.username = :user', {user: username})
        .getOne();
  }

  async findOneById(userId: number): Promise<User|undefined> {
    return this.userRepository
      .createQueryBuilder('u')
      .where('u.id = :user', {user: userId})
      .getOne();
  }

  async saveNew(createUser): Promise<User|string> {
    const userToSave = {...new User(), ...createUser};

    const result = await this.userRepository.save(userToSave)
    .catch(err => (`error: ${err}`));
    if (typeof result === 'string') {
      return result;
    } else {
      const {password, ...toSend} = result;
      return toSend;
    }

  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    const {password, confirmPassword, ...updatableUser} = user;
    await this.userRepository.update(id, updatableUser);
    return this.userRepository.findOne(id);
  }

  async deleteUser(id: number): Promise<DeleteResultsDto> {
    return this.userRepository.delete(id);
  }

}
