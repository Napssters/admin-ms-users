import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserRequestDTO } from '../dto/requests/update-user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to find user');
    }
  }

  async create(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create user');
    }
    
  }

  async update(email: string, updatedData: Partial<updateUserRequestDTO>): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new Error('Entity not found');
      }
  
      const updatedEntity = { ...user, ...updatedData };

      return await this.userRepository.save(updatedEntity);
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update user');
    }
  }

  async softDelete(email: string): Promise<string> {
    try {
      await this.userRepository.update(email, { isDeleted: true });
      return "User deleted successfully.";
    } catch (error) {
      console.log(error.message);
      return "Failed to delete user.";
    }
  }
}
