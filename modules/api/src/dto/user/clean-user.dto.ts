import {OmitType} from '@nestjs/swagger';
import {CreateUserDto} from './create-user.dto';

export class CleanUserDto extends OmitType(CreateUserDto, ['password', 'confirmPassword']) {}
