
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({username});
  }

  async saveNew(createUser) {
    let tmp = new User();
    const userToSave = {...tmp, ...createUser}
    // console.dir(userToSave)

    const result = await this.userRepository.save(userToSave)
    .catch(err => ({error: err}));
    const {password, ...toSend} = result
    return toSend
  }
}