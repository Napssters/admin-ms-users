import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/users.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
    
      async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
      }
    
      async findById(id: string): Promise<User | null> {
        const options: FindOneOptions<User> = { where: { id } };
        return await this.userRepository.findOne(options);
      }
      
      async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
      }
}
