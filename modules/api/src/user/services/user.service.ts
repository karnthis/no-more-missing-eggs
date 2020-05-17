
import {HttpException, Injectable} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import {UpdateUserDto} from '../../dto/user/update-user.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {CleanUserDto} from '../../dto/user/clean-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async saveNew(createUser): Promise<CleanUserDto> {
    try {
      const userToSave = {...new User(), ...createUser};

      const result = await this.userRepository.save(userToSave)
        .catch(err => ({error: err}));
      const {password, ...toSend} = result;
      return toSend;
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }
  }

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
    return this.userRepository.findOne(userId);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  async deleteUser(id: number): Promise<DeleteResultsDto> {
    return this.userRepository.delete(id);
  }

}
