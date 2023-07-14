import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/entities/roles.entity';
import { updateRolRequestDTO } from '../dto/requests/update-rol.request.dto';
import { CreateRolDTO } from '../dto/create-rol.dto';
import { uuid } from 'uuid';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Roles)
    private readonly userRepository: Repository<Roles>,
  ) { }

  async findByName(name: string): Promise<Roles | null> {
    try {
      return await this.userRepository.findOne({ where: { name } });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to find rol');
    }
  }

  async create(createRol: CreateRolDTO): Promise<Roles> {
    try {
      return await this.userRepository.save({
        id: uuid,
        name: createRol.name,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to create role');
    }

  }

  async update(name: string, updatedData: Partial<updateRolRequestDTO>): Promise<Roles> {
    try {
      const rol = await this.userRepository.findOne({ where: { name } });
      if (!rol) {
        throw new Error('Entity not found');
      }

      updatedData.updatedAt = new Date();
      const updatedEntity = { ...rol, ...updatedData };

      return await this.userRepository.save(updatedEntity);
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update rol');
    }
  }

  async softDelete(name: string): Promise<string> {
    try {
      const rol = await this.userRepository.findOne({ where: { name } });

      if (!rol) {
        throw new Error('Entity not found');
      }

      await this.userRepository.update(rol.id, { isDeleted: true });
      return "Rol deleted successfully.";
    } catch (error) {
      console.log(error.message);
      return "Failed to delete rol.";
    }
  }
}
