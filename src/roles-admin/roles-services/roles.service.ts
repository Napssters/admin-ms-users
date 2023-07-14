import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/entities/roles.entity';
import { UpdateRolRequestDTO } from '../dto/requests/update-rol.request.dto';
import { CreateRolDTO } from '../dto/create-rol.dto';
import { uuid } from 'uuid';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) { }

  async findByName(name: string): Promise<Roles | null> {
    try {
      return await this.rolesRepository.findOne({ where: { name } });
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to find rol');
    }
  }

  async create(createRol: CreateRolDTO): Promise<Roles> {
    try {
      return await this.rolesRepository.save({
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

  async update(name: string, updatedData: Partial<UpdateRolRequestDTO>): Promise<Roles> {
    try {
      const rol = await this.rolesRepository.findOne({ where: { name } });
      if (!rol) {
        throw new Error('Entity not found');
      }

      updatedData.updatedAt = new Date();
      const updatedEntity = { ...rol, ...updatedData };

      return await this.rolesRepository.save(updatedEntity);
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to update rol');
    }
  }

  async softDelete(name: string): Promise<string> {
    try {
      const rol = await this.rolesRepository.findOne({ where: { name } });

      if (!rol) {
        throw new Error('Entity not found');
      }

      await this.rolesRepository.update(rol.id, { isDeleted: true });
      return "Rol deleted successfully.";
    } catch (error) {
      console.log(error.message);
      return "Failed to delete rol.";
    }
  }
}
